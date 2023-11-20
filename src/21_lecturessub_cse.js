import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const BASE_URL = process.env.REACT_APP_BASE_URL;
const accessToken = localStorage.getItem("accessToken");

const LecturesSubCse = () => {
  const [data_subcsegicho, setData] = useState([]);
  const [data_subcseduty, setData2] = useState([]);
  const [data_subcsedutychoice, setData3] = useState([]);
  const [data_subcsechoice, setData4] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await axios.get(
          `${BASE_URL}/roadmaps/cse_gicho_lecture/1`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setData(res1.data);

        const res2 = await axios.get(
          `${BASE_URL}/roadmaps/cse_duty_lecture/1`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setData2(res2.data);

        const res3 = await axios.get(
          `${BASE_URL}/roadmaps/cse_duty_choice_lecture/1`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setData3(res3.data);

        const res4 = await axios.get(
          `${BASE_URL}/roadmaps/cse_choice_lecture/1`,
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

  // const location = useLocation();
  // const arr = location.state.arrData;

  const arr = JSON.parse(sessionStorage.getItem("selected"));

  function processSubCse(dataObject) {
    const processedSubCse = [];

    for (const category of dataObject) {
      if (Array.isArray(category.lectures)) {
        for (const lecture of category.lectures) {
          const matchingArrElement = arr.find(
            (arrElement) => arrElement[0] === lecture.code
          );

          if (matchingArrElement) {
            processedSubCse.push({
              category_detail: category.category_detail,
              lecture: {
                lecture_type: "cselecture",
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
    return processedSubCse;
  }

  // 데이터 처리 함수를 이용하여 데이터 합치기
  const combinedDataSub = [
    ...processSubCse(data_subcsegicho),
    ...processSubCse(data_subcseduty),
    ...processSubCse(data_subcsedutychoice),
    ...processSubCse(data_subcsechoice),
  ];
  const uniqueCombinedDataSub = combinedDataSub.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.lecture.code === value.lecture.code)
  );

  return uniqueCombinedDataSub;
};

export default LecturesSubCse;
