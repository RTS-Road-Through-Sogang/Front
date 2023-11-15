// 인증번호 성공했을때만 확인 버튼이 팝업 창이 뜨면서 모달이 닫혀야함.

import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
export const BASE_URL = process.env.REACT_APP_BASE_URL;

const Modal = ({ isVisible, closeModal, email, onVerified }) => {
  const [code, setCode] = useState([...new Array(6).fill("")]);
  const [verified, setVerified] = useState(false); // 인증 성공 여부 상태
  const [verifyMessage, setVerifyMessage] = useState("");
  const [backendCode, setBackendCode] = useState("");
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
  const fetchAndSetVerificationCode = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/verify_email/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      const data = await response.json();
      const match = /(\d{6})/.exec(data.message); // 숫자 6자리를 추출하는 정규표현식
      // 이 로직은 무조건 성공할수밖에없음
      if (match && match[1]) {
        setBackendCode(match[1]);
      } else {
        // 추출 실패 처리
        setVerifyMessage(
          "인증번호를 받아올 수 없습니다. 관리자에게 문의해주세요."
        );
      }
    } catch (error) {
      // 에러 처리
      setVerifyMessage("서버와의 통신 중 문제가 발생했습니다.");
    }
  };

  const handleResendVerificationCode = async () => {
    await fetchAndSetVerificationCode(); // 인증번호를 다시 요청하는 함수 호출
  };

  // Modal 컴포넌트 내에서 인증번호를 받아오기 위해 useEffect 훅을 사용합니다.
  // isVisible의 이전 값을 추적하기 위한 ref
  const prevIsVisibleRef = useRef();

  useEffect(() => {
    // 모달이 처음 열릴 때만 인증번호를 요청합니다.
    if (isVisible && !prevIsVisibleRef.current) {
      fetchAndSetVerificationCode();
    }
    // 현재 isVisible 값을 ref에 저장합니다.
    prevIsVisibleRef.current = isVisible;
  }, [isVisible]);

  // 사용자가 인증 버튼을 클릭했을 때 호출되는 함수
  const handleVerifyClick = async () => {
    const enteredCode = code.join("");
    if (enteredCode === backendCode) {
      setVerified(true);
      setVerifyMessage(
        "이메일 인증이 성공되었습니다, 창은 3초후 자동으로 닫힙니다."
      );
      onVerified(true);
      setTimeout(closeModal, 3000);
    } else {
      setVerified(false);
      setVerifyMessage("올바른 인증번호를 입력하세요");
      onVerified(false);
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
            <ResendLink onClick={handleResendVerificationCode}>
              이메일 재전송하기
            </ResendLink>
          </VerifyText>
          <VerifyText
            fontSize="0.8rem"
            fontColor={verified ? "#32CD32" : "#FF6347"}
          >
            {verifyMessage}
          </VerifyText>

          <CloseButton onClick={handleVerifyClick}>확인</CloseButton>
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
