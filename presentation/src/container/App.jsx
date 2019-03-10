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
      current: parseInt(this.getSlideParam()) || 0,
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

  setSlideParam(slide) {
    var newurl = `${window.location.protocol}//${window.location.host}${
      window.location.pathname
    }?slide=${slide}`;
    window.history.pushState({ path: newurl }, "", newurl);
  }

  getSlideParam() {
    return new URLSearchParams(window.location.search).get("slide");
  }

  keyDown(e) {
    if (e.code === "ArrowLeft" && this.state.current > 0) {
      const current = this.state.current - 1;
      this.setSlideParam(current);
      this.setState({ current });
    }
    if (e.code === "ArrowRight" && this.state.current < this.state.max) {
      const current = this.state.current + 1;
      this.setSlideParam(current);
      this.setState({ current });
    }
  }
}
