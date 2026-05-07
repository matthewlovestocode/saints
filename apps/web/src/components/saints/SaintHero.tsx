import Image from "next/image";
import type { Saint } from "@/app/data/saints";
import { Badge } from "@/components/ui/Badge";
import { FactGrid } from "@/components/ui/FactGrid";
import styles from "./saints.module.css";

type SaintHeroProps = {
  saint: Saint;
  title: string;
};

export function SaintHero({ saint, title }: SaintHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroText}>
        <div className={styles.titleBlock}>
          <Badge>{saint.name}</Badge>
          <h1>{title}</h1>
        </div>
        <p className={styles.summary}>{saint.summary}</p>
        <div className={styles.aliases} aria-label="Alternate names">
          {saint.titles.map((title) => (
            <Badge key={title}>{title}</Badge>
          ))}
        </div>
        <FactGrid facts={saint.facts} />
      </div>
      <Image
        className={styles.portrait}
        src={saint.image}
        alt="Icon-inspired portrait of Saint Moses the Black"
        width={512}
        height={768}
        priority
      />
    </section>
  );
}
