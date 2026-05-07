import { ExternalLink } from "./ExternalLink";
import styles from "./ui.module.css";

type SourceLinksProps = {
  label?: string;
  sources: Array<{ title: string; url: string }>;
};

export function SourceLinks({ label = "References", sources }: SourceLinksProps) {
  return (
    <div className={styles.sourceLinks}>
      <span className={styles.sourceLabel}>{label}</span>
      {sources.map((source) => (
        <ExternalLink
          className={styles.sourceLink}
          href={source.url}
          key={source.url}
        >
          {source.title}
        </ExternalLink>
      ))}
    </div>
  );
}
