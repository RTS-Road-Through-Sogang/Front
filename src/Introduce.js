import React from "react";
import styled from "styled-components";
import intro_image from "./images/main.jpeg";

const Introduce = () => {
  return (
    <Container>
      <ImageWrapper>
        <Image src={intro_image} alt="Intro" />
      </ImageWrapper>
      <Text>
        복수전공, 부전공... 학교 생활은 항상 선택의 연속입니다.
        <br />
        <DiffText>RTS </DiffText>는 그 선택을 조금 더 간편하게 도와주는{" "}
        <DiffText>로드맵 플랫폼 </DiffText>
        입니다.
      </Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; // 여기에 추가
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

const ImageWrapper = styled.div`
  flex: 1;
  margin-right: 10px;
`;

const Image = styled.img`
  width: 60%;
  object-fit: cover;
  opacity: 0.3;
`;

const Text = styled.div`
  flex: 1;
  position: relative;
  color: black;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;
  line-height: 5;
`;

const DiffText = styled.span`
  color: #ff6262;
`;

export default Introduce;
