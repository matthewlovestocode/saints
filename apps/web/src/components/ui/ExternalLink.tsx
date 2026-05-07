import type { AnchorHTMLAttributes, ReactNode } from "react";
import { classNames } from "@/lib/classNames";
import styles from "./ui.module.css";

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export function ExternalLink({
  children,
  className,
  ...props
}: ExternalLinkProps) {
  return (
    <a
      className={classNames(styles.textLink, className)}
      rel="noreferrer"
      target="_blank"
      {...props}
    >
      {children}
    </a>
  );
}
