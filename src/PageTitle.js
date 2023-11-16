import React from "react";
import styled from "styled-components";
import titleicon from "./images/titleicon.svg";

const PageTitle = ({ text }) => {
  return (
    <PageTitleDiv>
      <PageTitleNormal>{text.left}</PageTitleNormal>
      <PageTitleBold>{text.bold}</PageTitleBold>
      <PageTitleNormal>{text.right}</PageTitleNormal>
      <PageTitleIcon src={titleicon} />
    </PageTitleDiv>
  );
};

const PageTitleDiv = styled.div`
  font-family: "BMJUA";
  font-size: 2em;
  font-weight: normal;
  margin: 2em 0;
`;
const PageTitleBold = styled.span`
  padding: 0 0.1em;
  background-image: linear-gradient(
    to top,
    rgba(255, 158, 158, 0.7) 60%,
    rgba(0, 0, 0, 0) 40%
  );
`;
const PageTitleNormal = styled.span``;
const PageTitleIcon = styled.img`
  margin-left: 0.1em;
  margin-bottom: 0.37em;
`;

export default PageTitle;
