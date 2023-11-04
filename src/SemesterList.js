import React from "react";
import styled from "styled-components";
import Header from "./Header";
import "./fonts/Font.css";
import PageTitle from "./PageTitle";
import SemesterBlock from "./SemesterBlock";

const SemesterList = () => {
  return (
    <>
      <Header />
      <SemesterListContainer>
        <PageTitle
          text={{
            left: "학기를 클릭해 ",
            bold: "과목을 배치해",
            right: " 보세요",
          }}
        />
        <SemesterListMain>
          <SemesterBlocks>
            <SemesterBlock
              text={{
                number: "1-1",
                course1: "이산구조",
                course2: "자료구조",
                course3: "알고리즘설계와분석",
                course4: "컴퓨터아키텍쳐",
                course5: "성찰과성장",
                course6: "성찰과성장2",
              }}
            ></SemesterBlock>
            <SemesterBlock
              text={{
                number: "1-2",
                course1: "이산구조",
                course2: "자료구조",
                course3: "알고리즘설계와분석",
                course4: "컴퓨터아키텍쳐",
                course5: "성찰과성장",
                course6: "성찰과성장2",
              }}
            ></SemesterBlock>
            <SemesterBlock
              text={{
                number: "2-1",
                course1: "",
                course2: "",
                course3: "",
                course4: "",
                course5: "",
                course6: "",
              }}
            ></SemesterBlock>
            <SemesterBlock
              text={{
                number: "2-2",
                course1: "",
                course2: "",
                course3: "",
                course4: "",
                course5: "",
                course6: "",
              }}
            ></SemesterBlock>
            <SemesterBlock
              text={{
                number: "3-1",
                course1: "",
                course2: "",
                course3: "",
                course4: "",
                course5: "",
                course6: "",
              }}
            ></SemesterBlock>
            <SemesterBlock
              text={{
                number: "3-2",
                course1: "",
                course2: "",
                course3: "",
                course4: "",
                course5: "",
                course6: "",
              }}
            ></SemesterBlock>
            <SemesterBlock
              text={{
                number: "4-1",
                course1: "",
                course2: "",
                course3: "",
                course4: "",
                course5: "",
                course6: "",
              }}
            ></SemesterBlock>
            <SemesterBlock
              text={{
                number: "4-2",
                course1: "",
                course2: "",
                course3: "",
                course4: "",
                course5: "",
                course6: "",
              }}
            ></SemesterBlock>
          </SemesterBlocks>
          <SemesterAdd>
            <button>추가학기</button>
          </SemesterAdd>
        </SemesterListMain>
        <SemesterListSubmit>
          <button>완료</button>
        </SemesterListSubmit>
      </SemesterListContainer>
    </>
  );
};

const SemesterListContainer = styled.div`
  width: 70%;
  margin: 2em auto;
  text-align: center;
`;
const SemesterListMain = styled.div`
  width: 100%;
  max-width: 46em;
  margin: 0 auto;
`;
const SemesterBlocks = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
const SemesterAdd = styled.div`
  width: 100%;
  > button {
    float: right;
    background: none;
    border: none;
    text-decoration: underline;
    color: #747474;
    font-family: "BMJUA";
    font-size: 1em;
    font-weight: normal;
    margin: 0.2em;
    &:hover {
      cursor: pointer;
      color: #929292;
    }
  }
`;
const SemesterListSubmit = styled.div`
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

export default SemesterList;
