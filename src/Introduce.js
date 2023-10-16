import React from "react";
import styled from "styled-components";
import intro_image from "./images/main.jpeg";
import feature_image1 from "./images/main.jpeg";
import feature_image2 from "./images/main.jpeg";
import Feature from "./Feature";

const Introduce = () => {
  return (
    <>
      <IntroSection>
        <IntroImageWrapper>
          <Image src={intro_image} alt="Intro" />
        </IntroImageWrapper>
        <IntroDescription>
          복수전공, 부전공... 학교 생활은 항상 선택의 연속입니다.
          <br />
          <span>RTS </span>는 그 선택을 조금 더 간편하게 도와주는
          <br />
          <span>로드맵 플랫폼 </span>
          입니다.
        </IntroDescription>
      </IntroSection>
      <FeatureSection>
        <Feature
          image={feature_image1}
          description={{
            title: "로드맵 작성",
            detail:
              "신입생부터 재학생까지, 당신의 학기별 로드맵을 \n 직접 작성해보세요.",
          }}
        />
        <Feature
          image={feature_image2}
          description={{
            title: "학점 대시보드",
            detail:
              "이수 학점과 전공별로 학점을 얼만큼 채웠는지 \n 한눈에 볼수 있어요.",
          }}
        />
      </FeatureSection>
    </>
  );
};

const IntroSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  margin: 50px auto;
  border: 1px solid grey;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    padding: 40px 20px;
    justify-content: center;
  }
`;

const IntroImageWrapper = styled.div`
  flex: 1;
  margin-right: 10px;
`;

const Image = styled.img`
  width: 60%;
  object-fit: cover;
  opacity: 0.3;
`;

const IntroDescription = styled.div`
  flex: 1;
  font-size: 1.3em;
  position: relative;
  color: black;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;
  line-height: 3;
  span {
    color: #ff6262;
  }
`;

const FeatureSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  margin: 50px auto;
  border: 1px solid grey;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    padding: 40px 20px;
    justify-content: center;
  }
`;
export default Introduce;
