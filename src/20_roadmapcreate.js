import React from "react";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import "./fonts/Font.css";
import PageTitle from "./PageTitle";
import checkicon from "./images/checkicon.svg";

import LecturesCommon from "./21_lectures_common";
import LecturesMajorCse from "./21_lecturesmajor_cse";
import LecturesMajorEco from "./21_lecturesmajor_eco";
import LecturesMajorMgt from "./21_lecturesmajor_mgt";
import LecturesSubCse from "./21_lecturessub_cse";
import LecturesSubEco from "./21_lecturessub_eco";
import LecturesSubMgt from "./21_lecturessub_mgt";
import CoursesType from "./CoursesType";
import "./fonts/Font.css";
import axios from "axios";

export const BASE_URL = process.env.REACT_APP_BASE_URL;
const accessToken = localStorage.getItem("accessToken");
const usersMajor = localStorage.getItem("majorTitle");
const usersSubmajor = localStorage.getItem("submajorTrack");

const CreateRoadmapDetails = () => {
  const uniqueCombinedDataCommon = LecturesCommon();
  console.log("Combined Data Common:", uniqueCombinedDataCommon);
  let uniqueCombinedDataMajor = [];
  let uniqueCombinedDataSub = [];

  if (usersMajor === "경영") {
    uniqueCombinedDataMajor = LecturesMajorCse() || [];
    console.log("Combined Data Major Cse:", uniqueCombinedDataMajor);
  } else if (usersMajor === "경제") {
    uniqueCombinedDataMajor = LecturesMajorEco() || [];
    console.log("Combined Data Major Eco:", uniqueCombinedDataMajor);
  } else if (usersMajor === "컴퓨터공학") {
    uniqueCombinedDataMajor = LecturesMajorMgt() || [];
    console.log("Combined Data Major Mgt:", uniqueCombinedDataMajor);
  } else {
    console.log("Invalid usersMajor value");
  }

  if (usersSubmajor === "경영") {
    uniqueCombinedDataSub = LecturesSubCse() || [];
    console.log("Combined Data Sub Cse:", uniqueCombinedDataSub);
  } else if (usersSubmajor === "경제") {
    uniqueCombinedDataSub = LecturesSubEco() || [];
    console.log("Combined Data Sub Eco:", uniqueCombinedDataSub);
  } else if (usersSubmajor === "컴퓨터공학") {
    uniqueCombinedDataSub = LecturesSubMgt() || [];
    console.log("Combined Data Sub Mgt:", uniqueCombinedDataSub);
  } else {
    console.log("Invalid usersSubmajor value");
  }

  const semesters = [
    "1-1",
    "1-하계",
    "1-2",
    "1-동계",
    "2-1",
    "2-하계",
    "2-2",
    "2-동계",
    "3-1",
    "3-하계",
    "3-2",
    "3-동계",
    "4-1",
    "4-하계",
    "4-2",
    "4-동계",
  ];
  const [selectedLectures, setSelectedLectures] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedLectureCodes, setSelectedLectureCodes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSemesterClick = (semester) => {
    setSelectedSemester(semester);
    openModal(semester); // 선택된 학기를 모달을 열 때 함께 전달
  };

  const handleButtonClick = (lecture_type, id, title, code, point) => {
    if (selectedSemester) {
      const isCodeAlreadySelected = selectedLectures.some(
        (semester) =>
          semester.semester !== selectedSemester &&
          semester.lectures.some((lecture) => lecture.code === code)
      );

      if (isCodeAlreadySelected) {
        console.log("이미 선택된 강의입니다.");
        return;
      }

      const existingIndex = selectedLectures.findIndex(
        (lecture) => lecture.semester === selectedSemester
      );

      if (existingIndex !== -1) {
        const updatedLectures = [...selectedLectures];
        const semesterToUpdate = updatedLectures[existingIndex];
        const existingLectureIndex = semesterToUpdate.lectures.findIndex(
          (l) => l.code === code
        );

        if (existingLectureIndex !== -1) {
          semesterToUpdate.lectures.splice(existingLectureIndex, 1);
          if (semesterToUpdate.lectures.length === 0) {
            updatedLectures.splice(existingIndex, 1);
          }
          setSelectedLectures(updatedLectures);
        } else {
          semesterToUpdate.lectures.push({
            lecture_type,
            id,
            title,
            code,
            point,
          });
          setSelectedLectures(updatedLectures);
        }
      } else {
        const newLecture = { lecture_type, id, title, code, point };
        const lectureObj = {
          semester: selectedSemester,
          lectures: [newLecture],
        };
        setSelectedLectures([...selectedLectures, lectureObj]);
      }
    }
  };

  const renderButtons = (data, category) => {
    return data.map((item, index) => {
      const isSelectedSemester = selectedSemester === null ? true : false;
      const isAlreadySelected = selectedLectures.some(
        (lecture) =>
          lecture.semester === selectedSemester &&
          lecture.lectures.some((l) => l.code === item.lecture.code)
      );

      const isCodeAlreadySelected = selectedLectures.some(
        (lecture) =>
          lecture.semester !== selectedSemester &&
          lecture.lectures.some((l) => l.code === item.lecture.code)
      );

      let buttonStyle = "btn";
      if ((isSelectedSemester && !isAlreadySelected) || isCodeAlreadySelected) {
        buttonStyle += " unselected";
      } else if (selectedSemester && isAlreadySelected) {
        buttonStyle += " selected";
      }

      return (
        <button
          key={index}
          className={buttonStyle}
          onClick={() =>
            handleButtonClick(
              item.lecture.lecture_type,
              item.lecture.id,
              item.lecture.title,
              item.lecture.code,
              item.lecture.point
            )
          }
        >
          {item.lecture.title}
        </button>
      );
    });
  };

  const renderSemesterBlocks = () => {
    return semesters.map((semester, index) => (
      <SemesterBlock
        key={index}
        semester={semester}
        onClick={() => handleSemesterClick(semester)}
        isSelected={selectedSemester === semester}
      >
        <SemesterDiv>
          <SemesterTop>
            <span>{semester}</span>
          </SemesterTop>
          <SemesterBottom
            style={{
              backgroundImage:
                selectedSemester === semester ? `url(${checkicon})` : "none",
              backgroundRepeat: "no-repeat",
              backgroundSize: "60%",
              backgroundPosition: "center",
            }}
          >
            <SemesterCourses>
              {selectedLectures.map((selected) => {
                if (selected.semester === semester) {
                  return selected.lectures.map((lecture, index) => (
                    <li key={index}>{lecture.title}</li>
                  ));
                }
                return null;
              })}
            </SemesterCourses>
          </SemesterBottom>
        </SemesterDiv>
      </SemesterBlock>
    ));
  };

  const openModal = (semester) => {
    if (semester) {
      setSelectedSemester(semester);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setSelectedSemester(null); // 모달이 닫힐 때 학기 초기화
    setIsModalOpen(false);
  };

  const renderModal = () => {
    if (!isModalOpen) return null;
    return (
      <ModalContainer>
        <ModalContent>
          <PageTitle
            text={{
              bold: `${selectedSemester}에`,
              right: " 수강하고 싶은 과목을 선택하세요",
            }}
          />
          <EachSemesterMain>
            <Common>
              <CoursesType
                text={{
                  title: "공통",
                }}
              />
              {renderButtons(uniqueCombinedDataCommon, "Common")}
            </Common>
            <Major>
              <CoursesType
                text={{
                  title: usersMajor,
                }}
              />
              {renderButtons(uniqueCombinedDataMajor, "Major")}
            </Major>
            <SubMajor>
              <CoursesType
                text={{
                  title: usersSubmajor,
                }}
              />
              {renderButtons(uniqueCombinedDataSub, "Sub")}
            </SubMajor>
          </EachSemesterMain>
          <EachSemesterSubmit>
            <button onClick={closeModal}>선택 완료</button>
          </EachSemesterSubmit>
        </ModalContent>
        <ModalBackground onClick={closeModal} />
      </ModalContainer>
    );
  };

  console.log("선택한 과목: ", selectedLectures);

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
      console.log("Roadmap ID:", roadmapId);

      // Fetching roadmap data after creating it
      const roadmapResponse = await axios.get(`${BASE_URL}/roadmaps/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(roadmapResponse.data);
      const roadmapData = roadmapResponse.data;
      console.log("Roadmap data:", roadmapData);

      const findRoadmapDetailById = (roadmapData, targetRoadmapId) => {
        const roadmap = roadmapData.find(
          (item) => item.roadmap_id === targetRoadmapId
        );

        if (!roadmap) {
          console.log(`Roadmap with ID ${targetRoadmapId} not found.`);
          return {};
        }

        const detailArray = roadmap.roadmap_detail;
        const findRoadmapDetailId = {};

        detailArray.forEach((detail) => {
          findRoadmapDetailId[detail.semester] = detail.roadmap_detail_id;
        });

        return findRoadmapDetailId;
      };

      const targetRoadmapId = roadmapId;
      const detailsForRoadmapId = findRoadmapDetailById(
        roadmapData,
        targetRoadmapId
      );
      console.log("Details for Roadmap ID:", detailsForRoadmapId);
      const promises = selectedLectures.map(async (semesterData) => {
        const semester = semesterData.semester;
        const roadmapDetailId = detailsForRoadmapId[semester];

        const { lectures } = semesterData;

        for (const lecture of lectures) {
          const RequestData = {
            roadmap_detail_id: roadmapDetailId,
            lecture_type: lecture.lecture_type,
            lecture_id: lecture.id,
          };
          console.log("과목 정보: ", RequestData);

          try {
            await axios.post(
              `${BASE_URL}/roadmaps/roadmapdetaillecture_create/`,
              RequestData,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
          } catch (error) {
            console.error("Error response:", error.response);
            console.error("API로 데이터 전송 중 에러 발생:", error);
            // 에러 처리
          }
        }
      });
      // 비동기 작업들을 일정 간격으로 실행하기 위해 setTimeout 사용
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      for (const promise of promises) {
        await promise;
        await delay(100); // 100ms 간격으로 작업을 실행하도록 지연시간 추가
      }

      console.log("모든 API 요청이 성공적으로 완료되었습니다!");
    } catch (error) {
      console.error("Error creating roadmap:", error);
    }
  };

  return (
    <>
      <SemesterListContainer>
        <PageTitle
          text={{
            left: "학기를 클릭해 ",
            bold: "과목을 배치해",
            right: " 보세요",
          }}
        />
        <SemesterListMain>
          <SemesterBlocks>{renderSemesterBlocks()}</SemesterBlocks>
          <SemesterAdd>
            <button>추가학기</button>
          </SemesterAdd>
        </SemesterListMain>
        <SemesterListMain></SemesterListMain>
        <SemesterListSubmit>
          <button type="submit" onClick={createRoadmap}>
            완료
          </button>
        </SemesterListSubmit>
      </SemesterListContainer>

      {renderModal()}
    </>
  );
};

const SemesterListContainer = styled.div`
  width: 70%;
  margin: 2em auto;
  text-align: center;
`;
const SemesterListMain = styled.div`
  width: 100%;
  max-width: 46em;
  margin: 0 auto;
`;
const SemesterBlocks = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
const SemesterBlock = styled.div``;
const SemesterDiv = styled.div`
  width: 9em;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0.3em;
  margin: 0 0.4em 0.8em 0.4em;
  transition: all 0.15s linear;
  &:hover {
    cursor: pointer;
    transform: scale(1.07);
  }
`;
const SemesterTop = styled.div`
  width: 100%;
  height: 1.8em;
  padding: 0.2em 0 0 0;
  margin-bottom: 0.2em;
  background-color: #ff8c8c;
  border-radius: 20px 20px 0 0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
  color: #fff;
  font-family: "BMJUA";
  font-size: 1.9em;
  font-weight: normal;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SemesterBottom = styled.div`
  width: 100%;
  min-height: 8em;
  border-radius: 0 0 20px 20px;
  background-color: #fff;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
  margin: 0;
  padding: 0.6em 0;
`;
const SemesterCourses = styled.ul`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #9a9a9a;
  padding: 0;
  list-style: none;
  font-family: "Noto Sans KR";
  font-weight: 500;
  font-size: 0.85em;
  margin: 0;
  > li {
    list-style: none;
    font-family: "Noto Sans KR";
    font-weight: 500;
    font-size: 0.85em;
    padding: 0.2em 0.7em;
    margin: 0;
    line-height: 1.2em;
  }
`;
const SemesterAdd = styled.div`
  width: 100%;
  > button {
    float: right;
    background: none;
    border: none;
    text-decoration: underline;
    color: #747474;
    font-family: "BMJUA";
    font-size: 1em;
    font-weight: normal;
    margin: 0.2em;
    &:hover {
      cursor: pointer;
      color: #929292;
    }
  }
`;
const SemesterListSubmit = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2em auto;
  > button {
    width: 24em;
    height: 3em;
    border: none;
    background-color: #ff6262;
    color: #fff;
    font-family: "Noto Sans KR";
    font-weight: 700;
    font-size: 0.7em;
    border-radius: 60px;
    filter: drop-shadow(4px 4px 5px rgba(0, 0, 0, 0.1));
    &:hover {
      cursor: pointer;
      background-color: #ff7f7f;
    }
  }
`;

// 여기부터

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalContent = styled.div`
  position: relative;
  z-index: 1000;
  background-color: #fff;
  margin: 2em auto;
  padding: 1em 1em 2em 1em;
  max-height: 80%;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.2);
  width: 70%;
  max-width: 800px;
  overflow-y: scroll; /* 세로 스크롤바만 표시 */
  scrollbar-width: none; /* Firefox에만 스크롤바 제거 */
  -ms-overflow-style: none; /* IE 및 Edge에만 스크롤바 제거 */

  &::-webkit-scrollbar {
    width: 0; /* 크롬, 사파리 등 웹킷 기반 브라우저의 스크롤바 제거 */
  }
`;

const EachSemesterMain = styled.div`
  max-width: 46em;
  margin: 0 auto;
  padding: 0 3em;
  font-family: "BMJUA";
  font-weight: normal;
  > * {
    margin-bottom: 3.5em;
  }
`;
const lectureButtonStyles = `
  min-height: 3em;
  min-width: 9em;
  padding: 0 1.5em;
  margin: 2em 0.6em 0 0.6em;
  color: #ababab;
  text-align: center;
  font-family: Noto Sans KR;
  font-size: 0.7em;
  font-weight: 700;
  border: 2px solid rgba(0, 0, 0, 0);
  border-radius: 60px;
  cursor: pointer;
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.1));
`;
const Common = styled.div`
  display: flex;
  flex-wrap: wrap;
  > .btn {
    ${lectureButtonStyles}

    &.unselected {
      background-color: #fff;
      cursor: default;
    }

    &.selected {
      color: #ff6262;
      border: 2px solid #ff6262;
      background-color: #fff;
    }
  }
`;
const Major = styled.div`
  display: flex;
  flex-wrap: wrap;
  > .btn {
    ${lectureButtonStyles}

    &.unselected {
      background-color: #fff;
      cursor: default;
    }

    &.selected {
      color: #ff6262;
      border: 2px solid #ff6262;
      background-color: #fff;
    }
  }
`;
const SubMajor = styled.div`
  display: flex;
  flex-wrap: wrap;
  > .btn {
    ${lectureButtonStyles}

    &.unselected {
      background-color: #fff;
      cursor: default;
    }

    &.selected {
      color: #ff6262;
      border: 2px solid #ff6262;
      background-color: #fff;
    }
  }
`;
const EachSemesterSubmit = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2em auto;
  > button {
    width: 24em;
    height: 3em;
    border: none;
    background-color: #ff6262;
    color: #fff;
    font-family: "Noto Sans KR";
    font-weight: 700;
    font-size: 0.7em;
    border-radius: 60px;
    filter: drop-shadow(4px 4px 5px rgba(0, 0, 0, 0.1));
    &:hover {
      cursor: pointer;
      background-color: #ff7f7f;
    }
  }
`;

export default CreateRoadmapDetails;
