import React from "react";
import styled from "styled-components";

const BarList = ({ barli }) => {
  return (
    <BarListDiv>
      <LiText>
        <LiCategory>{barli.title}</LiCategory>
        <LiCredits>
          {barli.credits} / {barli.total}
        </LiCredits>
      </LiText>
      <LiBar>
        <LiBarFilled></LiBarFilled>
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
`;
const LiBarFilled = styled.div`
  width: calc(30 * 100% / 62);
  height: 100%;
  background-color: #ffe5e5;
  border-radius: 5em;
`;

export default BarList;
