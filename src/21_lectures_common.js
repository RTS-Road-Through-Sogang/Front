import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import axios from "axios";

export const BASE_URL = process.env.REACT_APP_BASE_URL;
const accessToken = localStorage.getItem("accessToken");

const LecturesCommon = () => {
  const [data_commonduty, setData] = useState([]);
  const [data_commonchoice, setData2] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await axios.get(
          `${BASE_URL}/roadmaps/commondutylecturelists/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setData(res1.data);

        const res2 = await axios.get(
          `${BASE_URL}/roadmaps/commonchoicelecturelists/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setData2(res2.data);
      } catch (e) {
        console.log("error", e);
      }
    };

    fetchData();
  }, []);

  // const location = useLocation();
  // const arr = location.state.arrData;

  const arr = JSON.parse(sessionStorage.getItem("selected"));
  console.log(arr);

  // 함수를 이용하여 데이터를 처리하는 부분
  function processCommon(dataObject) {
    const processedCommon = [];
    for (const category of dataObject) {
      // Check if category.lectures is an array before trying to iterate
      if (Array.isArray(category.lectures)) {
        for (const lecture of category.lectures) {
          const matchingArrElement = arr.find(
            (arrElement) => arrElement[0] === lecture.code
          );

          if (matchingArrElement) {
            processedCommon.push({
              category_detail: category.category_detail,
              lecture: {
                lecture_type: "commonlecture",
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

    return processedCommon;
  }

  // 데이터 처리 함수를 이용하여 데이터 합치기
  const combinedDataCommon = [
    ...processCommon(data_commonduty),
    ...processCommon(data_commonchoice),
  ];

  const uniqueCombinedDataCommon = combinedDataCommon.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.lecture.code === value.lecture.code)
  );

  return uniqueCombinedDataCommon;
};

export default LecturesCommon;
