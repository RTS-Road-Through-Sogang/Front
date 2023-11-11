import React from "react";
import styled from "styled-components";
import feature_image1 from "./images/main.jpeg";
import feature_image2 from "./images/main.jpeg";

const Feature = () => {
  return (
    <FeatureSection>
      <FeatureContainer>
        <FeatureImage src={feature_image1} />
        <FeatureDetail>
          <Highlight>신입생부터 재학생까지,</Highlight> 당신의 학기별{" "}
          <Highlight>로드맵</Highlight>을 직접 작성해보세요.
        </FeatureDetail>
      </FeatureContainer>
      <FeatureContainer>
        <FeatureImage src={feature_image2} />
        <FeatureDetail>
          이수 학점과 전공별로 학점을 얼만큼 채웠는지 한눈에 볼수 있어요.
        </FeatureDetail>
      </FeatureContainer>
    </FeatureSection>
  );
};
const FeatureSection = styled.div.attrs({ id: "FeatureSection" })`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-top: 20%;

  @media (max-width: 768px) {
    width: 100%;
    padding: 40px 20px;
  }
`;

const FeatureContainer = styled.div`
  display: flex;

  align-items: center;
  margin-left: 5%;
  margin-bottom: 15%;
  width: 70%;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 70%;
    padding: 40px 20px;
    justify-content: center;
  }
`;

const FeatureImage = styled.img`
  width: 50%;
  object-fit: cover;
  opacity: 0.9;
`;

const FeatureDetail = styled.p`
  min-width: 60%;
  margin-left: 10%;
  font-size: 2.5em;
  line-height: 2;
  text-align: center;
`;

const Highlight = styled.span`
  color: #ff6262;
  font-weight: bold;
`;
export default Feature;
