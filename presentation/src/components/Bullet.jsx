import React from "react";
import styled from "styled-components"
const key = () => Math.random();

const Bullet = ({ content: { title, bullets } }) => (
  <BulletsStyle>
    <BulletTitleStyle>{title}</BulletTitleStyle>
    {bullets && bullets.map(bullet => (
      <div key={key()}> <li>{bullet}</li> </div>))}
  </BulletsStyle>
);

const BulletsStyle = styled.section`
display: flex;
flex-wrap: wrap;
flex-direction: column;
align-items: baseline;
padding-top: 16vh;
padding-left: 4vw;
padding-right: 4vw;
height: calc(100% - 16vh);
width: calc(100% - 8vw);

div{
  text-align: left;
  height: auto;
  display: inline-flex;
  font-size: 6vh;
  list-style-type: disc;
}
`

const BulletTitleStyle = styled.div`
  display: inline-flex;
  font-size: 8vh;
`
export default Bullet;
