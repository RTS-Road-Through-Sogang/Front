import React from "react";
import styled, { keyframes } from "styled-components";

const BarList = ({ barli }) => {
  const credits = parseInt(barli.credits);
  const total = parseInt(barli.total);
  const leftWidth = (credits / total) * 100;

  const gradientColor = (left) => {
    const red = Math.floor(255 - (161 * left) / 100);
    return `rgb(255, ${red}, ${red})`;
  };

  return (
    <BarListDiv>
      <LiText>
        <LiCategory>{barli.title}</LiCategory>
        <LiCredits>
          {barli.credits} / {barli.total}
        </LiCredits>
      </LiText>
      <LiBar>
        <LiBarFilled
          left={leftWidth}
          color={gradientColor(leftWidth)}
        ></LiBarFilled>
      </LiBar>
    </BarListDiv>
  );
};

const BarListDiv = styled.li`
  display: flex;
  flex-direction: column;
  width: 80%;
`;
const LiText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.8em 0.4em 0.4em 0.4em;
`;
const LiCategory = styled.div``;
const LiCredits = styled.div``;

const LiBar = styled.div`
  width: 100%;
  height: 1.3em;
  background-color: #f4f4f4;
  border-radius: 5em;
  margin-bottom: 0.8em;
  position: relative;
`;
const animateBar = (left, color) => keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: ${left}%;
    background: linear-gradient(to right, #FFEBEB, ${color});
  }
`;

const LiBarFilled = styled.div`
  height: 100%;
  border-radius: 5em;
  max-width: 100%;
  width: 0%;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(to right, #ffebeb, ${(props) => props.color});
  animation: ${({ left, color }) => animateBar(left, color)} 2s ease-in-out
    forwards;
`;

export default BarList;
