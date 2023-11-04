import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const CoursesType = ({ text }) => {
  return (
    <CoursesTypeDiv>
      <CoursesTypeIcon>
        <FontAwesomeIcon icon={faCheck} />
      </CoursesTypeIcon>
      <CoursesTypeTitle>{text.title}</CoursesTypeTitle>
    </CoursesTypeDiv>
  );
};

const CoursesTypeDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
`;
const CoursesTypeIcon = styled.div`
  font-size: 2em;
  color: #ff6262;
  position: absolute;
  left: -0.8em;
`;
const CoursesTypeTitle = styled.div`
  font-size: 1.3em;
  margin-left: 0.5em;
`;

export default CoursesType;
