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

const SelectContainer2 = ({ id, major, setSelect, select }) => {
  const [isclicked, setisclicked] = useState(false);

  const onClick = () => {
    setisclicked(!isclicked);
    if (isclicked) {
      const filtered = select.filter((item) => item != major);
      setSelect(filtered);
    } else {
      setSelect([...select, major]);
    }
  };
  localStorage.setItem("submajorTrack", select);

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

  const maxSelect = [4, 1, 1, 3, 2];

  const [select, setSelect] = useState("");
  const [select1, setSelect1] = useState([]);
  const SelectContainer = (name) => {
    setSelect(name);

    localStorage.setItem("majorTrack", name);
  };
  const SelectContainer3 = (name) => {
    setSelect1(name);

    localStorage.setItem("submajorTrack", name);
  };

  const navigate = useNavigate();
  const goNext = () => {
    navigate("/selectsearch");
  };

  //axios
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
    if (majorTitle == "경영") {
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
                      {dataArray.major_tracks[0].MGT_tracks.map((item) => (
                        <SelectBox
                          onClick={() => SelectContainer(item.title)}
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
                        <SelectBox
                          onClick={() => SelectContainer3(item.major)}
                          isclicked={select1 === item.major}
                        >
                          {item.major}
                        </SelectBox>
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
    } else if (majorTitle == "컴퓨터공학과") {
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
                      {dataArray.major_tracks[0].CSE_tracks.map((item) => (
                        <SelectBox
                          onClick={() => SelectContainer(item.title)}
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
                          onClick={() => SelectContainer(item.title)}
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
  background-color: white;
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
