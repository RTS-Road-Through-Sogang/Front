import React from "react";
import styled from "styled-components";
import backimg from "./images/main_background.jpg";
import title from "./images/title.png";

const Roadmap = () => (
  <>
    <TextWrapper>
      <TopText>My Roadmap</TopText>
      <TitleImage src={title} alt="타이틀 꾸미기" />
    </TextWrapper>

    <EmptyRoadmap>
      <BackgroundWrapper>
        <Backimg src={backimg} alt="백그라운드 이미지" />
        <TextOverlay>
          아직 수강기록이 없네요!
          <br />
          로드맵을 만들기 위해서는 이수과목 정보가 필요해요
          <br />
          이미 수강한 과목을 추가하러 가볼까요?
        </TextOverlay>
      </BackgroundWrapper>
      <StyledButton>
        <span>이수과목 추가하러 가기</span>
      </StyledButton>
    </EmptyRoadmap>
  </>
);

const FONT_FAMILY = "Noto Sans";

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 5vh;
  margin-top: 30px;
  position: relative;
`;

const TitleImage = styled.img`
  position: absolute;
  top: -10px;
`;

const TopText = styled.div`
  text-align: center;
  font-family: ${FONT_FAMILY};
  font-size: 1.6rem;
  font-weight: 900;
`;

const EmptyRoadmap = styled.div`
  height: 10vh;
  display: flex;
  flex-direction: column;
`;

const BackgroundWrapper = styled.div`
  position: relative;
`;

const Backimg = styled.img`
  width: 30%;
  position: relative;
  z-index: -1;
`;

const TextOverlay = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #242424;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: BM JUA_TTF;
  font-size: 26px;
  z-index: 1;
`;

const StyledButton = styled.button`
  cursor: pointer;
  width: 20.5vw;
  height: 6vh;
  border-radius: 60px;
  border: 2px solid #ff6262;
  background: #ff6262;
  margin: 10px 0;

  @media (max-width: 768px) {
    width: 50vw;
    height: 7vh;
  }

  span {
    color: #fff;
    text-align: center;
    font-family: ${FONT_FAMILY};
    font-size: 1.1rem;
    font-weight: 700;
  }
`;

export default Roadmap;
