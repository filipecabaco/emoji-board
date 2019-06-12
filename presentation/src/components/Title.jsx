import React from "react";
import styled from "styled-components"

const Title = ({ content: { title, subtitle } }) => (
  <TitleContentStyle>
    {title && <TitleSyle>{title}</TitleSyle>}
    {subtitle && <SubtitleStyle>{subtitle}</SubtitleStyle>}
  </TitleContentStyle>
);

const TitleContentStyle = styled.section`
display: flex;
flex-wrap: nowrap;
flex-direction: column;
justify-content: center;
align-content: center;
width: 100%;
`
const TitleSyle = styled.div`
height: auto;
display: inline-flex;
font-size: 20vh;
padding: 2vh;
`
const SubtitleStyle = styled.div`
height: auto;
display: inline-flex;
font-size: 8vh;
padding: 2vh;
`

export default Title;