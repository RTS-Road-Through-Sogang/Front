import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import "./fonts/Font.css";
import PageTitle from "./PageTitle";
import BarList from "./StatusBar";
import { PieChart } from "react-minimal-pie-chart";

export const BASE_URL = process.env.REACT_APP_BASE_URL;
const accessToken = localStorage.getItem("accessToken");
const usersMajor = localStorage.getItem("majorTitle");
const usersSubmajor = localStorage.getItem("submajorTrack");

const CurrentStatus = () => {
  const location = useLocation();

  const arrData = location.state.selectedData;

  const navigate = useNavigate();
  const GoBack = () => {
    navigate("/majortrack", { state: { arrData } });
  };
  const GoCreateRoadmap = () => {
    navigate("/roadmapcreate", { state: { arrData } });
  };
  // const completeP = parseInt(sessionStorage.getItem("complete_point"), 10);
  // const completeSelectedP = parseInt(
  //   sessionStorage.getItem("complete_select"),
  //   10
  // );
  // const majorP = parseInt(sessionStorage.getItem("major_point"), 10);
  // const majorSelectedP = parseInt(sessionStorage.getItem("major_select"), 10);
  // const subP = parseInt(sessionStorage.getItem("sub_point"), 10);
  // const subSelectedP = parseInt(sessionStorage.getItem("sub_select"), 10);

  // const gitaSelectedP = completeSelectedP - majorSelectedP - subSelectedP;
  // const gitaP = completeP - majorP - subP;

  // const completePercent =
  //   completeSelectedP >= completeP
  //     ? 100
  //     : (completeSelectedP / completeP) * 100;
  // const completePercentRounded = Math.round(completePercent * 10) / 10;
  let completeP,
    completeSelectedP,
    majorP,
    majorSelectedP,
    subP,
    subSelectedP,
    gitaSelectedP,
    gitaP,
    completePercent,
    completePercentRounded;

  if (localStorage.getItem("submajorTrack")) {
    completeP = parseInt(sessionStorage.getItem("complete_point"), 10);
    completeSelectedP = parseInt(sessionStorage.getItem("complete_select"), 10);
    majorP = parseInt(sessionStorage.getItem("major_point"), 10);
    majorSelectedP = parseInt(sessionStorage.getItem("major_select"), 10);
    subP = parseInt(sessionStorage.getItem("sub_point"), 10);
    subSelectedP = parseInt(sessionStorage.getItem("sub_select"), 10);

    gitaSelectedP = completeSelectedP - majorSelectedP - subSelectedP;
    gitaP = completeP - majorP - subP;

    completePercent =
      completeSelectedP >= completeP
        ? 100
        : (completeSelectedP / completeP) * 100;
    completePercentRounded = Math.round(completePercent * 10) / 10;
  } else {
    completeP = parseInt(sessionStorage.getItem("complete_point"), 10);
    completeSelectedP = parseInt(sessionStorage.getItem("complete_select"), 10);
    majorP = parseInt(sessionStorage.getItem("major_point"), 10);
    majorSelectedP = parseInt(sessionStorage.getItem("major_select"), 10);

    gitaSelectedP = completeSelectedP - majorSelectedP;
    gitaP = completeP - majorP;

    completePercent =
      completeSelectedP >= completeP
        ? 100
        : (completeSelectedP / completeP) * 100;
    completePercentRounded = Math.round(completePercent * 10) / 10;
  }

  return (
    <>
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
            <PieChartDiv>
              <PieChart
                data={[
                  {
                    value: completePercentRounded,
                    color: "#FFAFAF",
                    name: "name1",
                  },
                ]}
                reveal={completePercentRounded}
                lineWidth={40}
                background="#f3f3f3"
                lengthAngle={360}
                rounded
                animate
                label={({ dataEntry }) => dataEntry.value + "%"}
                labelStyle={{ fontSize: "0.8em", fill: "#f4f4f4;" }}
                labelPosition={0}
              ></PieChart>
            </PieChartDiv>
            <CreditStatus>
              {completeSelectedP}/{completeP}
            </CreditStatus>
          </StatusPie>
          <StatusBar>
            <BarList
              barli={{
                title: usersMajor,
                credits: majorSelectedP,
                total: majorP,
              }}
            />
            {usersSubmajor && (
              <BarList
                barli={{
                  title: usersSubmajor,
                  credits: subSelectedP,
                  total: subP,
                }}
              />
            )}
            <BarList
              barli={{
                title: "공통/기타",
                credits: gitaSelectedP,
                total: gitaP,
              }}
            />
          </StatusBar>
        </StatusMain>
        <StatusSubmit>
          <StatusMore onClick={GoBack}>다시 선택하기</StatusMore>
          <StatusNext onClick={GoCreateRoadmap}>다음으로</StatusNext>
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
  background-color: #fff;
`;
const PieTitle = styled.div`
  margin: 1em 0;
`;
const PieChartDiv = styled.div`
  width: 75%;
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
  background-color: #fff;
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
