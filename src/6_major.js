import { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Feature from "./Feature";
import { URL } from "./App";
import { useNavigate } from "react-router-dom";
import RoadmapComponent from "./RoadmapComponent";
import PageTitle from "./PageTitle";

export const BASE_URL = process.env.REACT_APP_BASE_URL;
const accessToken = localStorage.getItem("accessToken");
console.log(accessToken);

//전체 point 계산
let com = 0;
let maj = 0;
let sub_select = 0;
sessionStorage.setItem("complete_select", com);
sessionStorage.setItem("major_select", maj);
sessionStorage.setItem("sub_select", sub_select);
sessionStorage.setItem("ex_complete_select", com);
sessionStorage.setItem("ex_major_select", maj);
sessionStorage.setItem("ex_sub_select", sub_select);

//부전공 선택 시 전체 수강해야할 학점 배열
const point1 = [
  {
    points: {
      complete_point: 126,
      major_point: 39,
      gicho_point: 6,
      duty_point: 18,
      choice_point: 21,
    },
  },
  {
    subpoints: {
      complete_point: 126,
      major_point: 39,
      gicho_point: 9,
      duty_point: 15,
      duty_choice_point: 9,
      choice_point: 15,
    },
  },
];
//부전공 선택 안할 시 
const point2 = [
  {
    points: {
      complete_point: 126,
      major_point: 39,
      gicho_point: 6,
      duty_point: 18,
      choice_point: 21,
    },
  },
];
//pk 값 설정
const mgt_arr = [
  [1, 21, "다전공 1전공"],
  [2, 22, "다전공 1전공"],
  [3, 23, "다전공 1전공"],
  [4, 21, "다전공 타전공"],
  [5, 22, "다전공 타전공"],
  [6, 23, "다전공 타전공"],
  [7, 21, "단일전공"],
  [8, 22, "단일전공"],
  [9, 23, "단일전공"],
];

const eco_arr = [
  [1, 21, "다전공 1전공"],
  [2, 22, "다전공 1전공"],
  [3, 23, "다전공 1전공"],
  [4, 21, "다전공 타전공"],
  [5, 22, "다전공 타전공"],
  [6, 23, "다전공 타전공"],
  [7, 21, "단일전공"],
  [8, 22, "단일전공"],
  [9, 23, "단일전공"],
  [10, 21, "Honors Program"],
  [11, 22, "Honors Program"],
  [12, 23, "Honors Program"],
];
const cse_arr = [
  [1, 23, "단일전공"],
  [2, 23, "융합과정"],
  [3, 23, "다전공 1전공"],
  [4, 23, "다전공 타전공"],
  [5, 23, "교직과정"],
  [6, 22, "단일전공"],
  [7, 22, "융합과정"],
  [8, 22, "다전공 1전공"],
  [9, 22, "다전공 타전공"],
  [10, 22, "교직과정"],
  [11, 21, "단일전공"],
  [12, 21, "융합과정"],
  [13, 21, "다전공 1전공"],
  [14, 21, "다전공 타전공"],
  [15, 21, "교직과정"],
];
//각 알약 선택 관리
const SelectContainer2 = ({ id, major, setSelect, select }) => {
  const [isclicked, setisclicked] = useState(false);

//입학 연도 설정
  const major_year = localStorage.getItem("year");
  //클릭시 선택, 취소
  const onClick = () => {
    setisclicked(!isclicked);
    if (isclicked) {
      const filtered = select.filter((item) => item != major);
      setSelect(filtered);
    } else {
      setSelect([...select, major]);
    }
  };
//pk 값 설정
  if (major == "컴퓨터공학") {
    if (major_year == 23) {
      localStorage.setItem("subpk", 4);
    }
    if (major_year == 22) {
      localStorage.setItem("subpk", 9);
    }
    if (major_year == 21) {
      localStorage.setItem("subpk", 14);
    }
  }
  if (major == "경제") {
    if (major_year == 23) {
      localStorage.setItem("subpk", 6);
    }
    if (major_year == 22) {
      localStorage.setItem("subpk", 5);
    }
    if (major_year == 21) {
      localStorage.setItem("subpk", 4);
    }
  }
  if (major == "경영") {
    if (major_year == 23) {
      localStorage.setItem("subpk", 6);
    }
    if (major_year == 22) {
      localStorage.setItem("subpk", 5);
    }
    if (major_year == 21) {
      localStorage.setItem("subpk", 4);
    }
  }

  localStorage.setItem("submajorTrack", select);
  console.log(major);

  return (
    <>
      <SelectBox onClick={onClick} isclicked={isclicked}>
        {major}
      </SelectBox>
    </>
  );
};

const SelecMajor = () => {
  const maxItem = 5;
  let availableItem = 4;
  const c = 194 - (100 / maxItem) * (maxItem - availableItem);
  const bg = `rgb(255, ${c}, ${c})`;

//전공 트랙 선택 관리
  const [select, setSelect] = useState("");
  //부전공 선택 관리
  const [select1, setSelect1] = useState([]);

  const SelectContainer = (name, majorTitle) => {
    setSelect(name.title); //전공 트랙 title select에 저장
    console.log(name.student_year.student_year);

  //session에 기본 정보 저장
    localStorage.setItem("majorTrack", name.title); 
    localStorage.setItem("year", name.student_year.student_year);
    if (majorTitle == "경영") {
      for (const record of mgt_arr) {
        const student_year = record[1];
        const major_type = record[2];

        if (
          student_year === name.student_year.student_year &&
          major_type === name.title
        ) {
          localStorage.setItem("trackpk", record[0]);
        }
      }
    }
    if (majorTitle == "경제") {
      for (const record of eco_arr) {
        const student_year = record[1];
        const major_type = record[2];

        if (
          student_year === name.student_year.student_year &&
          major_type === name.title
        ) {
          localStorage.setItem("trackpk", record[0]);
        }
      }
    }
    if (majorTitle == "컴퓨터공학") {
      for (const record of cse_arr) {
        const student_year = record[1];
        const major_type = record[2];

        if (
          student_year === name.student_year.student_year &&
          major_type === name.title
        ) {
          localStorage.setItem("trackpk", record[0]);
        }
      }
    }
  };
  

  const navigate = useNavigate();
  const goNext = () => {
    if (localStorage.getItem("submajorTrack")) {
      //부전공 선택 시 총 페이지는 10페이지 (progress bar에서 사용)
      localStorage.setItem("bar", 10);
    } else {
      //부전공 선택 안할 시 총 페이지는 6페이지 (progress bar에서 사용)
      localStorage.setItem("bar", 6);
    }
    navigate("/selectsearch");
  };

  //axios해서 받아온 데이터 저장
  const [dataArray, setDataArray] = useState([]);
  useEffect(() => {
    const handleData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/roadmaps/usermajortracks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setDataArray(res.data);
        console.log(dataArray);
      } catch (err) {
        console.log("getPost error: ", err);
      }
    };
    handleData();
  }, []);
  console.log(dataArray);

  //major, major title이 존재할 경우 기본 학점 정보 세팅
  if (dataArray.major && dataArray.major.title) {
    const majorTitle = dataArray.major.title;
    localStorage.setItem("majorTitle", majorTitle);
    if (localStorage.getItem("submajorTrack")) {
      sessionStorage.setItem("complete_point", point1[0].points.complete_point);
      sessionStorage.setItem("major_point", point1[0].points.major_point);
      sessionStorage.setItem("sub_point", point1[1].subpoints.major_point);
    } else {
      sessionStorage.setItem("complete_point", point1[0].points.complete_point);
      sessionStorage.setItem("major_point", point1[0].points.major_point);
    }

    //처음에 navigate 이슈로 각 전공마다 case를 나눴는데 위에서 미리 처리해줘서 필요가 없어진듯..
    if (majorTitle == "경영") {
      return (
        <>
         
          <BigTitles>
            <PageTitle
              text={{
                left: "나의 교과 과정과 ",
                bold: "부전공을",
                right: " 선택하세요",
              }}
            />
          </BigTitles>
          <BigBox>
            <LeftBox>
              <Title>
                <Icon>
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: "#FF6262", fontSize: "1.7rem" }}
                  />
                </Icon>
                <TitleText>
                  루트 선택
                  <SmallBox>
                    <XSmaillBox>
                      {dataArray.major_tracks[0].MGT_tracks.map((item) => (
                        <SelectBox
                          onClick={() => SelectContainer(item, majorTitle)}
                          isclicked={select === item.title}
                        >
                          {item.title}
                        </SelectBox>
                      ))}
                    </XSmaillBox>
                  </SmallBox>
                </TitleText>
              </Title>
              <Title>
                <Icon>
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: "#FF6262", fontSize: "1.7rem" }}
                  />
                </Icon>
                <TitleText>
                  부전공 선택
                  <SmallBox>
                    <XSmaillBox>
                      {dataArray.major_tracks[1].second_major.map((item) => (
                        <SelectContainer2
                          {...item}
                          setSelect={setSelect1}
                          select={select1}
                        />
                      ))}
                    </XSmaillBox>
                  </SmallBox>
                </TitleText>
              </Title>
              <Next onClick={goNext}>다음으로</Next>
            </LeftBox>
          </BigBox>
        </>
      );
    } else if (majorTitle == "컴퓨터공학") {
      if (localStorage.getItem("submajorTrack")) {
        sessionStorage.setItem(
          "complete_point",
          point1[0].points.complete_point
        );
        sessionStorage.setItem("major_point", point1[0].points.major_point);
        sessionStorage.setItem("sub_point", point1[1].subpoints.major_point);
      } else {
        sessionStorage.setItem(
          "complete_point",
          point1[0].points.complete_point
        );
        sessionStorage.setItem("major_point", point1[0].points.major_point);
      }
      return (
        <>
        
          <BigTitles>
            <PageTitle
              text={{
                left: "나의 교과 과정과 ",
                bold: "부전공을",
                right: " 선택하세요",
              }}
            />
          </BigTitles>
          <BigBox>
            <LeftBox>
              <Title>
                <Icon>
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: "#FF6262", fontSize: "1.7rem" }}
                  />
                </Icon>
                <TitleText>
                  루트 선택
                  <SmallBox>
                    <XSmaillBox>
                      {dataArray.major_tracks[0].CSE_tracks.map((item) => (
                        <SelectBox
                          onClick={() => SelectContainer(item, majorTitle)}
                          isclicked={select === item.title}
                        >
                          {item.title}
                        </SelectBox>
                      ))}
                    </XSmaillBox>
                  </SmallBox>
                </TitleText>
              </Title>
              <Title>
                <Icon>
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: "#FF6262", fontSize: "1.7rem" }}
                  />
                </Icon>
                <TitleText>
                  부전공 선택
                  <SmallBox>
                    <XSmaillBox>
                      {dataArray.major_tracks[1].second_major.map((item) => (
                        <SelectContainer2
                          {...item}
                          setSelect={setSelect1}
                          select={select1}
                        />
                      ))}
                    </XSmaillBox>
                  </SmallBox>
                </TitleText>
              </Title>
              <Next onClick={goNext}>다음으로</Next>
            </LeftBox>
          </BigBox>
        </>
      );
    } else if (majorTitle == "경제") {
      if (localStorage.getItem("submajorTrack")) {
        sessionStorage.setItem(
          "complete_point",
          point1[0].points.complete_point
        );
        sessionStorage.setItem("major_point", point1[0].points.major_point);
        sessionStorage.setItem("sub_point", point1[1].subpoints.major_point);
      } else {
        sessionStorage.setItem(
          "complete_point",
          point1[0].points.complete_point
        );
        sessionStorage.setItem("major_point", point1[0].points.major_point);
      }

      return (
        <>
          <ProgressBar>
            <Progress
              width={100 - (availableItem * 100) / maxItem}
              bgcolor={bg}
            />
          </ProgressBar>
          <BigTitles>
            <PageTitle
              text={{
                left: "나의 교과 과정과 ",
                bold: "부전공을",
                right: " 선택하세요",
              }}
            />
          </BigTitles>
          <BigBox>
            <LeftBox>
              <Title>
                <Icon>
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: "#FF6262", fontSize: "1.7rem" }}
                  />
                </Icon>
                <TitleText>
                  루트 선택
                  <SmallBox>
                    <XSmaillBox>
                      {dataArray.major_tracks[0].ECO_tracks.map((item) => (
                        <SelectBox
                          onClick={() => SelectContainer(item, majorTitle)}
                          isclicked={select === item.title}
                        >
                          {item.title}
                        </SelectBox>
                      ))}
                    </XSmaillBox>
                  </SmallBox>
                </TitleText>
              </Title>
              <Title>
                <Icon>
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: "#FF6262", fontSize: "1.7rem" }}
                  />
                </Icon>
                <TitleText>
                  부전공 선택
                  <SmallBox>
                    <XSmaillBox>
                      {dataArray.major_tracks[1].second_major.map((item) => (
                        <SelectContainer2
                          {...item}
                          setSelect={setSelect1}
                          select={select1}
                        />
                      ))}
                    </XSmaillBox>
                  </SmallBox>
                </TitleText>
              </Title>
              <Next onClick={goNext}>다음으로</Next>
            </LeftBox>
          </BigBox>
        </>
      );
    }
  } else {
    console.error("Major title이 존재하지 않습니다.");
  }

  // console.log("Start");
  // axios
  //   .get(`${BASE_URL}/roadmaps/usermajortracks`, {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   })
  //   .then((response) => {
  //     // 요청이 성공하면 이 곳에서 응답을 처리합니다.
  //     console.log("yes");
  //     console.log(response.data);
  //   })
  //   .catch((error) => {
  //     // 요청이 실패하면 이 곳에서 에러를 처리합니다.
  //     console.log("no");
  //     console.error(error);
  //   });
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
  background-color: ${(props) => props.bgcolor};
  color: #111;
`;

const BigTitles = styled.div`
  text-align: center;
  margin-bottom: 5%;
  margin-top: 5%;
`;

const BigBox = styled.div`
  width: 60%;
  margin: 0 auto;
`;

const LeftBox = styled.div`
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  margin-bottom: 1%;
`;

const Icon = styled.div`
  margin-right: 2%;
`;

const TitleText = styled.div`

  margin-bottom: 2%;
  width: 100%;
  font-family: "BMJUA";
  font-size: 1.6em;
`;

const SmallBox = styled.div`
  width: auto%;
  margin-top: 2%;
`;
const XSmaillBox = styled.div``;
const SelectBox = styled.button`
  font-size: 0.9rem;
  font-family: "Noto Sans KR";
  font-weight: 500;
  margin-right: 1%;
  margin-bottom: 2%;

  padding: 0.8% 2%;

  border-radius: 60px;
  display: inline-block;

  background-color: ${({ isclicked }) => (!isclicked ? "#EFEFEF" : "white")};
  border: ${({ isclicked }) =>
    !isclicked ? "0.2rem solid #EFEFEF" : "0.2rem solid #FF6262"};
  color: ${({ isclicked }) => (!isclicked ? "#B3B3B3" : "#FF6262")};
  font-weight: ${({ isclicked }) => (!isclicked ? 500 : 700)};
`;

const SmallTitle = styled.div`
  font-size: 1.1rem;
  margin-top: 2%;
  margin-left: 1%;
`;

const Next = styled.button`
  margin: 0% 40%;
  width: 20%;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  border-radius: 60px;

  margin-bottom: 2%;
  background-color: #ff6262;
  padding: 0.8% 2%;
  text-align: center;
  font-family: "Noto Sans KR";
  font-weight: 700;
`;
export default SelecMajor;
