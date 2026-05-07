import type { ReactNode } from "react";
import { classNames } from "@/lib/classNames";
import styles from "./ui.module.css";

type ProseProps = {
  children: ReactNode;
  className?: string;
};

export function Prose({ children, className }: ProseProps) {
  return <div className={classNames(styles.prose, className)}>{children}</div>;
}
