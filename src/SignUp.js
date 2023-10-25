import React, { useState } from "react";
import loginimage from "./images/login.jpg";
import styled, { createGlobalStyle } from "styled-components";
import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons"; // solid 아이콘 패키지에서 import

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputField from "./InputField";

const SignUp = () => {
  const [showPswd, setShowPswd] = useState(false);
  const togglePswdVisibility = () => {
    setShowPswd(!showPswd);
  };

  return (
    <>
      <GlobalStyles />
      <MainSection>
        <MainImage src={loginimage} alt="Main" />
        <LoginForm>
          <LoginText>회원가입하기</LoginText>
          <InputField name="username" placeholder="이름을 입력하세요" />
          <InputField name="username" placeholder="학번을 입력하세요" />
          <PasswordWrapper>
            <Input
              type={showPswd ? "text" : "password"}
              placeholder="비밀번호를 입력하세요"
            />
            <StyledIcon
              icon={showPswd ? faEye : faEyeSlash}
              onClick={togglePswdVisibility}
            />
          </PasswordWrapper>
          <PasswordWrapper>
            <Input
              type={showPswd ? "text" : "password"}
              placeholder="비밀번호 재확인"
            />
            <StyledIcon
              icon={showPswd ? faEye : faEyeSlash}
              onClick={togglePswdVisibility}
            />
          </PasswordWrapper>
          <SelectWrapper>
            <StyledSelect>
              <option value="" disabled selected>
                본전공을 선택하세요
              </option>
              <option value="경제학과">경제학과</option>
              <option value="경영학과">경영학과</option>
              <option value="컴퓨터공학과">컴퓨터공학과</option>
            </StyledSelect>
            <FontAwesomeIcon
              icon={faPlay}
              rotation={270}
              style={{ color: "#ff8484" }}
            />
          </SelectWrapper>
          <InputField name="username" placeholder="이메일을 입력하세요" />
          <Verify>이메일 인증 키 발송</Verify>
          <StyledButton>
            <span>회원가입하기</span>
          </StyledButton>
        </LoginForm>
      </MainSection>
    </>
  );
};

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    
  }
`;
const MainSection = styled.div`
  width: 100%;

  justify-content: center;
  background-position: center;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  background-attachment: fixed;
  position: relative;

  margin: 0 auto;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    padding: 40px 20px;
    justify-content: center;
  }
`;

const MainImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const LoginForm = styled.div`
  position: absolute;
  border: 1px solid #ababab;
  border-radius: 10px;
  box-shadow: 5px 10px 10px 1px rgba(0, 0, 0, 0.3);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);

  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 300px;
`;
const LoginText = styled.div`
  font-size: 1.5em;
  font-weight: 700;
`;
const Input = styled.input`
  padding: 13px;
  border-radius: 10px;
  border: 1px solid #ababab;
  background: #fff;
  width: 89%;
`;

const PasswordWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 10px;
  cursor: pointer;
`;

const StyledButton = styled.button`
  cursor: pointer;
  width: 20.5vw;
  height: 6vh;
  border-radius: 60px;
  border: 2px solid #ff6262;
  background: #ff6262;
  margin-top: 10px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    width: 50vw;
    height: 7vh;
  }
  span {
    color: #fff;
    text-align: center;
    font-family: Noto Sans;
    font-size: 1.1rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

const Verify = styled.div`
  text-align: center;
  text-decoration: underline;
  color: #7a7a7a;
  cursor: pointer;
`;

const StyledSelect = styled.select`
  padding: 13px;
  border-radius: 10px;
  border: 1px solid #ababab;
  background: #fff;
  width: 98.5%;
  appearance: none;
  padding-right: 30px;
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 98.5%;

  & svg {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
`;

export default SignUp;
