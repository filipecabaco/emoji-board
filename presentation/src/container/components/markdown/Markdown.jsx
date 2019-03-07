import React from "react";
import styles from "./Markdown.css";
import hljs from "highlight.js";
import MarkdownIt from "markdown-it";

const markdownParser = MarkdownIt({
  highlight: (str, lang) =>
    lang && hljs.getLanguage(lang) ? hljs.highlight(lang, str).value : ""
});

export const Markdown = ({ content: { markdown, style } }) => () => (
  <section style={style} className={styles.markdownContent}>
    <div
      style={style}
      dangerouslySetInnerHTML={{
        __html: markdownParser.render(markdown.trim())
      }}
    />
  </section>
);
