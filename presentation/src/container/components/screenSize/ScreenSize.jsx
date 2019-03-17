import * as React from "react";
import styles from "./ScreenSize.css";

const canvasHeight = window.innerHeight - 4;
const canvasWidth = window.innerWidth - 4;
export const ScreenSize = () => (
  <div className={styles}>
    {canvasHeight}*{canvasWidth}={canvasWidth * canvasHeight}px
  </div>
);
