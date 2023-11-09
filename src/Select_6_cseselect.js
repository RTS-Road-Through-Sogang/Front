import { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const curr = [
  {
    track: "단일전공",
    "이수 학점": 36,
  },
  {
    category_detail: "선택",
    category_point: 24,
    lectures: [
      {
        id: 13,
        title: "컴퓨터프로그래밍I (구: 기초공학설계)",
        code: "CSE2003",
        point: 3,
        eta: "",
        semester_one: 3,
        semester_two: 3,
        teamplay: 1,
        grade_recommend: 1,
        season_open: true,
        teach: false,
        advance: false,
        former: null,
        category21: 13,
        category22: 13,
        category23: 13,
        category24: null,
        tech: null,
      },
      {
        id: 14,
        title: "컴퓨터프로그래밍II (구: C프로그래밍)",
        code: "CSE2035",
        point: 3,
        eta: "",
        semester_one: 3,
        semester_two: 3,
        teamplay: 1,
        grade_recommend: 1,
        season_open: true,
        teach: false,
        advance: false,
        former: null,
        category21: 13,
        category22: 13,
        category23: 13,
        category24: null,
        tech: null,
      },
      {
        id: 15,
        title: "이산구조",
        code: "CSE3006",
        point: 3,
        eta: "",
        semester_one: 3,
        semester_two: 3,
        teamplay: 1,
        grade_recommend: 1,
        season_open: true,
        teach: false,
        advance: false,
        former: null,
        category21: 13,
        category22: 13,
        category23: 13,
        category24: null,
        tech: null,
      },
      {
        id: 16,
        title: "컴퓨터공학설계및실험I",
        code: "CSE3013",
        point: 3,
        eta: "",
        semester_one: 3,
        semester_two: 3,
        teamplay: 1,
        grade_recommend: 1,
        season_open: true,
        teach: false,
        advance: false,
        former: null,
        category21: 13,
        category22: 13,
        category23: 13,
        category24: null,
        tech: null,
      },
      {
        id: 17,
        title: "디지털회로개론",
        code: "CSE3015",
        point: 3,
        eta: "",
        semester_one: 3,
        semester_two: 3,
        teamplay: 1,
        grade_recommend: 1,
        season_open: true,
        teach: false,
        advance: false,
        former: null,
        category21: 13,
        category22: 13,
        category23: 13,
        category24: null,
        tech: null,
      },
      {
        id: 18,
        title: "컴퓨터공학실험II",
        code: "CSE3016",
        point: 3,
        eta: "",
        semester_one: 3,
        semester_two: 3,
        teamplay: 1,
        grade_recommend: 1,
        season_open: true,
        teach: false,
        advance: false,
        former: null,
        category21: 13,
        category22: 13,
        category23: 13,
        category24: null,
        tech: null,
      },
      {
        id: 19,
        title: "자료구조",
        code: "CSE3080",
        point: 3,
        eta: "",
        semester_one: 3,
        semester_two: 3,
        teamplay: 1,
        grade_recommend: 1,
        season_open: true,
        teach: false,
        advance: false,
        former: null,
        category21: 13,
        category22: 13,
        category23: 13,
        category24: null,
        tech: null,
      },
      {
        id: 20,
        title: "운영체제",
        code: "CSE4070",
        point: 3,
        eta: "",
        semester_one: 3,
        semester_two: 3,
        teamplay: 1,
        grade_recommend: 1,
        season_open: true,
        teach: false,
        advance: false,
        former: null,
        category21: 13,
        category22: 13,
        category23: 13,
        category24: null,
        tech: null,
      },
      {
        id: 21,
        title: "멀티코어 프로그래밍",
        code: "CSE4100",
        point: 3,
        eta: "",
        semester_one: 3,
        semester_two: 3,
        teamplay: 1,
        grade_recommend: 1,
        season_open: true,
        teach: false,
        advance: false,
        former: null,
        category21: 13,
        category22: 13,
        category23: 13,
        category24: null,
        tech: null,
      },
      {
        id: 22,
        title: "고급소프트웨어실습I",
        code: "CSE4152",
        point: 3,
        eta: "",
        semester_one: 3,
        semester_two: 3,
        teamplay: 1,
        grade_recommend: 1,
        season_open: true,
        teach: false,
        advance: false,
        former: null,
        category21: 13,
        category22: 13,
        category23: 13,
        category24: null,
        tech: null,
      },
      {
        id: 23,
        title: "캡스톤디자인II",
        code: "CSE4187",
        point: 3,
        eta: "",
        semester_one: 3,
        semester_two: 3,
        teamplay: 1,
        grade_recommend: 1,
        season_open: true,
        teach: false,
        advance: false,
        former: null,
        category21: 13,
        category22: 13,
        category23: 13,
        category24: null,
        tech: null,
      },
      {
        id: 24,
        title: "캡스톤디자인I",
        code: "CSE4186",
        point: 3,
        eta: "",
        semester_one: 3,
        semester_two: 3,
        teamplay: 1,
        grade_recommend: 1,
        season_open: true,
        teach: false,
        advance: false,
        former: null,
        category21: 13,
        category22: 13,
        category23: 13,
        category24: null,
        tech: null,
      },
      {
        id: 25,
        title: "인턴쉽I",
        code: "CSE4190",
        point: 3,
        eta: "",
        semester_one: 3,
        semester_two: 3,
        teamplay: 1,
        grade_recommend: 1,
        season_open: true,
        teach: false,
        advance: false,
        former: null,
        category21: 13,
        category22: 13,
        category23: 13,
        category24: null,
        tech: null,
      },
      {
        id: 26,
        title: "알고리즘설계와분석",
        code: "CSE3081",
        point: 3,
        eta: "",
        semester_one: 3,
        semester_two: 3,
        teamplay: 1,
        grade_recommend: 1,
        season_open: true,
        teach: false,
        advance: false,
        former: null,
        category21: 13,
        category22: 13,
        category23: 13,
        category24: null,
        tech: null,
      },
      {
        id: 27,
        title: "컴퓨터교과교육론",
        code: "CSEQ981",
        point: 3,
        eta: "",
        semester_one: 3,
        semester_two: 3,
        teamplay: 1,
        grade_recommend: 1,
        season_open: true,
        teach: false,
        advance: false,
        former: null,
        category21: 13,
        category22: 13,
        category23: 13,
        category24: null,
        tech: null,
      },
      {
        id: 28,
        title: "컴퓨터학교과교재연구및지도법",
        code: "CSEQ982",
        point: 3,
        eta: "",
        semester_one: 3,
        semester_two: 3,
        teamplay: 1,
        grade_recommend: 1,
        season_open: true,
        teach: false,
        advance: false,
        former: null,
        category21: 13,
        category22: 13,
        category23: 13,
        category24: null,
        tech: null,
      },
      {
        id: 29,
        title: "컴퓨터학교과논리및논술",
        code: "CSEQ983",
        point: 3,
        eta: "",
        semester_one: 3,
        semester_two: 3,
        teamplay: 1,
        grade_recommend: 1,
        season_open: true,
        teach: false,
        advance: false,
        former: null,
        category21: 13,
        category22: 13,
        category23: 13,
        category24: null,
        tech: null,
      },
      {
        id: 30,
        title: "컴퓨터아키텍쳐",
        code: "EEE3178",
        point: 3,
        eta: "",
        semester_one: 3,
        semester_two: 3,
        teamplay: 1,
        grade_recommend: 1,
        season_open: true,
        teach: false,
        advance: false,
        former: null,
        category21: 14,
        category22: 14,
        category23: 14,
        category24: null,
        tech: null,
      },
      {
        id: 31,
        title: "프로그래밍언어",
        code: "CSE4050",
        point: 3,
        eta: "",
        semester_one: 3,
        semester_two: 3,
        teamplay: 1,
        grade_recommend: 1,
        season_open: true,
        teach: false,
        advance: false,
        former: null,
        category21: 14,
        category22: 14,
        category23: 14,
        category24: null,
        tech: null,
      },
      {
        id: 32,
        title: "데이터베이스시스템",
        code: "CSE4110",
        point: 3,
        eta: "",
        semester_one: 3,
        semester_two: 3,
        teamplay: 1,
        grade_recommend: 1,
        season_open: true,
        teach: false,
        advance: false,
        former: null,
        category21: 14,
        category22: 14,
        category23: 14,
        category24: null,
        tech: null,
      },
      {
        id: 33,
        title: "소프트웨어공학",
        code: "CSE4115",
        point: 3,
        eta: "",
        semester_one: 3,
        semester_two: 3,
        teamplay: 1,
        grade_recommend: 1,
        season_open: true,
        teach: false,
        advance: false,
        former: null,
        category21: 14,
        category22: 14,
        category23: 14,
        category24: null,
        tech: null,
      },
      {
        id: 34,
        title: "컴퓨터네트워크",
        code: "CSE4175",
        point: 3,
        eta: "",
        semester_one: 3,
        semester_two: 3,
        teamplay: 1,
        grade_recommend: 1,
        season_open: true,
        teach: false,
        advance: false,
        former: null,
        category21: 14,
        category22: 14,
        category23: 14,
        category24: null,
        tech: null,
      },
      {
        id: 35,
        title: "기초인공지능",
        code: "CSE4185",
        point: 3,
        eta: "",
        semester_one: 3,
        semester_two: 3,
        teamplay: 1,
        grade_recommend: 1,
        season_open: true,
        teach: false,
        advance: false,
        former: null,
        category21: 14,
        category22: 14,
        category23: 14,
        category24: null,
        tech: null,
      },
      {
        id: 36,
        title: "기초머신러닝",
        code: "CSE4130",
        point: 3,
        eta: "",
        semester_one: 3,
        semester_two: 3,
        teamplay: 1,
        grade_recommend: 1,
        season_open: true,
        teach: false,
        advance: false,
        former: null,
        category21: 14,
        category22: 14,
        category23: 14,
        category24: null,
        tech: null,
      },
      {
        id: 37,
        title: "기초컴퓨터그래픽스",
        code: "CSE4170",
        point: 3,
        eta: "",
        semester_one: 3,
        semester_two: 3,
        teamplay: 1,
        grade_recommend: 1,
        season_open: true,
        teach: false,
        advance: false,
        former: null,
        category21: 14,
        category22: 14,
        category23: 14,
        category24: null,
        tech: null,
      },
      {
        id: 38,
        title: "암호학기초",
        code: "CSE4188",
        point: 3,
        eta: "",
        semester_one: 3,
        semester_two: 3,
        teamplay: 1,
        grade_recommend: 1,
        season_open: true,
        teach: false,
        advance: false,
        former: null,
        category21: 14,
        category22: 14,
        category23: 14,
        category24: null,
        tech: null,
      },
    ],
  },
];

const Tooltip = ({ children, message, rate1, rate2 }) => {
  console.log(100 * (rate1 / (rate1 + rate2)));
  return (
    <Container>
      {children}
      <div className="tooltip">
        {message}
        <br></br>
        - 수강 오픈 비율
        <br />
        <InsideBar>
          <Semester1>1학기</Semester1>
          <Semester2>2학기</Semester2>
        </InsideBar>
        <ProgressBar2>
          <Progress2
            width={100 * (rate1 / (rate1 + rate2))}
            bgColor={"#ffe7f3"}
          />
        </ProgressBar2>
      </div>
    </Container>
  );
};

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
}) => {
  const [isClicked, setisClicked] = useState(false);

  const onClick = () => {
    setSelectEX(select);

    setisClicked(!isClicked);
    if (isClicked) {
      const filtered = select.filter(
        (item) => item[0] != id || item[1] != point
      );
      console.log(select);
      setSelect(filtered);
      console.log("변화");
      console.log(select);
    } else {
      setSelect([...select, [id, point]]);
    }
  };
  let season = "";
  if (season_open === true) {
    season = "O";
  } else {
    season = "X";
  }
  const message = `- 과목 코드: ${code} 
          - 학점: ${point}학점
          - 계절: ${season}`;
  return (
    <>
      <Tooltip message={message} rate1={semester_one} rate2={semester_two}>
        <SelectBox onClick={onClick} isClicked={isClicked}>
          {title}
        </SelectBox>
      </Tooltip>
    </>
  );
};

const SelectCseChoice = () => {
  const maxItem = 5;
  let availableItem = 4;
  const c = 194 - (100 / maxItem) * (maxItem - availableItem);
  const bg = `rgb(255, ${c}, ${c})`;

  const navigate = useNavigate();
  const goNext = () => {
    navigate("/");
  };

  const maxSelect = curr.map((item) => item.category_point);

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

  const len = [select1.length, select2.length, select3.length, select4.length];

  const list = ["인간과 신앙", "인간과 사상", "인간과 사회", "인간과 과학"];

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

  return (
    <>
      <ProgressBar>
        <Progress width={100 - (availableItem * 100) / maxItem} bgColor={bg} />
      </ProgressBar>
      <BigTitles>
        <FontAwesomeIcon icon={faComment} style={{ color: "#FF6262" }} /> 나의
        수강할 전공 선택 과목을 선택하세요
      </BigTitles>
      <BigBox>
        <LeftBox>
          {curr &&
            curr.map(
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
                  <Mini
                    width={100 - (availableItem * 100) / maxItem}
                    bgColor={bg}
                  />
                </MiniBar>
              </Bar>

              <Bar>
                <BarText>컴퓨터공학</BarText>

                <MiniBar>
                  <Mini
                    width={100 - (availableItem * 100) / maxItem}
                    bgColor={bg}
                  />
                </MiniBar>
              </Bar>

              <Bar>
                <BarText>영미영문</BarText>

                <MiniBar>
                  <Mini
                    width={100 - (availableItem * 100) / maxItem}
                    bgColor={bg}
                  />
                </MiniBar>
              </Bar>

              <Bar>
                <BarText>영어강의</BarText>

                <MiniBar>
                  <Mini
                    width={100 - (availableItem * 100) / maxItem}
                    bgColor={bg}
                  />
                </MiniBar>
              </Bar>
            </FirstBar>
          </TotalBar>

          <SelectBar>
            <SecondBar>
              {curr &&
                curr.map(
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
                                    (total, currentRow) =>
                                      total + currentRow[1],
                                    0
                                  ))
                            }, ${
                              94 +
                              (100 / maxSelect[index]) *
                                (maxSelect[index] -
                                  ex_select[index].reduce(
                                    (total, currentRow) =>
                                      total + currentRow[1],
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
          <Next onClick={goNext}>다음으로</Next>
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
  display: flex;
  cursor: pointer;
`;

const LeftBox = styled.div`
  width: 70%;
`;

const RightBox = styled.div`
  width: 30%;
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
  margin-right: 1%;

  margin-bottom: 2%;

  padding: 1% 2%;

  border-radius: 60px;

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

export default SelectCseChoice;
