import type { ReactNode } from "react";
import { classNames } from "@/lib/classNames";
import styles from "./ui.module.css";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
};

export function Container({ children, className, narrow }: ContainerProps) {
  return (
    <main
      className={classNames(
        narrow ? styles.narrowContainer : styles.container,
        className,
      )}
    >
      {children}
    </main>
  );
}
