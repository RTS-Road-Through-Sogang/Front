import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const test = () => {
  return (
    <>
      <Container>
        <ButtonsForDefault>
          <Button>세팅버튼</Button>
          <Button>플러스버튼</Button>
        </ButtonsForDefault>
        <RoadmapContainer>
          <SemesterBox>
            <SemesterInfo>
              <RoadmapWrapper>
                <SemesterNumber>#1</SemesterNumber>
              </RoadmapWrapper>
            </SemesterInfo>
            <ButtonWrapper>
              <Button>수정버튼</Button>
              <Button>삭제버튼</Button>
            </ButtonWrapper>
          </SemesterBox>
          <Scene>
            <CourseContainer>
              <CourseBox>
                <CourseTopBox>
                  <SemesterText></SemesterText>
                </CourseTopBox>
                <CourseBottomBox>
                  <SemesterText></SemesterText>
                </CourseBottomBox>
              </CourseBox>
            </CourseContainer>
            <MoveButton>
              <FontAwesomeIcon>왼쪽으로버튼</FontAwesomeIcon>
              <FontAwesomeIcon>우쪽으로버튼</FontAwesomeIcon>
            </MoveButton>
          </Scene>
        </RoadmapContainer>
      </Container>
    </>
  );
};

export default test;
