import {
  getReferences,
  type ResearchSection as ResearchSectionData,
} from "@/app/data/saints";
import { Prose } from "@/components/ui/Prose";
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
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
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
