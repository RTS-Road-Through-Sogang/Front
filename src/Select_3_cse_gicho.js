import { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";

export const BASE_URL = process.env.REACT_APP_BASE_URL;
const accessToken = localStorage.getItem("accessToken");
const SelectContainer = ({
  id,
  title,
  point,
  code,
  season_open,
  setSelect,
  select,
  ex_select,
  semester_one,
  semester_two,
  setSelectEX,
  selectedData,
  select0,
  setSelect0,
  setSelectedData,
}) => {
  const [isClicked, setisClicked] = useState(false);

  useEffect(() => {
    selectedData.forEach((item) => {
      if (item[0] == code) {
        setisClicked(!isClicked);
        setSelect([...select, [code, point]]);
      }
    });
  }, []);

  const onClick = () => {
    setSelectEX(select);

    setisClicked(!isClicked);
    if (isClicked) {
      const filtered = select.filter(
        (item) => item[0] != code || item[1] != point
      );

      const filtere = select0.filter((item) => item[0] != code);
      const filtere1 = selectedData.filter((item) => item[0] != code);

      setSelect(filtered);
      setSelect0(filtere);
      setSelectedData(filtere1);
    } else {
      setSelect([...select, [code, point]]);
      setSelect0([...select0, [code, point]]);
    }
  };
  let season = "";
  if (season_open === true) {
    season = "O";
  } else {
    season = "X";
  }
  return (
    <>
      <SelectBox onClick={onClick} isClicked={isClicked}>
        {title}
        <br />
        <br />
        - 수강 오픈 비율
        <br />- 과목 코드: {code}
        <br />- 학점: {point}학점 <br />- 계절: {season}
        <InsideBar>
          <Semester1>1학기</Semester1>
          <Semester2>2학기</Semester2>
        </InsideBar>
        <ProgressBar2>
          <Progress2
            width={100 * (semester_one / (semester_one + semester_two))}
            bgColor={"#ffe7f3"}
          />
        </ProgressBar2>
      </SelectBox>
    </>
  );
};
const SelectCseGicho = () => {
  const maxItem = 5;
  let availableItem = 4;
  const c = 194 - (100 / maxItem) * (maxItem - availableItem);
  const bg = `rgb(255, ${c}, ${c})`;
  const { state } = useLocation();

  const [selectedData, setSelectedData] = useState([]);
  console.log(selectedData);

  const navigate = useNavigate();
  const goNext = ({ com, maj, sub_select }) => {
    console.log(localStorage.getItem("majorTitle"));

    const dataWithAdditionalInfo = [...selectedData, ...select0];

  
   
      navigate("/selectcseduty", {
        state: { selectedData: dataWithAdditionalInfo },
      });
    
    sessionStorage.setItem("ex_complete_select", com);
    sessionStorage.setItem("ex_major_select", maj);
    sessionStorage.setItem("ex_sub_select", sub_select);
  };

  const [dataArray, setDataArray] = useState([]);
  const [pointArray, setpointArray] = useState([]);
  //전체 point 계산
  let complete_select1 = sessionStorage.getItem("ex_complete_select");
  let major_select1 = sessionStorage.getItem("ex_major_select");
  let sub_select1 = sessionStorage.getItem("ex_sub_select");

  let complete_select = parseInt(complete_select1);
  let major_select = parseInt(major_select1);
  let sub_select = parseInt(sub_select1);

  useEffect(() => {
    const handleData = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/roadmaps/cse_gicho_lecture/1`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setDataArray(res.data);
      } catch (err) {
        console.log("getPost error: ", err);
      }
    };

    handleData();
    //  handlePoint(); //안됨.........
    setSelectedData(state.selectedData);
  }, []);
  const complete_point = sessionStorage.getItem("complete_point");
  const major_point = sessionStorage.getItem("major_point");
  let sub_point = null;
  if (sessionStorage.getItem("sub_point")) {
    sub_point = sessionStorage.getItem("sub_point");
  }

  const maxSelect = dataArray.map((item) => item.category_point);

  const [select0, setSelect0] = useState([]); //전체 저장

  const [select1, setSelect1] = useState([]);
  const [select2, setSelect2] = useState([]);
  const [select3, setSelect3] = useState([]);
  const [select4, setSelect4] = useState([]);
  const [select5, setSelect5] = useState([]);

  const [ex_select1, setSelectEX1] = useState([]);
  const [ex_select2, setSelectEX2] = useState([]);
  const [ex_select3, setSelectEX3] = useState([]);
  const [ex_select4, setSelectEX4] = useState([]);
  const [ex_select5, setSelectEX5] = useState([]);

  const select = [select1, select2, select3, select4, select5];
  const setSelect = [
    setSelect1,
    setSelect2,
    setSelect3,
    setSelect4,
    setSelectEX5,
  ];
  const ex_select = [
    ex_select1,
    ex_select2,
    ex_select3,
    ex_select4,
    ex_select5,
  ];
  const setSelectEX = [
    setSelectEX1,
    setSelectEX2,
    setSelectEX3,
    setSelectEX4,
    setSelectEX5,
  ];

  const c_select = [
    94 +
      (100 / maxSelect[0]) *
        (maxSelect[0] -
          select1.reduce((total, currentRow) => total + currentRow[1], 0)),
    94 +
      (100 / maxSelect[1]) *
        (maxSelect[1] -
          select2.reduce((total, currentRow) => total + currentRow[1], 0)),
    94 +
      (100 / maxSelect[2]) *
        (maxSelect[2] -
          select3.reduce((total, currentRow) => total + currentRow[1], 0)),
    94 +
      (100 / maxSelect[3]) *
        (maxSelect[3] -
          select4.reduce((total, currentRow) => total + currentRow[1], 0)),
  ];

  const sumOfFirstElements = select.reduce((acc, currentArray) => {
    currentArray.forEach((item) => {
      acc += item[1];
    });
    return acc;
  }, 0);
  let sum = sumOfFirstElements;
  let com = complete_select + sum;
  let maj = major_select;
  console.log(com, maj);

  sessionStorage.setItem("complete_select", com);
  sessionStorage.setItem("major_select", maj);
  sessionStorage.setItem("sub_select", sub_select);

  return (
    <>
      <ProgressBar>
        <Progress width={100 - (availableItem * 100) / maxItem} bgColor={bg} />
      </ProgressBar>
      <BigTitles>
        <FontAwesomeIcon icon={faComment} style={{ color: "#FF6262" }} /> 나의
        수강할 공통 필수 교과를 선택하세요
      </BigTitles>
      <BigBox>
        <LeftBox>
          {dataArray &&
            dataArray.map(
              (item, index) =>
                item.category_detail !== undefined && (
                  <Title>
                    <Icon>
                      <FontAwesomeIcon
                        icon={faCheck}
                        style={{ color: "#FF6262", fontSize: "1.7rem" }}
                      />
                    </Icon>
                    <TitleText>
                      {item.category_detail}
                      <SmallBox>
                        <XSmaillBox>
                          {item.lectures &&
                            item.lectures.map((lecture) => (
                              <SelectContainer
                                {...lecture}
                                setSelect={setSelect[index]}
                                select={select[index]}
                                ex_select={ex_select[index]}
                                setSelectEX={setSelectEX[index]}
                                selectedData={selectedData}
                                setSelect0={setSelect0}
                                select0={select0}
                                setSelectedData={setSelectedData}
                              />
                            ))}
                        </XSmaillBox>
                      </SmallBox>
                    </TitleText>
                  </Title>
                )
            )}
        </LeftBox>
        <RightBox>
          <TotalBar>
            내 학점 채우기 현황
            <br />
            <FirstBar>
              <Bar>
                <BarText>전체</BarText>

                <MiniBar>
                  <Mini width={(com * 100) / complete_point} bgColor={bg} />
                </MiniBar>
              </Bar>

              <Bar>
                <BarText>{localStorage.getItem("majorTitle")}</BarText>
                <MiniBar>
                  <Mini width={(maj * 100) / major_point} bgColor={bg} />
                </MiniBar>
              </Bar>

              {sub_point !== null && (
                <Bar>
                  <BarText>{localStorage.getItem("submajorTrack")}</BarText>

                  <MiniBar>
                    <Mini width={(sub_select * 100) / sub_point} bgColor={bg} />
                  </MiniBar>
                </Bar>
              )}
            </FirstBar>
          </TotalBar>
          <SelectBar>
            <SecondBar>
              {dataArray.map(
                (item, index) =>
                  item.category_detail !== undefined && (
                    <Bar>
                      <BarText>{item.category_detail}</BarText>
                      <MiniBar>
                        <Mini
                          width={
                            (select[index].reduce(
                              (total, currentRow) => total + currentRow[1],
                              0
                            ) *
                              100) /
                            maxSelect[index]
                          }
                          bgColor={`rgb(255, ${c_select[index]}, ${c_select[index]})`}
                          ex_width={
                            (ex_select[index].reduce(
                              (total, currentRow) => total + currentRow[1],
                              0
                            ) *
                              100) /
                            maxSelect[index]
                          }
                          ex_bg={`rgb(255, ${
                            94 +
                            (100 / maxSelect[index]) *
                              (maxSelect[index] -
                                ex_select[index].reduce(
                                  (total, currentRow) => total + currentRow[1],
                                  0
                                ))
                          }, ${
                            94 +
                            (100 / maxSelect[index]) *
                              (maxSelect[index] -
                                ex_select[index].reduce(
                                  (total, currentRow) => total + currentRow[1],
                                  0
                                ))
                          })`}
                        />
                      </MiniBar>
                      <PointDisplay>
                        (
                        {select[index].reduce(
                          (total, currentRow) => total + currentRow[1],
                          0
                        )}
                        /{maxSelect[index]})
                      </PointDisplay>
                    </Bar>
                  )
              )}
            </SecondBar>
          </SelectBar>
          <Save>임시저장</Save>
          <Next onClick={() => goNext({ com, maj, sub_select })}>
            다음으로
          </Next>{" "}
        </RightBox>
      </BigBox>
    </>
  );
};

const ProgressBar = styled.div`
  width: 60%;
  height: 20px;
  background-color: #f5f5f5;
  border-radius: 20px;

  overflow: hidden;
  margin: 2% auto;
`;

const Progress = styled.div`
  width: ${(props) => props.width}%;
  height: 30px;
  padding: 0;
  text-align: center;
  background-color: ${(props) => props.bgColor};
  color: #111;
`;

const BigTitles = styled.div`
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 5%;
  margin-top: 5%;
`;

const BigBox = styled.div`
  width: 60%;
  margin: 0 auto;
  cursor: pointer;

  display: flex;
`;

const LeftBox = styled.div`
  width: 70%;
`;

const RightBox = styled.div`
  width: 30%;
`;

const ProgressBar2 = styled.div`
  width: 80%;
  height: 20px;
  background-color: #ffabd5;
  border-radius: 10px;

  overflow: hidden;

  margin: 2% auto;
`;

const Progress2 = styled.div`
  width: ${(props) => props.width}%;
  height: 30px;
  padding: 0;
  text-align: center;
  background-color: ${(props) => props.bgColor};

  color: #111;
`;

const InsideBar = styled.div`
  width: auto;
  font-size: 0.7rem;

  margin-top: 2%;
  line-height: 25px;
  color: #453e3e;
  padding: 0 15%;
`;

const Semester1 = styled.div`
  float: left;
`;

const Semester2 = styled.div`
  float: right;
`;

const Title = styled.div`
  display: flex;
  margin-bottom: 1%;
`;

const Icon = styled.div`
  margin-right: 2%;
`;

const TitleText = styled.div`
  font-size: 1.3rem;
  background-color: white;
  margin-bottom: 2%;
  width: 100%;
`;

const SmallBox = styled.div`
  width: auto%;
  margin-top: 3%;
  positon: relative;
`;
const XSmaillBox = styled.div``;
const SelectBox = styled.button`
  font-size: 0.9rem;
  margin-right: 4%;

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

const HoverBox = styled.div`
  display: none;
  position: absolute;
  border: 0.2rem solid #ababab;
  margin-top: 1%;
  color: #ff6262;
  font-weight: 700;

  border-radius: 20px;
  padding: 0.5% 1%;
  margin-left: -1%;
  background-color: #ababab;
  ${SelectBox}:hover & {
    display: block;
  }
`;

const TotalBar = styled.div`
  text-align: center;
  margin: 3% auto;
  font-size: 1.1rem;
`;

const FirstBar = styled.div`
  background-color: #fff2f2;
  border-radius: 20px;
  padding: 5% 1%;
  margin-top: 4%;
`;

const SecondBar = styled.div`
  background-color: #fff2f2;
  border-radius: 20px;
  padding: 5% 1%;
  margin-top: 4%;
`;

const SelectBar = styled.div`
  text-align: center;
  margin: 3% auto;
  font-size: 1.2rem;
`;

const Bar = styled.div`
  display: flex;
  margin: 3% 3% 3% 3%;
`;

const BarText = styled.div`
  width: 40%;
  margin: 3% auto;
  font-size: 0.9rem;
`;

const PointDisplay = styled.div`
  font-size: 0.9rem;
  margin-left: 3%;
  margin-top: 2%;
`;

const animation = (w, e, bg, ex_bg) => keyframes` 


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

const MiniBar = styled.div`
  width: 50%;
  height: 20px;
  background-color: white;
  border-radius: 20px;

  overflow: hidden;
  margin: 3% auto;
`;
const Mini = styled.div`
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

const Save = styled.div`
  text-align: center;

  margin-top: 5%;
  padding: 4% 0;
  border-radius: 60px;
  background-color: #ff6262;
  color: white;
  font-weight: 700;
`;

const Next = styled.div`
  text-align: center;

  background-color: #fff2f2;
  padding: 4% 0;
  margin-top: 5%;
  border-radius: 60px;
  color: #ff6262;
  font-weight: 700;
  margin-bottom: 15%;
`;

const Container = styled.div`
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

export default SelectCseGicho;
