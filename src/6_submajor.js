import { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faCheck } from "@fortawesome/free-solid-svg-icons";

const curri = ["서강인성"];

const curri1 = [
  {
    id: 1,
    name: "성찰과성장",
  },
  {
    id: 2,
    name: "알바트로스세미나",
  },
  {
    id: 3,
    name: "어쩌고저쩌고",
  },
  {
    id: 4,
    name: "어쩌고저쩌고",
  },
  {
    id: 5,
    name: "어쩌고저쩌고",
  },
  {
    id: 6,
    name: "어쩌고저쩌고",
  },
];

const curri2 = [
  {
    id: 7,
    name: "자연계 글쓰기",
  },
  {
    id: 8,
    name: "인문계 글쓰기",
  },
];

const curri3 = [
  {
    id: 9,
    name: "영어글로벌의사소통1",
  },
  {
    id: 10,
    name: "영어글로벌의사소통2",
  },
];

const curri4 = [
  {
    id: 11,
    name: "영어글로벌의사소통1",
  },
  {
    id: 12,
    name: "영어글로벌의사소통2",
  },
  {
    id: 13,
    name: "000000",
  },
  {
    id: 14,
    name: "33333",
  },
];

const curri5 = [
  {
    id: 15,
    name: "컴퓨팅사고력",
  },
  {
    id: 16,
    name: "영어글로벌의사소통2",
  },
  {
    id: 17,
    name: "000000",
  },
  {
    id: 18,
    name: "33333",
  },
];

const SelectContainer = ({
  id,
  name,
  setSelect,
  select,
  ex_select,
  setSelectEX,
}) => {
  const [isClicked, setisClicked] = useState(false);

  const onClick = () => {
    setSelectEX(select);

    setisClicked(!isClicked);
    if (isClicked) {
      const filtered = select.filter((item) => item != id);
      setSelect(filtered);
    } else {
      setSelect([...select, id]);
    }
  };

  return (
    <>
      <SelectBox onClick={onClick} isClicked={isClicked}>
        {name}{" "}
        <HoverBox>
          교수: ㅇㅇㅇ<br></br>과제: 많음<br></br>성적: 깐깐함
        </HoverBox>
      </SelectBox>
    </>
  );
};

const SelectSub = () => {
  const maxItem = 5;
  let availableItem = 4;
  const c = 175 - (55 / maxItem) * (maxItem - availableItem);
  const c2 = 54 - (146 / maxItem) * (maxItem - availableItem);
  const bg = `rgb(255, ${c}, ${c2})`;

  const maxSelect = [4, 1, 1, 3, 2];

  const [select, setSelect] = useState([]);
  const [select1, setSelect1] = useState([]);
  const [select2, setSelect2] = useState([]);
  const [select3, setSelect3] = useState([]);
  const [select4, setSelect4] = useState([]);
  const [ex_select, setSelectEX] = useState([]);
  const [ex_select1, setSelectEX1] = useState([]);
  const [ex_select2, setSelectEX2] = useState([]);
  const [ex_select3, setSelectEX3] = useState([]);
  const [ex_select4, setSelectEX4] = useState([]);

  const len = [
    select.length,
    select1.length,
    select2.length,
    select3.length,
    select4.length,
  ];

  const c_select = [
    175 + (55 / maxSelect[0]) * (maxSelect[0] - len[0]),
    175 + (55 / maxSelect[1]) * (maxSelect[1] - len[1]),
    175 + (55 / maxSelect[2]) * (maxSelect[2] - len[2]),
    175 + (55 / maxSelect[3]) * (maxSelect[3] - len[3]),
    175 + (55 / maxSelect[4]) * (maxSelect[4] - len[4]),
  ];

  const c_select2 = [
    54 + (146 / maxSelect[0]) * (maxSelect[0] - len[0]),
    54 + (146 / maxSelect[1]) * (maxSelect[1] - len[1]),
    54 + (146 / maxSelect[2]) * (maxSelect[2] - len[2]),
    54 + (146 / maxSelect[3]) * (maxSelect[3] - len[3]),
    54 + (146 / maxSelect[4]) * (maxSelect[4] - len[4]),
  ];

  return (
    <>
      <ProgressBar>
        <Progress width={100 - (availableItem * 100) / maxItem} bgColor={bg} />
      </ProgressBar>
      <BigTitles>
        <FontAwesomeIcon icon={faComment} style={{ color: "#FFAF36" }} /> 나의
        교과과정과 부전공을 선택하세요
      </BigTitles>
      <BigBox>
        <LeftBox>
          <Title>
            <Icon>
              <FontAwesomeIcon
                icon={faCheck}
                style={{ color: "#FFAF36", fontSize: "1.7rem" }}
              />
            </Icon>
            <TitleText>
              서강인성
              <SmallBox>
                <XSmaillBox>
                  {curri1.map((item) => (
                    <SelectContainer
                      {...item}
                      setSelect={setSelect}
                      select={select}
                      ex_select={ex_select}
                      setSelectEX={setSelectEX}
                    />
                  ))}
                </XSmaillBox>
              </SmallBox>
            </TitleText>
          </Title>
          <Title>
            <Icon>
              <FontAwesomeIcon
                icon={faCheck}
                style={{ color: "#FFAF36", fontSize: "1.7rem" }}
              />
            </Icon>
            <TitleText>
              글쓰기
              <SmallBox>
                <XSmaillBox>
                  {curri2.map((item) => (
                    <SelectContainer
                      {...item}
                      setSelect={setSelect1}
                      select={select1}
                      ex_select={ex_select1}
                      setSelectEX={setSelectEX1}
                    />
                  ))}{" "}
                </XSmaillBox>
              </SmallBox>
            </TitleText>
          </Title>

          <Title>
            <Icon>
              <FontAwesomeIcon
                icon={faCheck}
                style={{ color: "#FFAF36", fontSize: "1.7rem" }}
              />
            </Icon>
            <TitleText>
              글로벌 영어
              <SmallBox>
                <XSmaillBox>
                  {curri3.map((item) => (
                    <SelectContainer
                      {...item}
                      setSelect={setSelect2}
                      select={select2}
                      ex_select={ex_select2}
                      setSelectEX={setSelectEX2}
                    />
                  ))}
                </XSmaillBox>
              </SmallBox>
            </TitleText>
          </Title>

          <Title>
            <Icon>
              <FontAwesomeIcon
                icon={faCheck}
                style={{ color: "#FFAF36", fontSize: "1.7rem" }}
              />
            </Icon>
            <TitleText>
              전공진로탐색
              <SmallBox>
                <XSmaillBox>
                  {curri4.map((item) => (
                    <SelectContainer
                      {...item}
                      setSelect={setSelect3}
                      select={select3}
                      ex_select={ex_select3}
                      setSelectEX={setSelectEX3}
                    />
                  ))}
                </XSmaillBox>
              </SmallBox>
            </TitleText>
          </Title>

          <Title>
            <Icon>
              <FontAwesomeIcon
                icon={faCheck}
                style={{ color: "#FFAF36", fontSize: "1.7rem" }}
              />
            </Icon>
            <TitleText>
              소프트웨어
              <SmallBox>
                <XSmaillBox>
                  {curri5.map((item) => (
                    <SelectContainer
                      {...item}
                      setSelect={setSelect4}
                      select={select4}
                      ex_select={ex_select4}
                      setSelectEX={setSelectEX4}
                    />
                  ))}
                </XSmaillBox>
              </SmallBox>
            </TitleText>
          </Title>
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
              <Bar>
                <BarText>서강인성</BarText>

                <MiniBar>
                  <Mini
                    width={(len[0] * 100) / maxSelect[0]}
                    bgColor={`rgb(255, ${c_select[0]}, ${c_select2[0]})`}
                    ex_width={(ex_select.length * 100) / maxSelect[0]}
                    ex_bg={`rgb(255, ${
                      175 +
                      (55 / maxSelect[0]) * (maxSelect[0] - ex_select.length)
                    }, ${
                      54 +
                      (146 / maxSelect[0]) * (maxSelect[0] - ex_select.length)
                    })`}
                  />
                </MiniBar>
              </Bar>
              <Bar>
                <BarText>글쓰기</BarText>

                <MiniBar>
                  <Mini
                    width={(len[1] * 100) / maxSelect[1]}
                    bgColor={`rgb(255, ${c_select[1]}, ${c_select2[1]})`}
                    ex_width={(ex_select1.length * 100) / maxSelect[1]}
                    ex_bg={`rgb(255, ${
                      175 +
                      (55 / maxSelect[1]) * (maxSelect[1] - ex_select1.length)
                    }, ${
                      54 +
                      (146 / maxSelect[1]) * (maxSelect[1] - ex_select1.length)
                    })`}
                  />
                </MiniBar>
              </Bar>
              <Bar>
                <BarText>글로벌영어</BarText>

                <MiniBar>
                  <Mini
                    width={(len[2] * 100) / maxSelect[2]}
                    bgColor={`rgb(255, ${c_select[2]}, ${c_select2[2]})`}
                    ex_width={(ex_select2.length * 100) / maxSelect[2]}
                    ex_bg={`rgb(255, ${
                      175 +
                      (55 / maxSelect[2]) * (maxSelect[2] - ex_select2.length)
                    }, ${
                      54 +
                      (146 / maxSelect[2]) * (maxSelect[2] - ex_select2.length)
                    })`}
                  />
                </MiniBar>
              </Bar>
              <Bar>
                <BarText>전공진로탐색</BarText>

                <MiniBar>
                  <Mini
                    width={(len[3] * 100) / maxSelect[3]}
                    bgColor={`rgb(255, ${c_select[3]}, ${c_select2[3]})`}
                    ex_width={(ex_select3.length * 100) / maxSelect[3]}
                    ex_bg={`rgb(255, ${
                      176 +
                      (55 / maxSelect[3]) * (maxSelect[3] - ex_select3.length)
                    }, ${
                      54 +
                      (146 / maxSelect[3]) * (maxSelect[3] - ex_select3.length)
                    })`}
                  />
                </MiniBar>
              </Bar>
              <Bar>
                <BarText>소프트웨어</BarText>

                <MiniBar>
                  <Mini
                    width={(len[4] * 100) / maxSelect[4]}
                    bgColor={`rgb(255, ${c_select[4]}, ${c_select2[4]})`}
                    ex_width={(ex_select4.length * 100) / maxSelect[4]}
                    ex_bg={`rgb(255, ${
                      176 +
                      (55 / maxSelect[4]) * (maxSelect[4] - ex_select4.length)
                    }, ${
                      54 +
                      (146 / maxSelect[4]) * (maxSelect[4] - ex_select4.length)
                    })`}
                  />
                </MiniBar>
              </Bar>
            </SecondBar>
          </SelectBar>
          <Save>임시저장</Save>
          <Next>다음으로</Next>
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
  display: flex;
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
`;
const XSmaillBox = styled.div``;
const SelectBox = styled.button`
  font-size: 0.9rem;
  margin-right: 1%;
  margin-bottom: 2%;

  padding: 1% 2%;

  border-radius: 60px;
  display: inline-block;

  background-color: ${({ isClicked }) => (!isClicked ? "#EFEFEF" : "white")};
  border: ${({ isClicked }) =>
    !isClicked ? "0.2rem solid #EFEFEF" : "0.2rem solid #FFAF36"};
  color: ${({ isClicked }) => (!isClicked ? "#B3B3B3" : "#FFAF36")};
  font-weight: ${({ isClicked }) => (!isClicked ? 500 : 700)};
`;

const HoverBox = styled.div`
  opacity: 0;
  position: absolute;
  border: 0.2rem solid #ffaf36;
  margin-top: 1%;
  color: #ffaf36;
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

const TotalBar = styled.div`
  text-align: center;
  margin: 3% auto;
  font-size: 1.1rem;
`;

const FirstBar = styled.div`
  background-color: #ffebd4;
  border-radius: 20px;
  padding: 5% 1%;
  margin-top: 4%;
`;

const SecondBar = styled.div`
  background-color: #ffebd4;
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
  width: 30%;
  margin: 3% auto;
  font-size: 0.9rem;
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
  width: 60%;
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
  background-color: #ffaf36;
  color: white;
  font-weight: 700;
`;

const Next = styled.div`
  text-align: center;

  background-color: #ffebd4;
  padding: 4% 0;
  margin-top: 5%;
  border-radius: 60px;
  color: #ffaf36;
  font-weight: 700;
`;

export default SelectSub;
