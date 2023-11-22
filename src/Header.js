import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faUser, faLayerGroup, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const goToIntro = () => {
    navigate("/intro");
  };
  const goToLogin = () => {
    navigate("/login");
  };
  const goToSign = () => {
    navigate("/signup");
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserOptionsOpen, setIsUserOptionsOpen] = useState(false);
  return (
    <>
      <GlobalStyles />
      <StyledHeader>
        {" "}
        {/* 여기서 `isUserOptionsOpen` prop을 제거합니다. */}
        <MenuToggle onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FontAwesomeIcon icon={!isMenuOpen ? faBars : faTimes} />
        </MenuToggle>
        <Logo onClick={goToIntro}>
          <FontAwesomeIcon icon={faGraduationCap} /> RTS
        </Logo>
        <UserToggle onClick={() => setIsUserOptionsOpen(!isUserOptionsOpen)}>
          <FontAwesomeIcon icon={!isUserOptionsOpen ? faUser : faTimes} />
        </UserToggle>
        <UserOptions open={isUserOptionsOpen}>
          {" "}
          {/* `open` prop으로 변경합니다. */}
          <OptionItem onClick={goToLogin}>Login</OptionItem>
          <OptionItem onClick={goToSign}>Register</OptionItem>
        </UserOptions>
      </StyledHeader>
    </>
  );
};

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

const StyledHeader = styled.header`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  box-shadow: 0 4px 4px -4px #ccc;
`;
//#e0c0d4
const Logo = styled.div`
  margin: 0 3rem;
  margin-top: 0.5rem;
  font-size: 1.7rem;
  cursor: pointer;
  font-family: "BMJUA";
  color: rgb(30, 48, 80);
`;

const MenuToggle = styled.div`
  display: none;
  font-size: 1.5rem;
  padding: 1rem;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const UserToggle = styled(MenuToggle)``;

const UserOptions = styled.ul`
  list-style: none;
  display: flex;
  margin: 2rem;

  @media screen and (max-width: 768px) {
    display: ${(props) => (props.isUserOptionsOpen ? "flex" : "none")};
    flex-direction: column;
    width: 100%;
    background-color: black;

    li {
      margin: 1rem 0;
      padding: 0;
    }
  }
`;

const OptionItem = styled.li`
  padding: 0 1rem;
  color: black;
  cursor: pointer;
  font-weight: 700;
  &:hover {
    color: grey;
  }
`;
export default Header;
