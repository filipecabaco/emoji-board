import React from "react";
import ReactDOM from "react-dom";
import App from "./container/App";
import hljs from "highlight.js";

hljs.initHighlightingOnLoad();
ReactDOM.render(<App />, document.getElementById("index"));
