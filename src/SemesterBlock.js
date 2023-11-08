import React from "react";
import styled from "styled-components";

const SemesterBlock = ({ text }) => {
  return (
    <SemesterDiv>
      <SemesterTop>
        <span>{text.number}</span>
      </SemesterTop>
      <SemesterBottom>
        <SemesterCourses>
          <SemesterCourse>{text.course1}</SemesterCourse>
          <SemesterCourse>{text.course2}</SemesterCourse>
          <SemesterCourse>{text.course3}</SemesterCourse>
          <SemesterCourse>{text.course4}</SemesterCourse>
          <SemesterCourse>{text.course5}</SemesterCourse>
          <SemesterCourse>{text.course6}</SemesterCourse>
        </SemesterCourses>
      </SemesterBottom>
    </SemesterDiv>
  );
};

export default SemesterBlock;

const SemesterDiv = styled.div`
  width: 9em;
  height: 13em;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0.3em;
  margin: 0 0.4em 0.8em 0.4em;
  transition: all 0.15s linear;
  &:hover {
    cursor: pointer;
    transform: scale(1.07);
  }
`;
const SemesterTop = styled.div`
  width: 100%;
  height: 1.8em;
  padding: 0.2em 0 0 0;
  background-color: #ff8c8c;
  border-radius: 20px 20px 0 0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
  color: #fff;
  font-family: "BMJUA";
  font-size: 1.9em;
  font-weight: normal;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SemesterBottom = styled.div`
  width: 100%;
  height: 8.8em;
  border-radius: 0 0 20px 20px;
  background-color: #fff;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
  margin: 0;
  padding: 0;
`;
// const SemesterCheck = styled.div`
//   color: #ff6262;
//   font-size: 5em;
//   display: none;
// `;
const SemesterCourses = styled.ul`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  list-style: none;
  font-size: 0.9em;
  color: #cccccc;
  padding: 0;
  margin: 0;
`;
const SemesterCourse = styled.li`
  list-style: none;
  font-family: "Noto Sans KR";
  font-weight: 400;
  font-size: 0.9em;
  padding: 0;
  margin: 0;
  line-height: 1.5em;
`;
