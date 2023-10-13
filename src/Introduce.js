import React from "react";
import styled from "styled-components";
import intro_image from "./images/main.jpeg";

const Introduce = () => {
  return (
    <>
      <Container>
        <Image src={intro_image} alt="Intro" />
        <Text>
          <DiffText> RTS</DiffText>란 무엇인가요
          <DiffText>?</DiffText>
        </Text>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 32%;
  margin: 50px auto;

  @media (max-width: 768px) {
    width: 40%;
    padding: 40 20px; // 양쪽에 패딩 추가
  }
`;

const Image = styled.img`
  width: 120%;
  object-fit: cover;
  margin-left: -15%;
  opacity: 0.3;
`;

const Text = styled.div`
  position: relative;
  color: black;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;
`;

const DiffText = styled.span`
  color: #ff6262;
`;

export default Introduce;
