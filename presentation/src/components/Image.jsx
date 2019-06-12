import React from "react";
import styled from "styled-components"

const Image = ({ content: { img, style } }) => (
  <ImageContentStyle>
    <ImageStyle style={style} src={img} />
  </ImageContentStyle>
);

const ImageContentStyle = styled.section`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
  align-content: center;
`
const ImageStyle = styled.img`
  width: auto;
`
export default Image;
