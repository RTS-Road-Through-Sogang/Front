import React, { useEffect, useState } from "react";
import styled from "styled-components";
import backimg from "./images/main_background.jpg";
import title from "./images/title.png";
import RoadmapComponent from "./RoadmapComponent";
import PageTitle from "./PageTitle";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export const BASE_URL = process.env.REACT_APP_BASE_URL;
const accessToken = localStorage.getItem("accessToken");
const DummyData = [
  {
    student: "20210723",
    title: "1안",
    track: "다전공 1전공 - 21",
    roadmap_detail: [
      {
        "1-1": [
          {
            id: 1,
            common_name: "성찰과 성장",
            roadmap_detail: 1,
            commonlecture: 1,
          },
          {
            id: 2,
            common_name: "중국언어와 문화1",
            roadmap_detail: 1,
            commonlecture: 7,
          },
          {
            id: 3,
            common_name: "초급 아랍어",
            roadmap_detail: 1,
            commonlecture: 13,
          },
          {
            id: 6,
            cse_name: "응용수학2",
            roadmap_detail: 1,
            cselecture: 6,
          },
          {
            id: 7,
            mgt_name: "조직행동이론",
            roadmap_detail: 1,
            mgtlecture: 6,
          },
          {
            id: 8,
            eco_name: "산업경제학",
            roadmap_detail: 1,
            ecolecture: 13,
          },
        ],
      },
      {
        "1-2": [
          {
            id: 9,
            common_name: "프랑스언어와 문화1",
            roadmap_detail: 2,
            commonlecture: 6,
          },
          {
            id: 12,
            mgt_name: "재무관리",
            roadmap_detail: 2,
            mgtlecture: 7,
          },
          {
            id: 6,
            cse_name: "응용수학2",
            roadmap_detail: 1,
            cselecture: 6,
          },
        ],
      },
      {
        "2-1": [
          {
            id: 13,
            cse_name: "일반물리1",
            roadmap_detail: 3,
            cselecture: 4,
          },
          {
            id: 14,
            eco_name: "경제정보분석",
            roadmap_detail: 3,
            ecolecture: 12,
          },
          {
            id: 15,
            eco_name: "미적분학 II",
            roadmap_detail: 3,
            ecolecture: 4,
          },
          {
            id: 6,
            cse_name: "응용수학2",
            roadmap_detail: 1,
            cselecture: 6,
          },
        ],
      },
      {
        "2-2": [
          {
            id: 16,
            cse_name: "응용수학1",
            roadmap_detail: 4,
            cselecture: 5,
          },
          {
            id: 17,
            cse_name: "일반물리실험1",
            roadmap_detail: 4,
            cselecture: 3,
          },
          {
            id: 18,
            eco_name: "경제수리기초",
            roadmap_detail: 4,
            ecolecture: 2,
          },
          {
            id: 6,
            cse_name: "응용수학2",
            roadmap_detail: 1,
            cselecture: 6,
          },
          {
            id: 6,
            cse_name: "응용수학2",
            roadmap_detail: 1,
            cselecture: 6,
          },
        ],
      },
      {
        "3-1": [
          {
            id: 16,
            cse_name: "응용수학1",
            roadmap_detail: 4,
            cselecture: 5,
          },
          {
            id: 17,
            cse_name: "일반물리실험1",
            roadmap_detail: 4,
            cselecture: 3,
          },
          {
            id: 18,
            eco_name: "경제수리기초",
            roadmap_detail: 4,
            ecolecture: 2,
          },
        ],
      },
      {
        "3-2": [
          {
            id: 16,
            cse_name: "응용수학1",
            roadmap_detail: 4,
            cselecture: 5,
          },
          {
            id: 17,
            cse_name: "일반물리실험1",
            roadmap_detail: 4,
            cselecture: 3,
          },
          {
            id: 18,
            eco_name: "경제수리기초",
            roadmap_detail: 4,
            ecolecture: 2,
          },
        ],
      },
      {
        "4-1": [
          {
            id: 16,
            cse_name: "응용수학1",
            roadmap_detail: 4,
            cselecture: 5,
          },
          {
            id: 17,
            cse_name: "일반물리실험1",
            roadmap_detail: 4,
            cselecture: 3,
          },
          {
            id: 18,
            eco_name: "경제수리기초",
            roadmap_detail: 4,
            ecolecture: 2,
          },
        ],
      },
      {
        "4-2": [
          {
            id: 16,
            cse_name: "응용수학1",
            roadmap_detail: 4,
            cselecture: 5,
          },
          {
            id: 17,
            cse_name: "일반물리실험1",
            roadmap_detail: 4,
            cselecture: 3,
          },
          {
            id: 18,
            eco_name: "경제수리기초",
            roadmap_detail: 4,
            ecolecture: 2,
          },
        ],
      },
    ],
  },
  {
    student: "20210723",
    title: "2안",
    track: "단일전공 - 21",
    roadmap_detail: [
      {
        "1-1": [
          {
            id: 1,
            common_name: "성찰과 성장",
            roadmap_detail: 1,
            commonlecture: 1,
          },
          {
            id: 2,
            common_name: "중국언어와 문화1",
            roadmap_detail: 1,
            commonlecture: 7,
          },
          {
            id: 3,
            common_name: "초급 아랍어",
            roadmap_detail: 1,
            commonlecture: 13,
          },
          {
            id: 6,
            cse_name: "응용수학2",
            roadmap_detail: 1,
            cselecture: 6,
          },
          {
            id: 7,
            mgt_name: "조직행동이론",
            roadmap_detail: 1,
            mgtlecture: 6,
          },
          {
            id: 8,
            eco_name: "산업경제학",
            roadmap_detail: 1,
            ecolecture: 13,
          },
        ],
      },
      {
        "1-2": [
          {
            id: 9,
            common_name: "프랑스언어와 문화1",
            roadmap_detail: 2,
            commonlecture: 6,
          },
          {
            id: 12,
            mgt_name: "재무관리",
            roadmap_detail: 2,
            mgtlecture: 7,
          },
          {
            id: 6,
            cse_name: "응용수학2",
            roadmap_detail: 1,
            cselecture: 6,
          },
        ],
      },
      {
        "2-1": [
          {
            id: 13,
            cse_name: "일반물리1",
            roadmap_detail: 3,
            cselecture: 4,
          },
          {
            id: 14,
            eco_name: "경제정보분석",
            roadmap_detail: 3,
            ecolecture: 12,
          },
          {
            id: 15,
            eco_name: "미적분학 II",
            roadmap_detail: 3,
            ecolecture: 4,
          },
          {
            id: 6,
            cse_name: "응용수학2",
            roadmap_detail: 1,
            cselecture: 6,
          },
        ],
      },
    ],
  },
];
const EmptyData = [];

const hasCoursesTaken = (data) => {
  if (!Array.isArray(data)) {
    return false;
  }
  for (let roadmap of data) {
    for (let detail of roadmap.roadmap_detail) {
      if (detail.lectures.length > 0) {
        return true;
      }
    }
  }
  return false;
};
const Roadmap = () => {
  const navigate = useNavigate();
  const handleDefaultSubject = () => {
    navigate("/majortrack");
  };
  const [defaultData, setDefaultData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/roadmaps/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setDefaultData(res.data);
      } catch (e) {
        console.log("error", e.response || e.message);
      }
    };

    fetchData();
  }, []);
  // console.log("모든 로드맵: ", defaultData);
  return (
    <>
      <TextWrapper>
        <PageTitle
          text={{
            bold: "My Roadmap",
          }}
        />
      </TextWrapper>
      {hasCoursesTaken(defaultData) ? (
        <RoadmapComponent data={defaultData} />
      ) : (
        <EmptyRoadmap>
          <BackgroundWrapper>
            <Backimg src={backimg} alt="백그라운드 이미지" />
            <TextOverlay>
              아직 수강기록이 없네요!
              <br />
              로드맵을 만들기 위해서는 이수과목 정보가 필요해요
              <br />
              이미 수강한 과목을 추가하러 가볼까요?
            </TextOverlay>
          </BackgroundWrapper>
          <StyledButton onClick={handleDefaultSubject}>
            <span>이수과목 추가하러 가기</span>
          </StyledButton>
        </EmptyRoadmap>
      )}
    </>
  );
};

const FONT_FAMILY = "Noto Sans";

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: 5%;
  // margin-top: 30px;
  // position: relative;
  margin-bottom: -90px;
`;

const TitleImage = styled.img`
  position: absolute;
  top: -10px;
  right: 43%; // 솔직히 중앙에 있는게 더 마음에 듦.
`;

const TopText = styled.div`
  text-align: center;
  font-family: ${FONT_FAMILY};
  font-size: 1.6rem;
  font-weight: 900;
`;

const EmptyRoadmap = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BackgroundWrapper = styled.div`
  position: relative;
  margin-top: 30px;
`;

const Backimg = styled.img`
  width: 100%;
  position: relative;
  z-index: -1;
`;

const TextOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #242424;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  font-family: BM JUA_TTF;
  font-weight: 600;
  font-size: 26px;
  z-index: 1;
  width: 110%;
  line-height: 1.5;
`;

const StyledButton = styled.button`
  cursor: pointer;
  width: 20.5vw;
  height: 6vh;
  border-radius: 60px;
  border: 2px solid #ff6262;
  background: #ff6262;
  margin-top: 20px;

  @media (max-width: 768px) {
    width: 50vw;
    height: 7vh;
  }

  span {
    color: #fff;
    text-align: center;
    font-family: ${FONT_FAMILY};
    font-size: 1.1rem;
    font-weight: 700;
  }
`;

export default Roadmap;
