import styled from "styled-components";

import { keyframes } from "styled-components";

export const ProgressBar = styled.div`
  width: 60%;
  height: 20px;
  background-color: #f5f5f5;
  border-radius: 20px;

  overflow: hidden;
  margin: 2% auto;
`;

export const Progress = styled.div`
  width: ${(props) => props.width}%;
  height: 30px;
  padding: 0;
  text-align: center;
  background-color: ${(props) => props.bgColor};
  color: #111;
`;

export const BigTitles = styled.div`
  text-align: center;
  margin-bottom: 5%;
  margin-top: 5%;
`;

export const BigBox = styled.div`
  width: 60%;
  margin: 0 auto;
  cursor: pointer;

  display: flex;
`;

export const LeftBox = styled.div`
  width: 70%;
`;

export const RightBox = styled.div`
  width: 30%;
`;

export const ProgressBar2 = styled.div`
  width: 80%;
  height: 20px;
  background-color: #ffabd5;
  border-radius: 10px;

  overflow: hidden;

  margin: 2% auto;
`;

export const Progress2 = styled.div`
  width: ${(props) => props.width}%;
  height: 30px;
  padding: 0;
  text-align: center;
  background-color: ${(props) => props.bgColor};

  color: #111;
`;

export const InsideBar = styled.div`
  width: auto;
  font-size: 0.7rem;

  margin-top: 2%;
  line-height: 15px;
  color: #453e3e;
  padding: 0 15%;
`;
export const Eta = styled.div`
  position: relative;
`;
export const ClickableImage = styled.img`
  // position: absolute;
  cursor: pointer;
  width: 25px;
  // top: -40%;

  textdecoration: "underline";
  aspect-ratio: 1; /* 이 숫자는 가로세로 비율입니다. 예를 들어, 1은 1:1 비율을 의미합니다. */
  z-index: 1000;
`;
export const Semester1 = styled.div`
  float: left;
  box-shadow: inset 0 -10px 0 #ffe7f3;
  margin-bottom: 4%;
  margin-top: 2%;
`;

export const Semester2 = styled.div`
  float: right;
  box-shadow: inset 0 -10px 0 #ffabd5;
  margin-bottom: 4%;
  margin-top: 2%;
`;

export const Title = styled.div`
  display: flex;
  margin-bottom: 1%;
`;

export const Icon = styled.div`
  margin-right: 2%;
`;

export const TitleText = styled.div`
  margin-bottom: 2%;
  width: 100%;
  font-family: "BMJUA";
  font-size: 1.6em;
`;

export const SmallBox = styled.div`
  width: auto%;
  margin-top: 3%;
  positon: relative;
`;
export const XSmaillBox = styled.div`
  overflow-x: auto; // 가로 스크롤을 허용
  white-space: nowrap; // 텍스트 줄 바꿈 방지
  margin-right: 100px;
`;
export const SelectBox = styled.button`
  font-size: 0.9rem;
  font-family: "Noto Sans KR";
  font-weight: 500;
  margin-right: 4%;
  text-align: left;

  margin-bottom: 2%;

  padding: 3% 3%;

  

  background-color: ${({ isClicked }) => (!isClicked ? "#EFEFEF" : "white")};
  border: ${({ isClicked }) =>
    !isClicked ? "0.2rem solid #EFEFEF" : "0.2rem solid #ff7474"};
  color: ${({ isClicked }) => (!isClicked ? "#B3B3B3" : "#ff7474")};
  font-weight: ${({ isClicked }) => (!isClicked ? 500 : 700)};
  box-shadow: ${({ isClicked }) =>
    !isClicked
      ? "3px 3px 3px rgba(0, 0, 0, 0.08);"
      : "3px 3px 3px rgba(235, 218, 218);"};
  : 
`;

export const HoverBox = styled.div`
  display: none;
  position: absolute;
  border: 0.2rem solid #ababab;
  margin-top: 1%;
  color: #ff6262;
  font-family: "Noto Sans KR";
  font-weight: 700;

  border-radius: 20px;
  padding: 0.5% 1%;
  margin-left: -1%;
  background-color: #ababab;
  ${SelectBox}:hover & {
    display: block;
  }
`;

export const TotalBar = styled.div`
  text-align: center;
  margin: 3% auto;
  font-size: 1.1rem;
  font-family: "Noto Sans KR";
  font-weight: 400;
`;

export const FirstBar = styled.div`
  background-color: #fff2f2;
  border-radius: 20px;
  padding: 5% 1%;
  margin-top: 4%;
`;
export const SecondBar = styled.div`
  background-color: #fff2f2;
  border-radius: 20px;
  padding: 5% 1%;
  margin-top: 4%;
`;
export const SelectBar = styled.div`
  text-align: center;
  margin: 3% auto;
  font-size: 1.2rem;
`;
export const Bar = styled.div`
  display: flex;
  margin: 3% 3% 3% 3%;
`;
export const BarText = styled.div`
  width: 30%;
  margin: 3% auto;
  font-size: 0.9rem;
`;
export const PointDisplay = styled.div`
  font-size: 0.9rem;
  margin-left: 3%;
  margin-top: 2%;
`;
export const animation = (w, e, bg, ex_bg) => keyframes` 


  0%{
    width: ${e}%;
    opacity:1;
    background-color: ${ex_bg};
  }
 
  100%{
    width: ${w}%;
    opacity:1;
    background-color: ${bg}
  }
`;
export const MiniBar = styled.div`
  width: 50%;
  height: 20px;
  background-color: white;
  border-radius: 20px;

  overflow: hidden;
  margin: 3% auto;
`;
export const Mini = styled.div`
  width: ${(props) => props.width}%;
  height: 30px;
  padding: 0;
  text-align: center;
  background-color: ${(props) => props.bgColor};
  color: #111;
  float: right;
  animation: ${(props) =>
    animation(props.width, props.ex_width, props.bgColor, props.ex_bg)};
  animation-fill-mode: none;
  animation-duration: 1s;
`;
export const Save = styled.div`
  text-align: center;

  margin-top: 5%;
  padding: 4% 0;
  border-radius: 60px;
  background-color: #ff6262;
  color: white;
  font-family: "Noto Sans KR";
  font-weight: 700;
`;
export const Next = styled.div`
  text-align: center;

  background-color: #fff2f2;
  padding: 4% 0;
  margin-top: 5%;
  border-radius: 60px;
  color: #ff6262;
  font-family: "Noto Sans KR";
  font-weight: 700;
  margin-bottom: 15%;
`;
export const Container = styled.div`
  position: relative;

  display: inline;

  &:hover > .tooltip,
  &:active > .tooltip {
    display: block;
  }

  .tooltip {
    white-space: pre-line;
    display: none;
    position: absolute;
    bottom: -50%;
    left: 0;
    background-color: #fff8f8;
    border: #ff7474 solid 1px;
    border-radius: 5px;
    color: #453e3e;
    font-size: 0.9rem;
    font-weight: 500;
    height: auto;

    padding: 10% 10%;
    margin-left: 40%;

    width: max-content;
    z-index: 100;
    transform: translate(-44%, 110%);
  }

  // 말풍선 테두리와 꼬리를 위한 before, after
  .tooltip::after {
    border-color: #fff8f8 transparent;
    border-style: solid;
    border-width: 0 6px 8px 6.5px;
    content: "";
    display: block;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    top: -7px;
    width: 0;
    z-index: 1;
  }

  .tooltip::before {
    border-color: #ff7474 transparent;
    border-style: solid;
    border-width: 0 6px 8px 6.5px;
    content: "";
    display: block;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    top: -8px;
    width: 0;
    z-index: 0;
  }
`;
