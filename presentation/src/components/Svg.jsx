import React from "react";
import styled from "styled-components"

const Svg = ({ content: { title, svg } }) => (
  <SvgContentStyle>
    {title && <SvgTitleStyle >{title}</SvgTitleStyle>}
    {svg}
  </SvgContentStyle>
);

const SvgContentStyle = styled.section`
display: flex;
flex-wrap: wrap;
flex-direction: row;
svg {
  display: inline-flex;
  margin: 0 auto;
  height: calc(100% - 8vh);
}
`
const SvgTitleStyle = styled.div`
  display: inline-flex;
  font-size: 8vh;
  height: auto;
  text-align: center;
  margin: 0 auto;
`
export default Svg