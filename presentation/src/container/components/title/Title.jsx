import React from "react";
import styles from "./Title.css";

export const Title = ({ content: { title, subtitle } }) => () => (
  <section className={styles.titleContent}>
    {title && <div className={styles.title}>{title}</div>}
    {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
  </section>
);
