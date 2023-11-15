import React, { useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";

//import main_image from "./images/123.jpg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import background_image from "./images/background.jpg";
import sign_image from "./images/sign.jpg";

import feature_image1 from "./images/main.jpeg";
import feature_image2 from "./images/main.jpeg";
import Feature from "./Feature";
import { useNavigate } from "react-router-dom";
import "aos/dist/aos.css"; // AOS styles
import Aos from "aos";

const Introduce = () => {
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);

  const navigate = useNavigate();
  const goToSign = () => {
    navigate("/login");
  };
  const title = "Road Through Sogang";
  const highlightIndices = [0, 5, 13];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Timeline을 생성합니다.
    Aos.init({});

    const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

    // AnimatedSpan에 대한 애니메이션을 설정합니다.
    title.split("").forEach((char, index) => {
      tl.to(
        `.char-${index}`, // char-X 클래스를 가진 각 글자에 대한 애니메이션을 생성
        { autoAlpha: 1, y: 0, delay: index * 0.1 }, // 지연 시간을 감소시켜 애니메이션을 더 빠르게
        0 // 모든 애니메이션을 타임라인 시작점에 추가
      );
    });
    gsap.set("#MainImage", { autoAlpha: 1 });
    // 모든 글자 애니메이션이 끝난 후 0.5초 지연된 후 MainImage가 화면 상단에서 아래로 떨어지면서 나타납니다.
    tl.from("#MainImage", {
      y: "-50%", // 이미지가 화면 위에서 시작합니다.
      autoAlpha: 0, // 이미지가 완전히 투명하게 시작합니다.

      ease: "bounce.out", // 떨어지는 애니메이션에 바운스 효과를 줍니다.
    });
    // 마지막에 autoAlpha를 1로 설정하여 요소가 보이도록 함
    tl.to("#MainImage", { autoAlpha: 1, y: "50%", duration: 0.5 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
          } else {
            entry.target.style.opacity = 0;
          }
        });
      },
      { threshold: 1 }
    );
    // DOM 요소가 준비되었는지 확인하고 observer를 등록합니다.

    const refs = [line1Ref, line2Ref, line3Ref];
    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      } else {
        console.log("ref.current is not available:", ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [title]);

  return (
    <>
      <GlobalStyles />
      <BackgroundWrapper>
        <MainSection>
          <MainImageWrapper>
            <MainImage src={sign_image} alt="Main" />
          </MainImageWrapper>
          <MainText>
            {title.split("").map((char, index) =>
              char === " " ? (
                <span key={index}> </span>
              ) : (
                <AnimatedSpan
                  key={index}
                  className={`char-${index}`}
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
          <IntroDescription id="IntroDescription">
            <IntroDescriptionLine ref={line1Ref}>
              복수전공, 부전공... 학교 생활은 항상 선택의 연속입니다.
            </IntroDescriptionLine>
            <IntroDescriptionLine ref={line2Ref}>
              <span>RTS </span>는 그 선택을 조금 더 간편하게 도와주는
            </IntroDescriptionLine>
            <IntroDescriptionLine ref={line3Ref}>
              <span>로드맵 플랫폼 </span>
              입니다.
            </IntroDescriptionLine>
          </IntroDescription>
        </IntroSection>
        <Feature />

        <StartSection>
          <StyledButton
            onClick={goToSign}
            data-aos="pulse"
            data-aos-delay="300"
          >
            <span>시작하기</span>
          </StyledButton>
        </StartSection>
      </BackgroundWrapper>
    </>
  );
};
const GlobalStyles = createGlobalStyle`
    body {
      margin: 0;
      padding: 0;
      
    }
    .fadeInRight {
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

const MainSection = styled.div.attrs({ id: "MainSection" })`
  display: flex;
  height: 90vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  margin: 0 auto;
`;

const BackgroundWrapper = styled.div`
  width: 100%;
  height: 100 vh;
  background-image: url(${background_image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
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

const MainImageWrapper = styled.div`
  width: 20%;
  margin-top: 20%;
  margin-left: 38%;
`;

const MainImage = styled.img.attrs({ id: "MainImage" })`
  max-width: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-out;
  transform: scale(${(props) => props.scale});
`;

const IntroSection = styled.div.attrs({ id: "IntroSection" })`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
  position: relative;
  top: 5vh;
  flex: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    padding: 40px 20px;
    justify-content: center;
  }
`;

const IntroDescription = styled.div`
  flex: 1;
  font-size: 2.5em;
  position: relative;
  color: black;
  font-weight: 900;
  line-height: 3;
  text-align: center;
`;

const IntroDescriptionLine = styled.span`
  display: block; // 각 줄을 블록 요소로 만듭니다.
  opacity: 0;
  margin-bottom: 35%;
  transition: all 1s;
  span {
    color: #ff6262;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;
const StartSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledButton = styled.button`
  font-family: "Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  width: 30vw;
  height: 8vh;
  border-radius: 60px;
  border: 2px solid #ff6262;
  background: #ff6262;
  margin-bottom: 5%;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* 그림자 효과를 추가하여 돌출되는 듯한 효과를 줌 */
  }
  animation: pulse 2s infinite;
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
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
