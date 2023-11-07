// 인증번호 성공했을때만 확인 버튼이 팝업 창이 뜨면서 모달이 닫혀야함.

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import App from "./App";

const Modal = ({ isVisible, closeModal, email }) => {
  const [code, setCode] = useState([...new Array(6).fill("")]);
  const [verified, setVerified] = useState(false); // 인증 성공 여부 상태
  const [verifyMessage, setVerifyMessage] = useState("");
  const refs = new Array(6).fill().map(() => React.createRef());

  const changeRef = (idx, isLeft) => {
    if (isLeft && idx > 0) {
      refs[idx - 1].current.focus();
    } else if (!isLeft && idx < 5) {
      refs[idx + 1].current.focus();
    }
  };

  const handleOnChange = (e, idx) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value)) {
      setCode((prev) => {
        const newCode = [...prev];
        newCode[idx] = value;
        return newCode;
      });

      changeRef(idx, false);
    }
  };

  const handleKeyDown = (e, idx) => {
    const { key } = e;

    if (key === "Backspace") {
      e.preventDefault();
      const value = e.target.value;

      if (value) {
        setCode((prev) => {
          const newCode = [...prev];
          newCode[idx] = "";
          return newCode;
        });
        return;
      }

      changeRef(idx, true);
    }
  };

  const handleVerifyClick = async () => {
    const enteredCode = code.join("");
    // 백엔드에서 제공하는 인증 코드와 비교하는 로직 필요
    // 예시: const backendCode = "123456"; // API 호출로 얻어야 함
    // const isMatch = enteredCode === backendCode;
    const isMatch = true; // API 호출 결과를 받으면 여기에 적용

    if (isMatch) {
      setVerified(true);
      setVerifyMessage("이메일 인증이 성공되었습니다");
      closeModal(); // 인증 성공시 모달 닫기
    } else {
      setVerified(false);
      setVerifyMessage("올바른 인증번호를 입력하세요");
    }
  };

  return isVisible ? (
    <ModalOverlay>
      <ModalWrapper>
        <ModalContent>
          <ModalHeader>
            <Title>인증번호 입력</Title>
            <CloseIcon onClick={closeModal}>
              <FontAwesomeIcon icon={faTimes} />
            </CloseIcon>
          </ModalHeader>
          <VerifyText>아래 이메일로 6자리 숫자가 발송되었습니다 !</VerifyText>
          <VerifyText fontColor="#ff6262">{email}</VerifyText>
          <VerifyText>인증 코드를 입력하세요.</VerifyText>

          <CodeInputWrapper>
            {code.map((value, idx) => (
              <CodeInput
                key={`input_${idx}`}
                value={value}
                ref={refs[idx]}
                onChange={(e) => handleOnChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                maxLength={1}
              />
            ))}
          </CodeInputWrapper>
          <VerifyText fontSize="0.9rem">
            이메일을 받지 못하셨나요?
            <ResendLink> 이메일 재전송하기</ResendLink>
          </VerifyText>
          <VerifyText
            fontSize="0.8rem"
            fontColor={verified ? "#32CD32" : "#FF6347"}
          >
            {verifyMessage}
          </VerifyText>

          <CloseButton onClick={closeModal}>확인</CloseButton>
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>
  ) : null;
};
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;
const Title = styled.h2`
  margin: 0; // 기본 마진 제거
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalWrapper = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 5px 16px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const VerifyText = styled.div`
  text-align: center;
  color: ${(props) => props.fontColor || "#7a7a7a"};
  font-size: ${(props) => props.fontSize || "1rem"};
  margin-top: 15px;
`;
const CodeInputWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;
const CodeInput = styled.input`
  width: 30px;
  height: 40px;
  font-size: 1.5rem;
  text-align: center;
  border: none;
  border-bottom: 1px solid #ababab;
  border-radius: 0;
  outline: none;
  background: transparent;

  &:focus {
    border-bottom-color: #ff6262;
  }
`;

const CloseButton = styled.button`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ababab;
  background-color: #ff6262;
  color: white;
  cursor: pointer;
  align-self: center;
`;
const ResendLink = styled.span`
  color: #7a7a7a;
  cursor: pointer;
  text-decoration: underline;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 15px; /* 적당한 상단 마진을 줘서 구분감을 줌 */

  &:hover {
    text-decoration: none; /* 마우스 오버시 밑줄 제거 */
    color: #585858; /* 마우스 오버시 글씨 색 변경 */
  }
`;

const CloseIcon = styled.div`
  position: absolute;
  top: -1px;
  right: 10px;
  cursor: pointer;

  & > svg {
    font-size: 1.5rem;
    color: #666;
  }
`;

export default Modal;
