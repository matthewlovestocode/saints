import type { ReactNode } from "react";
import { classNames } from "@/lib/classNames";
import styles from "./ui.module.css";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return <span className={classNames(styles.badge, className)}>{children}</span>;
}
