import React, { useState } from "react";
import loginimage from "./images/login.jpg";
import styled, { createGlobalStyle } from "styled-components";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
export const BASE_URL = process.env.BASE_URL;

console.log(BASE_URL);
console.log("ㅇㅇㅇㅇㅇ");
const Login = () => {
  const navigate = useNavigate();
  const goToSign = () => {
    navigate("/signup");
  };
  const [studentnumber, setStudentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPswd, setShowPswd] = useState(false);
  const [continuelogin, setContinueLogin] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState("");
  const togglePswdVisibility = () => {
    setShowPswd(!showPswd);
  };

  const handleLogin = async () => {
    if (!studentnumber.trim()) {
      setVerifyMessage("아이디를 입력하세요");
      return;
    }
    if (!password.trim()) {
      setVerifyMessage("비밀번호를 입력하세요");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/users/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_number: studentnumber,
          password: password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("accessToken", data.access);
        navigate("/roadmap");
      } else {
        setVerifyMessage(data.message || "아이디, 비밀번호를 확인해주세요.");
      }
    } catch (error) {
      setVerifyMessage(
        "로그인 시도 중 오류가 발생했습니다. 다시 시도해주세요."
      );
      console.error(error);
    }
  };
  const handleCheckboxChange = () => {
    setContinueLogin(!continuelogin);
  };

  return (
    <>
      <GlobalStyles />
      <MainSection>
        <MainImage src={loginimage} alt="Main" />
        <LoginForm>
          <LoginText>로그인</LoginText>
          <InputField
            name="username"
            placeholder="학번을 입력하세요"
            value={studentnumber}
            onChange={(e) => setStudentNumber(e.target.value)}
          />

          <PasswordWrapper>
            <Input
              type={showPswd ? "text" : "password"}
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <StyledIcon
              icon={showPswd ? faEye : faEyeSlash}
              onClick={togglePswdVisibility}
            />
          </PasswordWrapper>
          <VerifyText fontSize="0.8rem" fontColor={"#FF6347"}>
            {verifyMessage}
          </VerifyText>
          <CheckboxWrapper>
            <CheckboxInput
              id="check_btn"
              checked={continuelogin}
              onChange={handleCheckboxChange}
            />
            <CheckboxLabel htmlFor="check_btn">로그인 상태 유지</CheckboxLabel>
          </CheckboxWrapper>
          <StyledButton type="submit" onClick={handleLogin}>
            <span>로그인</span>
          </StyledButton>
          <GreyLine />
          <Other>
            <GoSignUpText>회원이 아니신가요?</GoSignUpText>
            <OtherButton>
              <span onClick={goToSign}>회원가입하기</span>
            </OtherButton>
          </Other>
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
const VerifyText = styled.div`
  text-align: center;
  color: ${(props) => props.fontColor || "#7a7a7a"};
  font-size: ${(props) => props.fontSize || "1rem"};
  margin-top: 15px;
`;

const CheckboxWrapper = styled.div`
  margin-top: 10px;
  position: relative;
`;
const CheckboxLabel = styled.label`
  position: relative;
  padding-left: 30px; // 체크박스 크기 + 간격
  cursor: pointer;
  font-size: 14px;
  color: #7a7a7a;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    border: 2px solid #ababab;
    border-radius: 4px;
    background-color: #fff;
  }

  &::after {
    content: "\\2713"; // 체크 표시
    font-size: 23px;
    color: #ff6262; // 체크 색상
    text-align: center;
    line-height: 20px;
    position: absolute;
    left: 1%;
    top: 60%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    opacity: 0;
  }
`;

const CheckboxInput = styled.input.attrs({ type: "checkbox" })`
  opacity: 0;
  position: absolute;
  width: 0;
  height: 0;

  &:checked + ${CheckboxLabel}::before {
    border-color: #ff6262;
  }

  &:checked + ${CheckboxLabel}::after {
    opacity: 1;
  }
`;

const StyledButton = styled.button`
  cursor: pointer;
  widht: 100%;
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
const GreyLine = styled.div`
  width: 100%;
  border-top: 2px solid #ababab;
  margin-bottom: 20px;
`;

const Other = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const OtherButton = styled.button`
  cursor: pointer;
  width: 48%;
  height: 4.5vh;
  border-radius: 60px;
  border: 2px solid #ff6262;
  background: #ff6262;
  margin-left: 30px;

  span {
    color: #fff;
    text-align: center;
    font-family: Noto Sans;
    font-size: 0.8rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

const GoSignUpText = styled.div`
  color: #7a7a7a;
`;
export default Login;
