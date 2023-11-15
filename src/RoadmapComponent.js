import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faPen,
  faTrash,
  faGear,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
const Semester = ({ semester, courses, deg, z }) => {
  return (
    <CourseBox
      style={{
        transform: `rotateY(${deg}deg) translateZ(${z}px)`,
      }}
    >
      <CourseTopBox>
        {/* {semester} */}
        <SemesterText>{semester}</SemesterText>
      </CourseTopBox>

      <CourseBottomBox>
        {courses.map((course, idx) => {
          const { id, common_name, cse_name, mgt_name, eco_name } = course;

          return (
            <SemesterText>
              <div key={id}>
                {common_name || cse_name || mgt_name || eco_name}
              </div>
            </SemesterText>
          );
        })}
      </CourseBottomBox>
    </CourseBox>
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

  return (
    <Scene>
      <CoursesContainer
        ref={ref}
        style={{
          transform: `rotateY(-${currentDeg}deg)`,
          transition: "0.45s",
        }}
      >
        {detail.map((detailData, idx) => {
          const semester = Object.keys(detailData)[0];

          return (
            <Semester
              key={`${semester}${idx}`}
              deg={idx * theta}
              semester={semester}
              courses={detailData[semester]}
              z={z}
            />
          );
        })}
      </CoursesContainer>

      <MoveButton className="left" onClick={() => handleClickChevron(true)}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </MoveButton>
      <MoveButton
        className="right"
        onClick={handleClickChevron.bind(this, false)}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </MoveButton>
    </Scene>
  );
};

const handleIdx = ({ index }) => {
  sessionStorage.setItem("roadmap_idx", index + 1);
  console.log(sessionStorage);
};

const RoadmapComponent = ({ data }) => {
  const [roadmaps, setRoadmaps] = useState(data);
  const addRoadmap = () => {
    const newRoadmap = {
      student: "New Student",
      title: "New Title",
      track: "New Track",
      roadmap_detail: [],
    };
    setRoadmaps([...roadmaps, newRoadmap]);
  };
  const deleteRoadmap = (idxDelete) => {
    setRoadmaps((roadmaps) =>
      roadmaps.filter((_, index) => index !== idxDelete)
    );
  };
  return (
    <Container>
      {roadmaps.map((roadmap, index) => {
        const { student, title, track, roadmap_detail } = roadmap;
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
                  <Tooltip>
                    로드맵 수정 및 앞으로 이수할 과목들을 <br />
                    추가할 수 있어요
                  </Tooltip>
                </Button>

                <Button className="setting" style={{ color: "white" }}>
                  <FontAwesomeIcon
                    icon={faGear}
                    // style={{ marginLeft: "35%" }}
                  />
                  <Tooltip>이미 이수한 과목들을 수정할수 있어요</Tooltip>
                </Button>

                <Button
                  className="delete"
                  style={{ color: "white" }}
                  onClick={() => {
                    deleteRoadmap(index);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    // style={{ marginLeft: "35%" }}
                  />
                  <Tooltip>로드맵을 삭제할 수 있어요</Tooltip>
                </Button>
                <Button
                  className="plus"
                  style={{ color: "white" }}
                  onClick={addRoadmap}
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    // style={{ marginLeft: "35%" }}
                  />
                  <Tooltip>로드맵을 추가로 만들 수 있어요</Tooltip>
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
  width: 100%;
  height: 100vh;
  padding: 5%;
  background-color: whitesmoke;
`;

const RoadmapContainer = styled.div`
  width: 90%;
  //background-color: orange;
  position: relative;
`;

const SemesterBox = styled.div`
  //   width: 60vw;
  //   height: 10vh;
  width: 70%;
  padding: 1rem 1.5rem;
  margin-left: 12.5%;
  border-radius: 41px 0px;
  border: 5px solid #fff;
  background: #ffaec6;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  //   margin: 10px;
  flex-direction: column;
  position: relative;
`;

const ButtonWrapper = styled.div`
  // align-items: center;
  // border-radius: 34px 0px;
  // background-color: #ff6262;
  // cursor: pointer;

  display: grid;
  grid-template-columns: 40% 50%;
  grid-column-gap: 1em;
  grid-row-gap: 0.5em;
  // flex-directoin: column;
  // flex-wrap: wrap;
  // justify-content: space-around;
  margin-left: 30%;
  width: 100%;
  padding: 1em;
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
  font-size: 1.2rem;
  padding: 2rem;

  visibility: hidden;
`;
const Button = styled.div`
  width: 6.5%;
  height: 3em;

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
    margin-bottom: 0.8rem;
  }
  &:hover ${Tooltip} {
    visibility: visible;
    opacity: 1;
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
  justify-content: center;
  // align-items: center;
  perspective: 3000px;
  transform-style: preserve-3d;
  // width: 100%;
  width: 60%;
  height: 30vh;
  padding: 5vh 0;
  // background-color: tomato;
  margin: 0 auto;
  position: relative;
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

  display: flex;
  flex-direction: column;
  width: 100%;
  height: 20vh;
  padding: 0 0.5rem;
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

  width: 95%;
  // padding: 0.5rem 1rem;
  background-color: #ff8c8c;
  text-align: center;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
  border-radius: 20px 20px 0px 0px;
  color: #fff;
  font-size: 2rem;
  line-height: 3rem;
`;

const CourseBottomBox = styled.div`
  //   width: 12vw; /* 예시: 186px를 vw로 변환 */
  //   height: auto;
  //   flex-shrink: 0;
  width: 95%;
  height: calc(105%);
  border-radius: 0px 0px 20px 20px;
  text-align: center;
  background: #fff;
  padding-top: 5px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
`;

const SemesterText = styled.span`
  //   width: 5vw;
  //   height: 5vh;
  //   flex-shrink: 0;
  font-family: "BM JUA_TTF";
  padding: 1em auto;
  line-height: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 650;
`;

const MoveButton = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 100%;
  background-color: black;
  position: absolute;
  top: calc(15vh);
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  &.left {
    left: -60px;
  }
  &.right {
    right: -60px;
  }
`;
export default RoadmapComponent;
