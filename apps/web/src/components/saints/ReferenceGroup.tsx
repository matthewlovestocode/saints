import {
  getReferences,
  type Reference,
} from "@/app/data/saints";
import { Card } from "@/components/ui/Card";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Section } from "@/components/ui/Section";
import styles from "./saints.module.css";

type ReferenceGroupProps = {
  group: {
    references: string[];
    title: string;
  };
};

function ReferenceCard({ reference }: { reference: Reference }) {
  return (
    <Card className={styles.referenceCard}>
      <h3>
        <ExternalLink href={reference.url}>{reference.title}</ExternalLink>
      </h3>
      <p className={styles.referenceMeta}>{reference.publisher}</p>
      <p>{reference.note}</p>
    </Card>
  );
}

export function ReferenceGroup({ group }: ReferenceGroupProps) {
  return (
    <Section title={group.title}>
      <div className={styles.referenceGrid}>
        {getReferences(group.references).map((reference) => (
          <ReferenceCard key={reference.id} reference={reference} />
        ))}
      </div>
    </Section>
  );
}
