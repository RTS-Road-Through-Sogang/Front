import React from "react";
import styled from "styled-components";

const RoadmapComponent = ({ data }) => {
  const semesters = ["1-1", "1-2", "2-1", "2-2", "3-1", "3-2", "4-1", "4-2"];

  return (
    <div>
      {data.map((entry, entryIndex) => (
        <div key={entryIndex}>
          <SemesterContainer>
            {semesters.map((semester, idx) => {
              const semesterDetail = entry.roadmap_detail[idx];

              // 해당 학기의 데이터가 없거나 비어 있을 때는 렌더링x
              if (!semesterDetail || !semesterDetail[semester]) {
                return null;
              }

              return (
                <div key={idx}>
                  <SemesterBox>
                    <SemesterInfo>
                      <SemesterNumber>#{idx + 1}</SemesterNumber>
                      <MyRoadmapText>MY ROADMAP</MyRoadmapText>
                    </SemesterInfo>
                  </SemesterBox>
                  <CoursesContainer>
                    <CourseBox>
                      <CourseTopBox>
                        <SemesterText>{semester}</SemesterText>
                      </CourseTopBox>
                      <CourseBottomBox>
                        {semesterDetail[semester].length === 0 ? (
                          <p>비어있는 리스트</p>
                        ) : (
                          semesterDetail[semester].map((course) => (
                            <div key={course.id}>
                              {course.common_name ||
                                course.cse_name ||
                                course.mgt_name ||
                                course.eco_name}
                            </div>
                          ))
                        )}
                      </CourseBottomBox>
                    </CourseBox>
                  </CoursesContainer>
                </div>
              );
            })}
          </SemesterContainer>
        </div>
      ))}
    </div>
  );
};

const SemesterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CoursesContainer = styled.div`
  display: flex;
  flex-direction: row; // 과목들을 가로로 배열
  justify-content: space-between; // 과목들 사이의 간격 조정
  align-items: flex-start; // 필요한 경우 과목들의 정렬을 조정
`;
const SemesterBox = styled.div`
  width: 60vw;
  height: 10vh;
  border-radius: 41px 0px;
  border: 5px solid #fff;
  background: #ffaec6;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center; // 중앙 정렬을 위한 설정
  justify-content: space-between;
  margin: 10px;
  flex-shrink: 0;
  flex-direction: column;
`;

const SemesterInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-right: 10px; // 필요에 따라 간격 조정
`;
const SemesterNumber = styled.span`
  color: #fff;
  text-align: center;
  font-family: "BM JUA_TTF";
  font-size: 50px;
  font-weight: 400;
  line-height: 106.5%;
`;

const MyRoadmapText = styled.span`
  width: 113px;
  height: 22px;
  background: #ff6262;
  color: #fff;
  text-align: center;
  font-family: "Cafe24 Ohsquare";
  font-size: 15px;
  font-weight: 700;
  line-height: 106.5%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CourseBox = styled.div`
  width: 15vw; /* 예시: 200px를 vw로 변환 */
  height: 30vh; /* 예시: 254px를 vh로 변환 */
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
`;

const CourseTopBox = styled.div`
  width: 12vw; /* 예시: 186px를 vw로 변환 */
  height: 7vh; /* 예시: 60.96px를 vh로 변환 */
  flex-shrink: 0;
  border-radius: 20px 20px 0px 0px;
  background: #ff8c8c;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CourseBottomBox = styled.div`
  width: 12vw; /* 예시: 186px를 vw로 변환 */
  height: auto;
  flex-shrink: 0;
  border-radius: 0px 0px 20px 20px;
  background: #fff;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
`;

const SemesterText = styled.span`
  width: 5vw; /* 예시: 52px를 vw로 변환 */
  height: 5vh; /* 예시: 34.713px를 vh로 변환 */
  flex-shrink: 0;
  color: #fff;
  text-align: center;
  font-family: "BM JUA_TTF";
  font-size: 40px;
  line-height: normal;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default RoadmapComponent;
