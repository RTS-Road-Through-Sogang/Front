import React from "react";
import styled from "styled-components";
import Header from "./Header";
import "./fonts/Font.css";
import PageTitle from "./PageTitle";
import BarList from "./StatusBar";
import PieChart from "./PieChart";

const CurrentStatus = () => {
  return (
    <>
      <Header />
      <StatusContainer>
        <PageTitle
          text={{
            bold: "내 학점 채우기 현황은",
            right: " 다음과 같아요",
          }}
        />
        <StatusMain>
          <StatusPie>
            <PieTitle>전체 학점</PieTitle>
            <PieChart />
            <CreditStatus>104/130</CreditStatus>
          </StatusPie>
          <StatusBar>
            <BarList
              barli={{ title: "영미영문", credits: "30", total: "62" }}
            />
            <BarList
              barli={{ title: "컴퓨터공학", credits: "30", total: "62" }}
            />
            <BarList
              barli={{ title: "영어강의", credits: "30", total: "62" }}
            />
          </StatusBar>
        </StatusMain>
        <StatusSubmit>
          <StatusMore>더 선택하기</StatusMore>
          <StatusNext>다음으로</StatusNext>
        </StatusSubmit>
      </StatusContainer>
    </>
  );
};

const StatusContainer = styled.div`
  width: 70%;
  margin: 2em auto;
  text-align: center;
`;
const StatusMain = styled.div`
  width: 100%;
  max-width: 46em;
  margin: 0 auto;
  font-family: "BMJUA";
  font-size: 1.3em;
  font-weight: normal;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StatusPie = styled.div`
  width: 38%;
  height: 18em;
  border-radius: 50px 0px;
  border: 0.08em solid #cdcdcd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const PieTitle = styled.div`
  margin: 1em 0;
`;
const CreditStatus = styled.div`
  margin: 1em 0;
`;
const StatusBar = styled.ul`
  list-style: none;
  padding: 0;
  width: 57%;
  height: 18em;
  border-radius: 0px 50px;
  border: 0.08em solid #cdcdcd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const StatusSubmit = styled.div``;
const StatusMore = styled.button`
  width: 24em;
  height: 3em;
  border: none;
  background-color: #fff2f2;
  color: #ff6565;
  font-family: "Noto Sans KR";
  font-weight: 700;
  font-size: 0.7em;
  border-radius: 60px;
  filter: drop-shadow(4px 4px 5px rgba(0, 0, 0, 0.1));
  margin: 0.5em 2em;
  &:hover {
    cursor: pointer;
    background-color: #ffe5e5;
  }
`;
const StatusNext = styled.button`
  width: 24em;
  height: 3em;
  border: none;
  background-color: #ff6262;
  color: #fff;
  font-family: "Noto Sans KR";
  font-weight: 700;
  font-size: 0.7em;
  border-radius: 60px;
  filter: drop-shadow(4px 4px 5px rgba(0, 0, 0, 0.1));
  margin: 0.5em 2em;
  &:hover {
    cursor: pointer;
    background-color: #ff7f7f;
  }
`;

export default CurrentStatus;
