import hljs from "highlight.js";
import React from "react";
import ReactDOM from "react-dom";
import App from "./container/App";

hljs.initHighlightingOnLoad();
ReactDOM.render(<App />, document.getElementById("index"));
