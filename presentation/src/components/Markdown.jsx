import hljs from "highlight.js";
import MarkdownIt from "markdown-it";
import React from "react";
import styled from "styled-components";

const markdownParser = MarkdownIt({
  highlight: (str, lang) =>
    lang && hljs.getLanguage(lang) ? hljs.highlight(lang, str).value : ""
});

const Markdown = ({ content: { markdown, style } }) => (
  <MarkdownContentStyle style={style}>
    <div
      style={style}
      dangerouslySetInnerHTML={{
        __html: markdownParser.render(markdown.trim())
      }}
    />
  </MarkdownContentStyle>
);

const MarkdownContentStyle = styled.section `
display: flex;
flex-wrap: wrap;
flex-direction: column;
justify-content: center;
margin-left: 4vh;

div {
  font-size: 4vh;
}
`
export default Markdown;