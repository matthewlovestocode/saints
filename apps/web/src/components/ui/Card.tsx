import type { ReactNode } from "react";
import { classNames } from "@/lib/classNames";
import styles from "./ui.module.css";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return <article className={classNames(styles.card, className)}>{children}</article>;
}
