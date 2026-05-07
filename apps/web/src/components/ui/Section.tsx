import type { ReactNode } from "react";
import styles from "./ui.module.css";
import { SourceLinks } from "./SourceLinks";

type SectionProps = {
  children: ReactNode;
  eyebrow?: string;
  sources?: Array<{ title: string; url: string }>;
  title: string;
};

export function Section({ children, eyebrow, sources, title }: SectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <h2>{title}</h2>
      </div>
      {children}
      {sources?.length ? <SourceLinks sources={sources} /> : null}
    </section>
  );
}
