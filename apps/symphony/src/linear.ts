import { SymphonyError } from "./errors.js";
import type { Issue, JsonObject, ServiceConfig, TrackerClient } from "./types.js";

const PAGE_SIZE = 50;
const NETWORK_TIMEOUT_MS = 30_000;

const ISSUE_FIELDS = `
  nodes {
    id
    identifier
    title
    description
    priority
    branchName
    url
    createdAt
    updatedAt
    state { name }
    labels { nodes { name } }
    relations {
      nodes {
        type
        relatedIssue {
          id
          identifier
          state { name }
        }
      }
    }
  }
`;

function issueConnectionQuery(operationName: string, teamFilter: string): string {
  const teamVariables = teamFilter.includes("$teamId") ? ", $teamId: String" : teamFilter.includes("$teamKey") ? ", $teamKey: String" : "";
  return `
  query ${operationName}($projectSlug: String!, $stateNames: [String!]${teamVariables}, $after: String, $first: Int!) {
    issues(
      first: $first
      after: $after
      filter: {
        project: { slugId: { eq: $projectSlug } }
        state: { name: { in: $stateNames } }
        ${teamFilter}
      }
    ) {
      pageInfo { hasNextPage endCursor }
      ${ISSUE_FIELDS}
    }
  }
`;
}

const ISSUE_STATES_BY_IDS_QUERY = `
  query SymphonyIssueStatesByIds($ids: [ID!]) {
    issues(filter: { id: { in: $ids } }) {
      ${ISSUE_FIELDS}
    }
  }
`;

export class LinearClient implements TrackerClient {
  private stateIdByName = new Map<string, string>();

  constructor(private readonly getConfig: () => ServiceConfig) {}

  async fetchCandidateIssues(): Promise<Issue[]> {
    const config = this.getConfig();
    return this.fetchPaged(issueConnectionQuery("SymphonyCandidateIssues", linearTeamFilter(config)), compactVariables({
      projectSlug: config.tracker.projectSlug,
      stateNames: config.tracker.activeStates,
      teamKey: config.tracker.teamKey,
      teamId: config.tracker.teamId
    }));
  }

  async fetchIssuesByStates(stateNames: string[]): Promise<Issue[]> {
    if (stateNames.length === 0) return [];
    const config = this.getConfig();
    return this.fetchPaged(issueConnectionQuery("SymphonyIssuesByStates", linearTeamFilter(config)), compactVariables({
      projectSlug: config.tracker.projectSlug,
      stateNames,
      teamKey: config.tracker.teamKey,
      teamId: config.tracker.teamId
    }));
  }

  async fetchIssueStatesByIds(issueIds: string[]): Promise<Issue[]> {
    if (issueIds.length === 0) return [];
    const payload = await this.graphql(ISSUE_STATES_BY_IDS_QUERY, { ids: issueIds });
    return normalizeIssues(payload.data?.issues?.nodes);
  }

  async rawGraphql(query: string, variables?: JsonObject): Promise<JsonObject> {
    return this.graphql(query, variables ?? {});
  }

  async updateIssueState(issueId: string, stateName: string): Promise<void> {
    const stateId = await this.workflowStateId(stateName);
    const mutation = `
      mutation SymphonyIssueUpdate($id: String!, $stateId: String!) {
        issueUpdate(id: $id, input: { stateId: $stateId }) {
          success
        }
      }
    `;
    const payload = await this.graphql(mutation, { id: issueId, stateId });
    if (payload.data?.issueUpdate?.success !== true) {
      throw new SymphonyError("linear_unknown_payload", "Linear issueUpdate did not report success");
    }
  }

  async createIssueComment(issueId: string, body: string): Promise<void> {
    const mutation = `
      mutation SymphonyCommentCreate($issueId: String!, $body: String!) {
        commentCreate(input: { issueId: $issueId, body: $body }) {
          success
        }
      }
    `;
    const payload = await this.graphql(mutation, { issueId, body });
    if (payload.data?.commentCreate?.success !== true) {
      throw new SymphonyError("linear_unknown_payload", "Linear commentCreate did not report success");
    }
  }

  private async fetchPaged(query: string, baseVariables: JsonObject): Promise<Issue[]> {
    const issues: Issue[] = [];
    let after: string | null = null;

    do {
      const payload = await this.graphql(query, { ...baseVariables, after, first: PAGE_SIZE });
      const connection = payload.data?.issues;
      if (!connection || !Array.isArray(connection.nodes) || !connection.pageInfo) {
        throw new SymphonyError("linear_unknown_payload", "Linear issues payload had an unexpected shape");
      }
      issues.push(...normalizeIssues(connection.nodes));
      const pageInfo = connection.pageInfo as JsonObject;
      const hasNextPage = pageInfo.hasNextPage === true;
      const endCursor = typeof pageInfo.endCursor === "string" ? pageInfo.endCursor : null;
      if (hasNextPage && !endCursor) {
        throw new SymphonyError("linear_missing_end_cursor", "Linear pagination reported a next page without endCursor");
      }
      after = hasNextPage ? endCursor : null;
    } while (after);

    return issues;
  }

  private async graphql(query: string, variables: JsonObject): Promise<any> {
    const config = this.getConfig();
    if (!config.tracker.apiKey) {
      throw new SymphonyError("missing_tracker_api_key", "Linear API key is missing");
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), NETWORK_TIMEOUT_MS);
    let response: Response;
    try {
      response = await fetch(config.tracker.endpoint, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: config.tracker.apiKey
        },
        body: JSON.stringify({ query, variables }),
        signal: controller.signal
      });
    } catch (error) {
      throw new SymphonyError("linear_api_request", "Linear request failed", error);
    } finally {
      clearTimeout(timeout);
    }

    let body: any;
    try {
      body = await response.json();
    } catch (error) {
      throw new SymphonyError("linear_unknown_payload", "Linear response was not JSON", error);
    }

    if (!response.ok) {
      throw new SymphonyError("linear_api_status", `Linear returned HTTP ${response.status}: ${JSON.stringify(body).slice(0, 500)}`);
    }
    if (Array.isArray(body.errors) && body.errors.length > 0) {
      throw new SymphonyError("linear_graphql_errors", "Linear GraphQL response contained errors");
    }
    return body;
  }

  private async workflowStateId(stateName: string): Promise<string> {
    const normalized = stateName.toLowerCase();
    const cached = this.stateIdByName.get(normalized);
    if (cached) return cached;

    const config = this.getConfig();
    const teamFilter = config.tracker.teamId ? "team: { id: { eq: $teamId } }" : "team: { key: { eq: $teamKey } }";
    const teamVariables = config.tracker.teamId ? "$teamId: String" : "$teamKey: String";
    const query = `
      query SymphonyWorkflowStates(${teamVariables}) {
        workflowStates(filter: { ${teamFilter} }) {
          nodes { id name }
        }
      }
    `;
    const payload = await this.graphql(query, compactVariables({ teamKey: config.tracker.teamKey, teamId: config.tracker.teamId }));
    const nodes = payload.data?.workflowStates?.nodes;
    if (!Array.isArray(nodes)) {
      throw new SymphonyError("linear_unknown_payload", "Linear workflowStates payload had an unexpected shape");
    }
    for (const node of nodes) {
      if (isObject(node) && typeof node.id === "string" && typeof node.name === "string") {
        this.stateIdByName.set(node.name.toLowerCase(), node.id);
      }
    }
    const stateId = this.stateIdByName.get(normalized);
    if (!stateId) {
      throw new SymphonyError("linear_unknown_payload", `Linear workflow state not found: ${stateName}`);
    }
    return stateId;
  }
}

function linearTeamFilter(config: ServiceConfig): string {
  if (config.tracker.teamId) return "team: { id: { eq: $teamId } }";
  if (config.tracker.teamKey) return "team: { key: { eq: $teamKey } }";
  return "";
}

function compactVariables(variables: JsonObject): JsonObject {
  return Object.fromEntries(Object.entries(variables).filter(([, value]) => value !== null && value !== undefined));
}

export function normalizeIssues(nodes: unknown): Issue[] {
  if (!Array.isArray(nodes)) {
    throw new SymphonyError("linear_unknown_payload", "Expected Linear issue nodes array");
  }
  return nodes.map(normalizeIssue).filter((issue): issue is Issue => issue !== null);
}

function normalizeIssue(raw: unknown): Issue | null {
  if (!isObject(raw)) return null;
  const id = stringValue(raw.id);
  const identifier = stringValue(raw.identifier);
  const title = stringValue(raw.title);
  const state = isObject(raw.state) ? stringValue(raw.state.name) : null;
  if (!id || !identifier || !title || !state) return null;

  const labelNodes = isObject(raw.labels) && Array.isArray(raw.labels.nodes) ? raw.labels.nodes : [];
  const labels = labelNodes.map((label) => (isObject(label) ? stringValue(label.name) : null)).filter(isString).map((label) => label.toLowerCase());

  const relationNodes = isObject(raw.relations) && Array.isArray(raw.relations.nodes) ? raw.relations.nodes : [];
  const blocked_by = relationNodes
    .filter((relation) => isObject(relation) && relation.type === "blocks")
    .map((relation) => (isObject(relation) && isObject(relation.relatedIssue) ? relation.relatedIssue : null))
    .filter((issue): issue is JsonObject => issue !== null)
    .map((issue) => ({
      id: stringValue(issue.id),
      identifier: stringValue(issue.identifier),
      state: isObject(issue.state) ? stringValue(issue.state.name) : null
    }));

  return {
    id,
    identifier,
    title,
    description: stringValue(raw.description),
    priority: Number.isInteger(raw.priority) ? Number(raw.priority) : null,
    state,
    branch_name: stringValue(raw.branchName),
    url: stringValue(raw.url),
    labels,
    blocked_by,
    created_at: isoOrNull(raw.createdAt),
    updated_at: isoOrNull(raw.updatedAt)
  };
}

function stringValue(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isoOrNull(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? null : new Date(timestamp).toISOString();
}

function isObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
