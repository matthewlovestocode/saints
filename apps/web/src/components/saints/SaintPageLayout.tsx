import type { ReactNode } from "react";
import Link from "next/link";
import type { Saint } from "@/app/data/saints";
import { Container } from "@/components/ui/Container";
import { Tabs } from "@/components/ui/Tabs";
import { SaintHero } from "./SaintHero";
import styles from "./saints.module.css";

type SaintPageLayoutProps = {
  activeHref: string;
  children: ReactNode;
  saint: Saint;
  title: string;
};

export function SaintPageLayout({
  activeHref,
  children,
  saint,
  title,
}: SaintPageLayoutProps) {
  return (
    <Container>
      <Link className={styles.backLink} href="/">
        Saints index
      </Link>
      <SaintHero saint={saint} title={title} />
      <div className={styles.pageGrid}>
        <Tabs
          activeHref={activeHref}
          ariaLabel={`${saint.name} pages`}
          items={saint.pages}
        />
        <div className={styles.contentGrid}>{children}</div>
      </div>
    </Container>
  );
}
