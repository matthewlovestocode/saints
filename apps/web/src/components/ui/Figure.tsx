import Image from "next/image";
import { classNames } from "@/lib/classNames";
import styles from "./ui.module.css";

type FigureProps = {
  alt: string;
  caption?: string;
  className?: string;
  height: number;
  src: string;
  width: number;
};

export function Figure({
  alt,
  caption,
  className,
  height,
  src,
  width,
}: FigureProps) {
  return (
    <figure className={classNames(styles.figure, className)}>
      <Image
        alt={alt}
        className={styles.figureImage}
        height={height}
        sizes="(max-width: 760px) 100vw, 420px"
        src={src}
        width={width}
      />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
