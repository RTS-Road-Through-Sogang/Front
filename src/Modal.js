import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Modal = ({ isVisible, closeModal }) => {
  console.log(typeof closeModal);
  const [code, setCode] = useState([...new Array(6).fill("")]);
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
    console.log("change");

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

  return isVisible ? (
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

          <CloseButton>확인</CloseButton>
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>
  ) : null;
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
