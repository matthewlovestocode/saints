import Image from "next/image";
import Link from "next/link";
import type { Saint } from "@/app/data/saints";
import { Card } from "@/components/ui/Card";
import { FactGrid } from "@/components/ui/FactGrid";
import styles from "./saints.module.css";

type SaintIndexCardProps = {
  saint: Saint;
};

export function SaintIndexCard({ saint }: SaintIndexCardProps) {
  return (
    <Card className={styles.indexCard}>
      <Image
        className={styles.indexPortrait}
        src={saint.image}
        alt={`Icon-inspired portrait of ${saint.name}`}
        width={320}
        height={480}
        priority
      />
      <div className={styles.indexBody}>
        <div>
          <h2>{saint.name}</h2>
          <p>{saint.summary}</p>
        </div>
        <FactGrid facts={saint.facts} />
        <div className={styles.pageLinks}>
          {saint.pages.map((page) => (
            <Link href={page.href} key={page.href}>
              {page.title}
            </Link>
          ))}
        </div>
      </div>
    </Card>
  );
}
