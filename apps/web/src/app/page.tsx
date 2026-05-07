import { saints } from "./data/saints";
import { Container } from "@/components/ui/Container";
import { SaintIndexCard } from "@/components/saints/SaintIndexCard";
import styles from "./page.module.css";

export default function Home() {
  return (
    <Container className={styles.page}>
      <section className={styles.header}>
        <p>Saints Index</p>
        <h1>Orthodox Saints</h1>
      </section>
      <section className={styles.grid} aria-label="Saints">
        {saints.map((saint) => (
          <SaintIndexCard key={saint.slug} saint={saint} />
        ))}
      </section>
    </Container>
  );
}
