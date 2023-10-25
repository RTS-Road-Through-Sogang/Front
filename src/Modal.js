import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import InputField from "./InputField";

const Modal = ({ isVisible, closeModal }) => {
  const [code, setCode] = useState(Array(6).fill(""));
  const initialRefs = Array(6)
    .fill()
    .map(() => React.createRef());
  const [refs, setRefs] = useState(initialRefs);

  useEffect(() => {
    setRefs(initialRefs);
  }, []);

  const handleInputChange = (index, e) => {
    const value = e.target.value;

    if (value === "" || /^[0-9]$/.test(value)) {
      setCode((prevCode) => {
        const newCode = [...prevCode];
        newCode[index] = value;

        return newCode;
      });

      setTimeout(() => {
        if (value && index < 5) {
          refs[index + 1].current.focus();
        } else if (!value && index > 0) {
          refs[index - 1].current.focus();
        }
      });
    }
  };

  const handleFocus = (e) => {
    // 빈 입력란이 첫 번째 위치를 찾습니다.
    const firstEmptyIndex = code.findIndex((c) => !c);

    // 첫 번째 빈 입력란이 있으면 해당 위치로 포커스 이동, 아니면 마지막 입력란으로 포커스
    if (firstEmptyIndex !== -1) {
      refs[firstEmptyIndex].current.focus();
    } else {
      refs[5].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newCode = [...code];

      // 현재 입력란에 값이 있다면 그 값을 지웁니다.
      if (code[index]) {
        newCode[index] = "";
        setCode(newCode);
        return;
      }
      // 현재 입력란에 값이 없다면 이전 입력란의 값을 지우고 포커스를 옮깁니다.
      if (index > 0) {
        newCode[index - 1] = "";
        refs[index - 1].current.focus();
        setCode(newCode);
      }

      setCode(newCode);
    }
  };

  if (!isVisible) return null;

  return (
    <ModalOverlay>
      <ModalWrapper>
        <CloseIcon onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} />
        </CloseIcon>
        <ModalContent>
          <h2>인증번호 입력</h2>
          <VerifyText>아래 이메일로 6자리 숫자가 발송되었습니다 !</VerifyText>
          <VerifyText>인증 코드를 입력하세요.</VerifyText>
          <CodeInputWrapper>
            {code.map((_, index) => (
              <CodeInput
                key={index}
                value={code[index]}
                onChange={(e) => handleInputChange(index, e)}
                onFocus={handleFocus}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={refs[index]}
                maxLength="1"
              />
            ))}
          </CodeInputWrapper>
          <CloseButton onClick={closeModal}>확인</CloseButton>
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>
  );
};

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
  color: #7a7a7a;
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
  border: none; // 모든 테두리 제거
  border-bottom: 1px solid #ababab; // 하단 테두리만 추가
  border-radius: 0; // 반올림된 모서리 제거
  outline: none; // 포커스 시 기본 윤곽선 제거
  background: transparent; // 배경색을 투명하게 설정

  &:focus {
    border-bottom-color: #ff6262; // 포커스 시 하단 테두리 색상 변경
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

const CloseIcon = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;

  & > svg {
    font-size: 1.5rem;
    color: #666;
  }
`;

export default Modal;
