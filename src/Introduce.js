import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import main_image from "./images/milestone.jpg";
//import main_image from "./images/123.jpg";

import feature_image1 from "./images/main.jpeg";
import feature_image2 from "./images/main.jpeg";
import Feature from "./Feature";
import { useNavigate } from "react-router-dom";

const Introduce = () => {
  const navigate = useNavigate();
  const goToSign = () => {
    navigate("/login");
  };
  const title = "Road Through Sogang";
  const highlightIndices = [0, 5, 13];
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시에만 실행되도록 합니다.
  return (
    <>
      <GlobalStyles />
      <MainSection>
        <MainImageWrapper>
          <MainImage src={main_image} alt="Main" scale={1 + scrollY / 1000} />
        </MainImageWrapper>
        <MainText>
          {title.split("").map((char, index) =>
            char === " " ? (
              <span key={index}> </span>
            ) : (
              <AnimatedSpan
                key={index}
                delay={index * 0.1} // 각 글자에 약간의 지연을 줘서 순차적으로 나타나게 함
                highlight={highlightIndices.includes(index)} // 'R', 'T', 'S'는 하이라이트 색상을 적용
              >
                {char}
              </AnimatedSpan>
            )
          )}
        </MainText>
      </MainSection>
      <IntroSection>
        <IntroImageWrapper>
          <Image src={feature_image1} alt="Intro" />
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
        <FeatureTitle>Feature</FeatureTitle>
        <FeatureWrapper>
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
        </FeatureWrapper>
      </FeatureSection>
      <StartSection>
        <BeginPrompt>그럼, 시작해 볼까요 ?</BeginPrompt>
        <StyledButton onClick={goToSign}>
          <span>시작하기</span>
        </StyledButton>
      </StartSection>
    </>
  );
};
const GlobalStyles = createGlobalStyle`
    body {
      margin: 0;
      padding: 0;
      
    }
    @keyframes fadeInRight {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
  `;

const MainSection = styled.div`
  display: flex;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  width: 100%;
  margin: 0 auto;
`;
const AnimatedSpan = styled.span`
  display: inline-block; // 각 span이 별도의 블록으로 처리되도록 설정
  opacity: 0; // 초기 상태를 불투명으로 설정
  animation: fadeInRight 1.3s ease forwards; // 애니메이션 적용
  animation-delay: ${(props) => props.delay}s; // 지연 시간을 prop으로 설정
  color: ${(props) =>
    props.highlight ? "#ff6262" : "white"}; // 조건부 스타일링
`;

const MainText = styled.div`
  font-family: "Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif;
  font-size: 4.3em;
  color: white;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 10%;
  left: 25.5%;
`;

const SubText = styled.div`
  font-size: 2.5em;
  color: white;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 40%;
  left: 10%;
`;

const MainImageWrapper = styled.div`
  width: 100%;
`;

const MainImage = styled.img`
  max-width: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-out;
  transform: scale(${(props) => props.scale});
`;

const IntroSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin: 150px auto;
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
  max-width: 60%;
  object-fit: cover;
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
const FeatureTitle = styled.div`
  width: 100%;
  font-size: 2em;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const FeatureWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const FeatureSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 50px auto;
  border: 1px solid grey;

  @media (max-width: 768px) {
    width: 100%;
    padding: 40px 20px;
  }
`;
const StartSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BeginPrompt = styled.div`
  font-family: "Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif;
  font-size: 1.3em;
  position: relative;
  color: black;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;
  line-height: 3;
`;

const StyledButton = styled.button`
  font-family: "Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif;
  cursor: pointer;
  width: 30vw;
  height: 8vh;
  border-radius: 60px;
  border: 2px solid #ff6262;
  background: #ff6262;

  @media (max-width: 768px) {
    width: 50vw;
    height: 7vh;
  }
  span {
    color: #fff;
    text-align: center;
    font-family: "Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif;
    font-size: 1.3rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
export default Introduce;
