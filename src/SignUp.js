import React, { useState } from "react";
import loginimage from "./images/login.jpg";
import styled, { createGlobalStyle } from "styled-components";
import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputField from "./InputField";
import Modal from "./Modal";

const SignUp = () => {
  const [showPswd, setShowPswd] = useState(false);
  const [showConfirmPswd, setShowConfirmPswd] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [studentid, setStudentid] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [major, setMajor] = useState("");
  const [email, setEmail] = useState("");
  const [verifycode, setVerifycode] = useState("");
  const [errors, setError] = useState({
    name: "",
    studentid: "",
    password: "",
    passwordConfirm: "",
    major: "",
    email: "",
    verifycode: "",
  });
  const handleSignup = async (e) => {
    e.preventDefault();
    let newErrors = {
      ...errors,
      name: "",
      studentid: "",
      password: "",
      passwordConfirm: "",
      major: "",
      email: "",
      verifycode: "",
    };

    if (!name.trim()) {
      newErrors.name = "이름을 입력하세요";
    }
    if (!studentid.trim()) {
      newErrors.studentid = "학번을 입력하세요";
    }
    if (!password.trim()) {
      newErrors.password = "비밀번호를 입력하세요";
    }
    if (!passwordConfirm.trim()) {
      newErrors.passwordConfirm = "비밀번호확인란을 입력하세요";
    }
    if (password !== passwordConfirm) {
      newErrors.passwordConfirm =
        "비밀번호와 비밀번호 확인이 일치하지 않습니다!";
    }
    if (major === "") {
      alert("전공을 선택하세요!");
    }
    if (!email.trim()) {
      newErrors.email = "이메일을 입력하세요";
    }
    setError(newErrors);
    console.log(newErrors);
  };

  const toggleConfirmPswdVisibility = () => {
    setShowConfirmPswd(!showConfirmPswd);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

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
          <InputField
            name="username"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}

          <InputField
            name="studentid"
            placeholder="학번8자리를 입력하세요 ex) 20201234"
            value={studentid}
            onChange={(e) => setStudentid(e.target.value)}
          />
          {errors.studentid && <ErrorMessage>{errors.studentid}</ErrorMessage>}

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
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

          <PasswordWrapper>
            <Input
              type={showConfirmPswd ? "text" : "password"}
              placeholder="비밀번호 재확인"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <StyledIcon
              icon={showConfirmPswd ? faEye : faEyeSlash}
              onClick={toggleConfirmPswdVisibility}
            />
          </PasswordWrapper>
          {errors.passwordConfirm && (
            <ErrorMessage>{errors.passwordConfirm}</ErrorMessage>
          )}

          <SelectWrapper>
            <StyledSelect
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            >
              <option value="" disabled>
                본전공을 선택하세요
              </option>
              <option value="경제학과">경제학과</option>
              <option value="경영학과">경영학과</option>
              <option value="컴퓨터공학과">컴퓨터공학과</option>
            </StyledSelect>
          </SelectWrapper>
          <EmailInputWrapper>
            <EmailInput
              name="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <EmailDomainLabel>@sogang.ac.kr</EmailDomainLabel>
          </EmailInputWrapper>
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

          <Verify onClick={openModal}>이메일 인증 키 발송</Verify>
          <Modal
            isVisible={showModal}
            closeModal={closeModal}
            email={email + "@sogang.ac.kr"}
          />

          <StyledButton type="submit" onClick={handleSignup}>
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
  padding: 45px;
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
  width: 89%%;

  & svg {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
`;

const EmailInputWrapper = styled.div`
  display: flex;
  width: 98.5%;
  align-items: center;
  border: 1px solid #ababab;
  border-radius: 10px;
  margin-top: 10px;
  background: rgba(255, 255, 255, 0.8);
`;

const EmailDomainLabel = styled.span`
  padding: 13px;
  pointer-events: none;
  color: #707070;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 0 10px 10px 0;
`;

const EmailInput = styled(Input)`
  flex-grow: 1; /* input 필드가 가능한 영역을 모두 차지하도록 함 */
  border-radius: 10px 0 0 10px;
  border: none;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-left: 1rem;
`;

export default SignUp;
