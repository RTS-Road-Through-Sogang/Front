import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import currentImage from "./images/maj_eta.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faPen,
  faTrash,
  faGear,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";
import {
  ClickableImage,
  InsideBar,
  Progress2,
  ProgressBar2,
  Semester1,
  Semester2,
} from "./Select_styledcomponent";

export const BASE_URL = process.env.REACT_APP_BASE_URL;
const accessToken = localStorage.getItem("accessToken");

const Semester = ({ semester, courses, deg, z }) => {
  // console.log("courses:", courses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const openModal = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const toggleModal = (course) => {
    if (isModalOpen && selectedCourse && selectedCourse.id === course.id) {
      setIsModalOpen(false);
      setSelectedCourse(null);
    } else {
      setSelectedCourse(course);
      setIsModalOpen(true);
    }
  };

  return (
    <CourseBox
      style={{
        transform: `rotateY(${deg}deg) translateZ(${z}px)`,
      }}
    >
      {/* {courses && courses.length > 0 ? () : null} */}
      <CourseWrapper>
        <CourseTopBox>
          {/* {semester} */}
          <SemesterText>{semester}</SemesterText>
        </CourseTopBox>

        <CourseBottomBox>
          {courses.map((course, idx) => {
            const {
              id,
              title,
              former,
              semester_one,
              semester_two,
              grade_recommend,
              point,
              eta,
              code,
            } = course;

            return (
              <SemesterText className="Modal">
                <div key={id} onClick={() => toggleModal(course)}>
                  {title}
                </div>
                {/* <Hovermessage>
                  선수과목 : {former || "X"}
                  <br />
                  권장학년: {grade_recommend || "X"}
                </Hovermessage> */}
              </SemesterText>
            );
          })}
        </CourseBottomBox>
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <p>선수과목 : {selectedCourse.former || "X"}</p>
            <p>권장학년: {selectedCourse.grade_recommend || "X"}</p>
            <RatioBar
              rate1={selectedCourse.semester_one}
              rate2={selectedCourse.semester_two}
            />
            <Eta>
              <span
                style={{
                  cursor: "pointer",
                }}
              >
                에브리타임 &#8599;
              </span>
              <ClickableImage
                src={currentImage}
                // isClicked={isClicked}
                // onClick={handleLinkClick}
                // style={{ marginTop: "4px" }}
              />
            </Eta>
          </Modal>
        )}
      </CourseWrapper>
    </CourseBox>
  );
};
const RatioBar = ({ children, message, rate1, rate2 }) => {
  console.log("Rate 1 : ", rate1); // 0
  console.log("Rate 2 : ", rate2); // 6
  console.log(100 * (rate1 / (rate1 + rate2)));
  return (
    <BarContainer>
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
    </BarContainer>
  );
};
const RoadmapDetail = ({ detail }) => {
  const ref = useRef();
  const len = detail.length;
  const theta = 360 / len;

  const [z, setZ] = useState(0);
  const [currentDeg, setCurrentDeg] = useState(0);

  const handleResize = () => {
    const _width = ref.current.offsetWidth / 2;

    const rad = (theta / 2) * (Math.PI / 180);
    const tan = Math.tan(rad);
    const _z = _width / tan;

    // console.log({ len, theta, tan, _z });

    setZ(_z);
  };

  const handleClickChevron = (isLeft) => {
    if (isLeft) {
      setCurrentDeg(currentDeg - theta);
    } else {
      setCurrentDeg(currentDeg + theta);
    }
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    if (window) {
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  // console.log(detail)
  return (
    <Scene>
      <MoveButton className="left" onClick={() => handleClickChevron(true)}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </MoveButton>
      <CoursesContainer
        ref={ref}
        style={{
          transform: `rotateY(-${currentDeg}deg)`,
          transition: "0.45s",
        }}
      >
        {detail.map((detailData, idx) => {
          // console.log("디테일 data : ", detailData);
          // const semester = Object.keys(detailData)[0];
          const semester = detailData.semester;
          // console.log("semester", semester);
          // console.log("여기야 : ", detailData.lectures);

          return (
            <Semester
              key={`${semester}${idx}`}
              deg={idx * theta}
              semester={semester}
              courses={detailData.lectures}
              z={z}
            />
          );
        })}
      </CoursesContainer>

      <MoveButton
        className="right"
        onClick={handleClickChevron.bind(this, false)}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </MoveButton>
    </Scene>
  );
};

const editDefault = () => {};

const RoadmapComponent = ({ data }) => {
  const navigate = useNavigate();
  const goEditDefault = () => {
    navigate("/roadmapdefaultcreate");
  };
  const goAfter = () => {
    navigate("/afterdefault");
  };

  const [roadmaps, setRoadmaps] = useState(data);
  console.log("roadmaps :", roadmaps);
  const saveRoadmapIdToSessionStorage = (roadmapId) => {
    sessionStorage.setItem("roadmapId", roadmapId);
  };
  const handleIdx = ({ index }) => {
    const selectedRoadmap = roadmaps[index];
    console.log("선택한 로드맵", selectedRoadmap);

    const coursesData = selectedRoadmap.roadmap_detail.flatMap((detail) =>
      detail.lectures.map(({ code, point }) => [code, point])
    );

    sessionStorage.setItem("roadmap_courses", JSON.stringify(coursesData));
    sessionStorage.setItem("roadmap_idx", index + 1);
    sessionStorage.setItem("roadmapId", selectedRoadmap.roadmap_id);

    goAfter();
  };

  const createRoadmap = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/roadmaps/roadmap_roadmapdetail_create/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create roadmap");
      }
      const responseData = await response.json();
      console.log("Roadmap created:", responseData);
      const { id: roadmapId } = responseData;
      // console.log("Roadmap ID:", roadmapId);

      saveRoadmapIdToSessionStorage(roadmapId);

      const adjustResponse = await fetch(
        `${BASE_URL}/roadmaps/default_adjust/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            new_roadmap_id: roadmapId,
          }),
        }
      );
      if (!adjustResponse.ok) {
        throw new Error("Failed to adjust default roadmap");
      }
      const adjustData = await adjustResponse.json();
      console.log("Default roadmap adjusted:", adjustData);
      window.location.reload();

      // setRoadmaps((prevRoadmaps) => [
      //   ...prevRoadmaps,

      // ]);
    } catch (error) {
      console.error("Error creating roadmap:", error);
      // 에러 처리 로직 추가
    }
  };
  const deleteRoadmap = async (idxDelete, roadmap_id) => {
    try {
      const response = await fetch(
        `${BASE_URL}/roadmaps/roadmap_update_delete/${roadmap_id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("response : ", response);
      if (!response.ok) {
        throw new Error("Failed to delete the roadmap from the server.");
      }
      setRoadmaps((roadmaps) =>
        roadmaps.filter((_, index) => index !== idxDelete)
      );
    } catch (error) {
      console.error("Error reading roadmap:", error);
    }
  };

  return (
    <Container>
      <ButtonsForDefault>
        <Button
          className="setting"
          style={{ color: "white" }}
          onClick={goEditDefault}
        >
          <FontAwesomeIcon
            icon={faGear}
            // style={{ marginLeft: "35%" }}
          />
          <Tooltip>이미 이수한 과목들을 수정할수 있어요</Tooltip>
        </Button>
        <Button
          className="plus"
          style={{ color: "white" }}
          onClick={createRoadmap}
        >
          <FontAwesomeIcon
            icon={faPlus}
            // style={{ marginLeft: "35%" }}
          />
          <Tooltip>로드맵을 추가로 만들 수 있어요</Tooltip>
        </Button>
      </ButtonsForDefault>
      {roadmaps.map((roadmap, index) => {
        const { student, title, track, roadmap_detail, roadmap_id } = roadmap;
        // console.log(roadmap_id);
        return (
          <RoadmapContainer key={`${student}${track}`}>
            {/* 공통 */}
            <SemesterBox>
              {/* <div style={{ marginBottom: "0.5em" }} /> */}

              <SemesterInfo>
                <RoadmapWrapper>
                  <SemesterNumber>#{index + 1}</SemesterNumber>
                </RoadmapWrapper>
              </SemesterInfo>
              <ButtonWrapper>
                <Button
                  className="edit"
                  style={{ color: "white" }}
                  onClick={() => {
                    handleIdx({ index });
                  }}
                >
                  <FontAwesomeIcon
                    icon={faPen}
                    // style={{ marginLeft: "35%" }}
                  />
                  {/* <Tooltip>
                    로드맵 수정 및 앞으로 이수할 과목들을 <br />
                    추가할 수 있어요
                  </Tooltip> */}
                </Button>
                <Button
                  className="delete"
                  style={{ color: "white" }}
                  onClick={() => {
                    deleteRoadmap(index, roadmap_id);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    // style={{ marginLeft: "35%" }}
                  />
                  {/* <Tooltip>로드맵을 삭제할 수 있어요</Tooltip> */}
                </Button>
              </ButtonWrapper>

              {/* <MyRoadmapText>로드맵 이름</MyRoadmapText> */}
            </SemesterBox>

            {roadmap_detail && roadmap_detail.length > 0 && (
              <RoadmapDetail detail={roadmap_detail} />
            )}
          </RoadmapContainer>
        );
      })}
    </Container>
  );
};
const Container = styled.div`
  // height: 100%;
  margin: 0;
  padding: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RoadmapContainer = styled.div`
  width: 90%;
  margin-top: 2em;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1em;
`;

const SemesterBox = styled.div`
  //   width: 60vw;
  //   height: 10vh;
  width: 70%;
  padding: 1rem 1.5rem;
  border-radius: 41px 0px;
  border: 5px solid #fff;
  background: #ffaec6;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //   margin: 10px;
  position: relative;
  background: #e0c8d8;
`;

const ButtonWrapper = styled.div`
  display: flex;
  // border-radius: 34px 0px;
  // background-color: #ff6262;
  // cursor: pointer;
  margin-left: 90%;
  flex-direction: column;
  padding: 0em;
`;

const Tooltip = styled.div`
  display: flex;
  text-align: center;
  width: 30%;

  position: absolute;
  left: 100%;
  margin-left: 50%;
  white-space: nowrap;
  z-index: 1;
  pointer-events: none;
  font-size: 1rem;
  font-family: "BMJUA";
  padding: 1rem;
  color: black;
  // visibility: hidden;
`;
const BarContainer = styled.div`
  position: relative;

  display: flex;

  // &:hover > .tooltip,
  // &:active > .tooltip {
  //   display: block;
  // }

  .tooltip {
    white-space: pre-line;
    // display: none;
    // position: absolute;
    // bottom: -30%;
    // left: 50%;
    // background-color: #fff8f8;
    // border: #ff7474 solid 1px;
    border-radius: 5px;
    color: #453e3e;
    font-size: 0.9rem;
    font-weight: 500;
    height: auto;

    // padding: 10% 10%;
    // margin-left: 40%;
    margin-bottom: 10%;

    width: max-content;
    z-index: 5;

    // transform: translate(-44%, 110%);
  }
`;

const Eta = styled.div`
  position: relative;
`;
const Button = styled.div`
  width: 2.5em;
  height: 1em;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 34px 0px;
  background-color: #ff6262;
  cursor: pointer;
  position: relative;
  &.edit {
    margin-bottom: 0.8rem;
  }
  &.setting {
    width: 3em;
    height: 3em;
    margin-bottom: 0.8rem;
  }
  &.plus {
    width: 3em;
    height: 3em;
  }

  box-shadow: 3px 3px 4px 0px rgba(0, 0, 0, 0.18);
  z-index: 3;
`;
const SemesterInfo = styled.div`
  position: absolute;
  top: 50%;
  left: 8%;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  justify-content: flex-start;
  //justify-content: space-between;
  //   margin-right: 10px; // 필요에 따라 간격 조정

  transform: translate(-50%, -50%);
  background: yellow;
`;

const RoadmapWrapper = styled.div`
  //   width: 5.89vw;
  //   height: 2.04vh;
  //   background: #ff6262;
  //   position: relative;
  //   margin-left: 30%;

  background-color: #ff6262;
  width: max-content;
  height: max-content;
  height: 1rem;
  position: relative;
  display: flex;
  align-items: center;
`;

const SemesterNumber = styled.span`
  //   color: #fff;
  //   text-align: center;
  //   font-family: "BM JUA_TTF";
  // //   font-size: 2.4em;
  //   font-weight: 600;
  // //   position: absolute;
  //   bottom: -100%;
  //   right: 30%;

  display: inline-block;
  color: #fff;
  font-size: 2rem;
  padding: 0 1rem;
  //   background-color: rgba(0, 0, 0, 0.3);
`;

const MyRoadmapText = styled.span`
  color: #fff;
  font-family: "Cafe24 Ohsquare";
  font-weight: 700;
  line-height: 106.5%;
  position: absolute;
  top: 25%;
  left: 20%;
  align-items: center;
  justify-content: center;
  background: black;
  text-align: center;
  padding: 0.5em;
  width: 60%;
  font-size: 1.5rem;
`;

const Scene = styled.div`
  display: flex;
  justify-content: space-between;
  perspective: 3000px;
  transform-style: preserve-3d;
  width: 60%;
  height: 30vh;
  padding: 5vh 0;
  // background-color: tomato;
  // position: relative;
  // position: absolute;
  // top: 0;
  // right: 0;
  // z-index: 100;
`;

const CoursesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  width: 40%;
  transform-style: preserve-3d;
  margin: 0 2em;
`;

const CourseBox = styled.div`
  //   width: 15vw;
  //   height: 30vh;
  //   flex-shrink: 0;
  //   display: flex;
  //   flex-direction: column;

  position: absolute;
  top: 0;
  left: 0;

  // padding: 0.3em;

  // width: 11em;
  width: 100%;
  padding: 0 15%;
  box-sizing: border-box; //전체 스타일링 먹이면 편함

  @media screen and (max-width: 1000px) {
    width: 80%;
    font-size: 80%;
  }
`;
const CourseWrapper = styled.div`
  width: 100%;
  padding: 2% 10%;
  align-items: center;
  box-sizing: border-box; //전체 스타일링 먹이면 편함
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
`;

const CourseTopBox = styled.div`
  //   width: 12vw;
  //   height: 7vh;
  //   flex-shrink: 0;
  //   border-radius: 20px 20px 0px 0px;
  //   background: #ff8c8c;
  //   box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;

  width: 100%;
  // padding: 0.5rem 1rem;
  background-color: #ff8c8c;
  font-family: "BM JUA_TTF";
  text-align: center;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
  border-radius: 20px 20px 0px 0px;
  color: #fff;
  font-size: 2rem;
  line-height: 3rem;
  height: 2em;
  padding: 0.2em 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.3em;
`;

const CourseBottomBox = styled.div`
  //   width: 12vw;
  //   height: auto;
  //   flex-shrink: 0;
  width: 100%;
  min-height: 10em;
  border-radius: 0px 0px 20px 20px;
  text-align: center;
  background: #fff;
  // margin: 0;
  padding: 0.6em 0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
  font-family: "Noto Sans KR";
  font-weight: 500;
  color: #9a9a9a;
  font-size: 0.9em;
  @media screen and (max-width: 1000px) {
  }
`;
const Modal = styled.div`
  display: block;
  position: absolute;
  top: -10%;
  right: 100%;
  width: 45%;
  height: 80%;
  z-index: 100;
  border-radius: 32px;
  background: white;
  border: 0.2rem solid #ababab;
  font-size: 0.9rem;
  padding: 1em;
  p {
    margin-bottom: 1em;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
const Hovermessage = styled.div`
  display: None;
  padding: 0.1em auto;
  // background: tomato;
  border: 1px solid black;
`;

const SemesterText = styled.span`
  //   width: 5vw;
  //   height: 5vh;
  //   flex-shrink: 0;
  padding: 1em auto;
  line-height: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 650;
  position: relative;
  cursor: pointer;
  &:hover ${Hovermessage} {
    display: block;
    position: absolute;
    top: -150%;
    right: 100%;
    width: 70%;
    height: 500%;
    // z-index: 999;
  }
`;

const MoveButton = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 100%;
  background-color: black;
  top: calc(15vh);
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &.left {
    left: -25%;
  }
  &.right {
    right: -25%;
  }
`;
const ButtonsForDefault = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  &:hover ${Tooltip} {
    visibility: visible;
    opacity: 1;
    font-color: black;
  }
`;
export default RoadmapComponent;
