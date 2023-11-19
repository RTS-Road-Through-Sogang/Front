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
  display: flex;
  cursor: pointer;
`;

export const LeftBox = styled.div`
  width: 70%;
`;

export const RightBox = styled.div`
  width: 30%;
`;

export const Title = styled.div`
  display: flex;
  margin-bottom: 1%;
`;

export const Icon = styled.div`
  margin-right: 2%;
`;

export const TitleText = styled.div`
  font-size: 1.3rem;
  background-color: white;
  margin-bottom: 2%;
  width: 100%;
`;

export const SmallBox = styled.div`
  width: auto%;
  margin-top: 3%;
`;
export const XSmaillBox = styled.div``;
export const SelectBox = styled.button`
 font-size: 0.9rem;
  font-family: "Noto Sans KR";
  font-weight: 500;
  margin-right: 4%;

  margin-bottom: 2%;

  padding: 3% 3%;

  

  background-color: ${({ isClicked }) => (!isClicked ? "#EFEFEF" : "white")};
  border: ${({ isClicked }) =>
    !isClicked ? "0.2rem solid #EFEFEF" : "0.2rem solid #ffaf36"};
  color: ${({ isClicked }) => (!isClicked ? "#B3B3B3" : "#ffaf36")};
  font-weight: ${({ isClicked }) => (!isClicked ? 500 : 700)};
  box-shadow: ${({ isClicked }) =>
    !isClicked
      ? "3px 3px 3px rgba(0, 0, 0, 0.08);"
      : "3px 3px 3px rgba(240, 223, 197);"};
  :
`;

export const HoverBox = styled.div`
  opacity: 0;
  position: absolute;
  border: 0.2rem solid #ffebd4;
  margin-top: 1%;
  color: #ffebd4;
  font-weight: 700;

  border-radius: 20px;
  padding: 0.5% 1%;
  margin-left: -1%;
  background-color: white;
  ${SelectBox}:hover & {
    opacity: 100%;

    transition: 0.5s ease-out;
  }
`;

export const TotalBar = styled.div`
  text-align: center;
  margin: 3% auto;
  font-size: 1.1rem;
`;

export const FirstBar = styled.div`
  background-color: #ffebd4;
  border-radius: 20px;
  padding: 5% 1%;
  margin-top: 4%;
`;

export const SecondBar = styled.div`
  background-color: #ffebd4;
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
  width: 20%;
  margin: 3% auto;
  font-size: 0.9rem;
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
  width: 60%;
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
  background-color: #ffaf36;
  color: white;
  font-weight: 700;
`;

export const Next = styled.div`
  text-align: center;

  background-color: #ffebd4;
  padding: 4% 0;
  margin-top: 5%;
  border-radius: 60px;
  color: #ffaf36;
  font-family: "Noto Sans KR";
  font-weight: 700;
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
export const PointDisplay = styled.div`
  font-size: 0.9rem;
  margin-left: 3%;
  margin-top: 2%;
`;


export const InsideBar = styled.div`
  width: auto;
  font-size: 0.7rem;

  margin-top: 2%;
  line-height: 25px;
  color: #453e3e;
  padding: 0 15%;
`;

export const Semester1 = styled.div`
  float: left;
`;

export const Semester2 = styled.div`
  float: right;
`;


export const ProgressBar2 = styled.div`
  width: 80%;
  height: 20px;
  background-color: #ffdead;
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

