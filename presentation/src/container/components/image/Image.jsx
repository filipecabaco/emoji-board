import React from "react";
import styles from "./Image.css";

export const Image = ({ content: { img, style } }) => () => (
  <section className={styles.imageContent}>
    <img style={style} className={styles.image} src={img} />
  </section>
);
