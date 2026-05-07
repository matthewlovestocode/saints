import styles from "./ui.module.css";

export type Fact = {
  label: string;
  value: string;
};

type FactGridProps = {
  facts: Fact[];
};

export function FactGrid({ facts }: FactGridProps) {
  return (
    <dl className={styles.factGrid}>
      {facts.map((fact) => (
        <div className={styles.fact} key={fact.label}>
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
