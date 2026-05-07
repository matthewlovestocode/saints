import Link from "next/link";
import type { ProseBlock } from "@/app/data/saints";
import styles from "./ui.module.css";

type ProseBlockContentProps = {
  block: ProseBlock;
};

export function ProseBlockContent({ block }: ProseBlockContentProps) {
  if (typeof block === "string") {
    return block;
  }

  return block.map((part) => {
    if (typeof part === "string") {
      return part;
    }

    return (
      <Link
        className={styles.proseLink}
        href={part.href}
        key={`${part.href}:${part.text}`}
      >
        {part.text}
      </Link>
    );
  });
}
