import React from "react";
import "./App.css";
import { Bullet } from "./components/bullet/Bullet";
import Emoji from "./components/emoji/Emoji";
import { Image } from "./components/image/Image";
import { Markdown } from "./components/markdown/Markdown";
import { Svg } from "./components/svg/Svg";
import { Title } from "./components/title/Title";
import { slides } from "./Slides";

const contents = slides.map(slide => {
  switch (slide.type) {
    case "title":
      return Title({ content: slide });
    case "bullet":
      return Bullet({ content: slide });
    case "svg":
      return Svg({ content: slide });
    case "markdown":
      return Markdown({ content: slide });
    case "image":
      return Image({ content: slide });
    case "emoji":
      return () => <Emoji />;
    default:
      return <section />;
  }
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      contents: contents,
      max: contents.length - 1
    };
  }
  componentDidMount() {
    document.addEventListener("keydown", this.keyDown.bind(this), false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyDown.bind(this), false);
  }
  render() {
    return this.state.contents[this.state.current]();
  }

  keyDown(e) {
    if (e.code === "ArrowLeft" && this.state.current > 0) {
      this.setState({ current: this.state.current - 1 });
    }
    if (e.code === "ArrowRight" && this.state.current < this.state.max) {
      this.setState({ current: this.state.current + 1 });
    }
  }
}
