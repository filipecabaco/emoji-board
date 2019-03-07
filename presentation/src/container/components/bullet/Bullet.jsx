import React from "react";
import styles from "./Bullet.css";
const key = () => Math.random();

export const Bullet = ({ content: { title, bullets } }) => () => (
  <section className={styles.bulletContent}>
    <div className={styles.title}>{title}</div>
    {bullets &&
      bullets.map(bullet => (
        <div key={key()}>
          <li /> {bullet}
        </div>
      ))}
  </section>
);
