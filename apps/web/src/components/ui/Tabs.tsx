import Link from "next/link";
import { classNames } from "@/lib/classNames";
import styles from "./ui.module.css";

type TabItem = {
  href: string;
  title: string;
};

type TabsProps = {
  activeHref: string;
  ariaLabel: string;
  items: TabItem[];
};

export function Tabs({ activeHref, ariaLabel, items }: TabsProps) {
  return (
    <nav className={styles.tabs} aria-label={ariaLabel}>
      {items.map((item) => (
        <Link
          className={classNames(item.href === activeHref && styles.activeTab)}
          href={item.href}
          key={item.href}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
