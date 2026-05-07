import {
  type ProseBlock,
  getReferences,
  type ResearchSection as ResearchSectionData,
} from "@/app/data/saints";
import { Figure } from "@/components/ui/Figure";
import { Prose } from "@/components/ui/Prose";
import { ProseBlockContent } from "@/components/ui/ProseBlockContent";
import { Section } from "@/components/ui/Section";

type ResearchSectionListProps = {
  sections: ResearchSectionData[];
};

export function ResearchSectionList({ sections }: ResearchSectionListProps) {
  return (
    <>
      {sections.map((section) => (
        <Section
          eyebrow={section.eyebrow}
          key={section.title}
          sources={getReferences(section.references)}
          title={section.title}
        >
          <Prose>
            {section.image ? <Figure {...section.image} /> : null}
            {section.body.map((paragraph) => (
              <p key={getProseBlockKey(paragraph)}>
                <ProseBlockContent block={paragraph} />
              </p>
            ))}
            {section.bullets ? (
              <ul>
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </Prose>
        </Section>
      ))}
    </>
  );
}

function getProseBlockKey(block: ProseBlock) {
  return typeof block === "string"
    ? block
    : block
        .map((part) => (typeof part === "string" ? part : part.text))
        .join("");
}
