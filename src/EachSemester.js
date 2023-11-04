import React from "react";
import styled from "styled-components";
import Header from "./Header";
import "./fonts/Font.css";
import PageTitle from "./PageTitle";
import EachSemesterCourses from "./EachSemeterCourses";
import CoursesType from "./CoursesType";

const EachSemester = () => {
  return (
    <>
      <Header />
      <EachSemesterContainer>
        <PageTitle
          text={{
            bold: "1학년 1학기에",
            right: " 수강하고 싶은 과목을 선택하세요",
          }}
        />
        <EachSemesterMain>
          <Common>
            <CoursesType
              text={{
                title: "공통",
              }}
            />
            <EachSemesterCourses />
          </Common>
          <Major>
            <CoursesType
              text={{
                title: "영어영문",
              }}
            />
            <EachSemesterCourses />
          </Major>
          <Major2>
            <CoursesType
              text={{
                title: "컴퓨터공학",
              }}
            />
            <EachSemesterCourses />
          </Major2>
          <English>
            <CoursesType
              text={{
                title: "영어강의",
              }}
            />
            <EachSemesterCourses />
          </English>
        </EachSemesterMain>
        <EachSemesterSubmit>
          <button>선택 완료</button>
        </EachSemesterSubmit>
      </EachSemesterContainer>
    </>
  );
};

const EachSemesterContainer = styled.div`
  width: 70%;
  margin: 2em auto;
  text-align: center;
`;
const EachSemesterMain = styled.div`
  width: 100%;
  max-width: 46em;
  margin: 0 auto;
  font-family: "BMJUA";
  font-weight: normal;
  > * {
    margin-bottom: 3.5em;
  }
`;
const Common = styled.div``;
const Major = styled.div``;
const Major2 = styled.div``;
const English = styled.div``;
const EachSemesterSubmit = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2em auto;
  > button {
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
    &:hover {
      cursor: pointer;
      background-color: #ff7f7f;
    }
  }
`;

export default EachSemester;
