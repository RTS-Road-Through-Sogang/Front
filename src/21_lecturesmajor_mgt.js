import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const BASE_URL = process.env.REACT_APP_BASE_URL;
const accessToken = localStorage.getItem("accessToken");

const LecturesMajorMgt = () => {
  const [data_majormgtgicho, setData] = useState([]);
  const [data_majormgtduty, setData2] = useState([]);
  const [data_majormgtdutychoice, setData3] = useState([]);
  const [data_majormgtchoice, setData4] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await axios.get(
          `${BASE_URL}/roadmaps/mgt_gicho_lecture/1`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setData(res1.data);

        const res2 = await axios.get(
          `${BASE_URL}/roadmaps/mgt_duty_lecture/1`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setData2(res2.data);

        const res3 = await axios.get(
          `${BASE_URL}/roadmaps/mgt_duty_choice_lecture/1`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setData3(res3.data);

        const res4 = await axios.get(
          `${BASE_URL}/roadmaps/mgt_choice_lecture/1`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setData4(res4.data);
      } catch (e) {
        console.log("error", e);
      }
    };

    fetchData();
  }, []);

  const location = useLocation();
  const arr = location.state.arrData;

  function processMajorMgt(dataObject) {
    const processedMajorMgt = [];

    for (const category of dataObject) {
      if (Array.isArray(category.lectures)) {
        for (const lecture of category.lectures) {
          const matchingArrElement = arr.find(
            (arrElement) => arrElement[0] === lecture.code
          );

          if (matchingArrElement) {
            processedMajorMgt.push({
              category_detail: category.category_detail,
              lecture: {
                lecture_type: "mgtlecture",
                id: lecture.id,
                title: lecture.title,
                code: lecture.code,
                point: matchingArrElement[1],
                eta: lecture.eta,
                semester_one: lecture.semester_one,
                semester_two: lecture.semester_two,
                teamplay: lecture.teamplay,
                former: lecture.former,
                grade_recommend: lecture.grade_recommend,
                season_open: lecture.season_open,
                category21: lecture.category21,
                category22: lecture.category22,
                category23: lecture.category23,
                category24: lecture.category24,
              },
            });
          }
        }
      }
    }
    return processedMajorMgt;
  }

  // 데이터 처리 함수를 이용하여 데이터 합치기
  const combinedDataMajor = [
    ...processMajorMgt(data_majormgtgicho),
    ...processMajorMgt(data_majormgtduty),
    ...processMajorMgt(data_majormgtdutychoice),
    ...processMajorMgt(data_majormgtchoice),
  ];

  const uniqueCombinedDataMajor = combinedDataMajor.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.lecture.code === value.lecture.code)
  );

  console.log("Combined Data Major Mgt:", uniqueCombinedDataMajor);
  return uniqueCombinedDataMajor;
};

export default LecturesMajorMgt;
