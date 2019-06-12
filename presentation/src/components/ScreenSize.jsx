import * as React from "react";
import styled from "styled-components";

const canvasHeight = window.innerHeight - 4;
const canvasWidth = window.innerWidth - 4;

const ScreenSize = () => (
  <ScreenSizeStyle>
    {canvasHeight}*{canvasWidth}={canvasWidth * canvasHeight}px
  </ScreenSizeStyle>
);

const ScreenSizeStyle =  styled.div`
display: flex;
flex-wrap: wrap;
flex-direction: column;
justify-content: center;
align-content: center;
height: 100%;
font-size: 5vh;
`

export default ScreenSize;