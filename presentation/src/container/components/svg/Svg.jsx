import React from "react";
import styles from "./Svg.css";

export const Svg = ({ content: { title, svg } }) => () => (
  <section className={styles.svgContent}>
    {title && <div className={styles.title}>{title}</div>}
    {svg}
  </section>
);
