import React, { useEffect, useState } from "react";
import Bullet from "../components/Bullet";
import  Emoji  from "../components/Emoji";
import  ScreenSize  from "../components/ScreenSize";
import  Image  from "../components/Image";
import  Markdown  from "../components/Markdown";
import  Svg  from "../components/Svg";
import  Title  from "../components/Title";
import  slides  from "../slides";
import  {createGlobalStyle}  from "styled-components";

const contents = slides.map(slide => {
  switch (slide.type) {
    case "title":
      return <Title content={slide} />;
    case "bullet":
      return <Bullet content={slide} />;
    case "svg":
      return <Svg content={slide} />;
    case "markdown":
      return <Markdown content={slide} />;
    case "image":
      return <Image content={slide} />;
    case "emoji":
      return <Emoji />;
    case "screenSize":
      return <ScreenSize />;
    default:
      return <section />;
  }
});

const App = () => {
  const [state, setState] = useState({
    current: parseInt(getSlideParam()) || 0,
    contents: contents,
    max: contents.length - 1
  })

  const keyDown = event => {
    if (event.code === "ArrowLeft" && state.current > 0) {
      const current = state.current - 1;
      setSlideParam(current);
      setState({ ...state, current });
    }
    if (event.code === "ArrowRight" && state.current < state.max) {
      const current = state.current + 1;
      setSlideParam(current);
      setState({ ...state, current });
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDown);
    return () => { window.removeEventListener('keydown', keyDown) };
  })

  return <React.Fragment>
    <GlobalStyle />
    {state.contents[state.current]}
  </React.Fragment>
}


function setSlideParam(slide) {
  var newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?slide=${slide}`;
  window.history.pushState({ path: newurl }, "", newurl);
}

function getSlideParam() {
  return new URLSearchParams(window.location.search).get("slide");
}

const GlobalStyle = createGlobalStyle`
body section {
  font-family: "Futura", "Trebuchet MS", Arial, sans-serif;
  height: 100%;
  background: rgb(255, 250, 181);
  background: linear-gradient(#fdf6e3, #fdf6e5);
}
`

export default App