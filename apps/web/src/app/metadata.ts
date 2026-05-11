import type { Metadata } from "next";
import type { Saint } from "./data/saints";

export const SITE_TITLE = "Orthodox Saints";

export function homeMetadata(): Metadata {
  return {
    title: {
      absolute: SITE_TITLE,
    },
    description:
      "Explore Orthodox saints through concise lives, teachings, timelines, and trusted sources.",
  };
}

export function saintMetadata(saint: Pick<Saint, "name" | "summary">): Metadata {
  return {
    title: saint.name,
    description: saint.summary,
  };
}

export function saintSectionMetadata(
  saint: Pick<Saint, "name" | "summary">,
  sectionName: string,
): Metadata {
  return {
    title: `${saint.name}: ${sectionName}`,
    description: `${sectionName} for ${saint.name}. ${saint.summary}`,
  };
}
