import {
  getReferences,
  type TimelineEntry,
} from "@/app/data/saints";
import { Figure } from "@/components/ui/Figure";
import { SourceLinks } from "@/components/ui/SourceLinks";
import styles from "./saints.module.css";

type TimelineProps = {
  entries: TimelineEntry[];
};

export function Timeline({ entries }: TimelineProps) {
  return (
    <div className={styles.timeline}>
      {entries.map((entry) => (
        <article className={styles.timelineItem} key={entry.title}>
          <p className={styles.timelineLabel}>{entry.label}</p>
          <div className={styles.timelineBody}>
            <h3>{entry.title}</h3>
            {entry.image ? <Figure {...entry.image} /> : null}
            {entry.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <SourceLinks sources={getReferences(entry.references)} />
          </div>
        </article>
      ))}
    </div>
  );
}
