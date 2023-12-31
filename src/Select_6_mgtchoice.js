import { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import PageTitle from "./PageTitle";
import SelectContainer from "./SelectContainer";
import {
  Progress,
  ProgressBar,
  BigTitles,
  BigBox,
  LeftBox,
  Title,
  Icon,
  TitleText,
  SmallBox,
  XSmaillBox,
  RightBox,
  TotalBar,
  FirstBar,
  Bar,
  BarText,
  MiniBar,
  Mini,
  SelectBar,
  SecondBar,
  PointDisplay,
  Save,
  Next,
} from "./Select_styledcomponent";

import axios from "axios";

export const BASE_URL = process.env.REACT_APP_BASE_URL;
const accessToken = localStorage.getItem("accessToken");
const pk = localStorage.getItem("trackpk");

const SelectMgtChoice = () => {
  const maxItem = localStorage.getItem("bar");
  let availableItem = localStorage.getItem("bar") - 6;
  const bar_av = 4;
  const bar_max = 5;

  const c = 194 - (100 / bar_max) * (bar_max - bar_av);
  const bg = `rgb(255, ${c}, ${c})`;

  const { state } = useLocation();

  const [selectedData, setSelectedData] = useState([]);
  console.log(selectedData);

  const navigate = useNavigate();
  const goSave = () => {
    sessionStorage.setItem("ex_complete_select", com);
    sessionStorage.setItem("ex_major_select", maj);
    sessionStorage.setItem("ex_sub_select", sub_select);
    const dataWithAdditionalInfo = [...selectedData, ...select0];
    console.log(selectedData);

    const serializedArray = JSON.stringify(dataWithAdditionalInfo);
    sessionStorage.setItem("selected", serializedArray);
    alert("임시저장 되었습니다.");
  };

  const goNext = () => {
    sessionStorage.setItem("ex_complete_select", com);
    sessionStorage.setItem("ex_major_select", maj);
    sessionStorage.setItem("ex_sub_select", sub_select);
    const dataWithAdditionalInfo = [...selectedData, ...select0];
    const serializedArray = JSON.stringify(dataWithAdditionalInfo);
    sessionStorage.setItem("selected", serializedArray);

    if (!localStorage.getItem("submajorTrack")) {
      navigate("/status", { state: { selectedData: dataWithAdditionalInfo } });
    } else {
      const submajorTrack = localStorage.getItem("submajorTrack");
      if (submajorTrack === "경제") {
        navigate("/selectsubecogicho", {
          state: { selectedData: dataWithAdditionalInfo },
        });
      } else if (submajorTrack === "경영") {
        navigate("/selectsubmgtgicho", {
          state: { selectedData: dataWithAdditionalInfo },
        });
      } else if (submajorTrack === "컴퓨터공학") {
        navigate("/selectsubcsegicho", {
          state: { selectedData: dataWithAdditionalInfo },
        });
      }
    }
  };

  const [dataArray, setDataArray] = useState([]);
  const [pointArray, setpointArray] = useState([]);
  //전체 point 계산
  let complete_select1 = sessionStorage.getItem("ex_complete_select");
  let major_select1 = sessionStorage.getItem("ex_major_select");
  let sub_select1 = sessionStorage.getItem("ex_sub_select");

  let complete_select = parseInt(complete_select1);
  let major_select = parseInt(major_select1);
  let sub_select = parseInt(sub_select1);

  useEffect(() => {
    const handleData = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/roadmaps/mgt_choice_lecture/${pk}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setDataArray(res.data);
      } catch (err) {
        console.log("getPost error: ", err);
      }
    };
    handleData();
    const storedArray = sessionStorage.getItem("selected");
    const deserializedArray = JSON.parse(storedArray);
    setSelectedData(deserializedArray);
  }, []);
  const complete_point = sessionStorage.getItem("complete_point");
  const major_point = sessionStorage.getItem("major_point");
  let sub_point = null;
  if (sessionStorage.getItem("sub_point")) {
    sub_point = sessionStorage.getItem("sub_point");
  }

  const maxSelect = Array.from({ length: 9 }, () => 100);

  const [select0, setSelect0] = useState([]); //전체 저장

  const [select1, setSelect1] = useState([]);
  const [select2, setSelect2] = useState([]);
  const [select3, setSelect3] = useState([]);
  const [select4, setSelect4] = useState([]);
  const [select6, setSelect6] = useState([]);
  const [select5, setSelect5] = useState([]);
  const [select7, setSelect7] = useState([]);
  const [select8, setSelect8] = useState([]);
  const [select9, setSelect9] = useState([]);
  const [select10, setSelect10] = useState([]);
  const [select11, setSelect11] = useState([]);
  const [select12, setSelect12] = useState([]);
  const [select13, setSelect13] = useState([]);

  const [ex_select1, setSelectEX1] = useState([]);
  const [ex_select2, setSelectEX2] = useState([]);
  const [ex_select3, setSelectEX3] = useState([]);
  const [ex_select4, setSelectEX4] = useState([]);
  const [ex_select5, setSelectEX5] = useState([]);
  const [ex_select6, setSelectEX6] = useState([]);
  const [ex_select7, setSelectEX7] = useState([]);
  const [ex_select8, setSelectEX8] = useState([]);
  const [ex_select9, setSelectEX9] = useState([]);
  const [ex_select10, setSelectEX10] = useState([]);
  const [ex_select11, setSelectEX11] = useState([]);
  const [ex_select12, setSelectEX12] = useState([]);
  const [ex_select13, setSelectEX13] = useState([]);

  const select = [
    select1,
    select2,
    select3,
    select4,
    select5,
    select6,
    select7,
    select8,
    select9,
    select10,
    select11,
    select12,
    select13,
  ];
  const setSelect = [
    setSelect1,
    setSelect2,
    setSelect3,
    setSelect4,
    setSelect5,
    setSelect6,
    setSelect7,
    setSelect8,
    setSelect9,
    setSelect10,
    setSelect11,
    setSelect12,
    setSelect13,
  ];
  const ex_select = [
    ex_select1,
    ex_select2,
    ex_select3,
    ex_select4,
    ex_select5,
    ex_select6,
    ex_select7,
    ex_select8,
    ex_select9,
    ex_select10,
    ex_select11,
    ex_select12,
    ex_select13,
  ];
  const setSelectEX = [
    setSelectEX1,
    setSelectEX2,
    setSelectEX3,
    setSelectEX4,
    setSelectEX5,
    setSelectEX6,
    setSelectEX7,
    setSelectEX8,
    setSelectEX9,
    setSelectEX10,
    setSelectEX11,
    setSelectEX12,
    setSelectEX13,
  ];

  const c_select = [
    94 +
      (100 / maxSelect[0]) *
        (maxSelect[0] -
          select1.reduce((total, currentRow) => total + currentRow[1], 0)),
    94 +
      (100 / maxSelect[1]) *
        (maxSelect[1] -
          select2.reduce((total, currentRow) => total + currentRow[1], 0)),
    94 +
      (100 / maxSelect[2]) *
        (maxSelect[2] -
          select3.reduce((total, currentRow) => total + currentRow[1], 0)),
    94 +
      (100 / maxSelect[3]) *
        (maxSelect[3] -
          select4.reduce((total, currentRow) => total + currentRow[1], 0)),
    94 +
      (100 / maxSelect[4]) *
        (maxSelect[4] -
          select5.reduce((total, currentRow) => total + currentRow[1], 0)),
    94 +
      (100 / maxSelect[5]) *
        (maxSelect[5] -
          select6.reduce((total, currentRow) => total + currentRow[1], 0)),
    94 +
      (100 / maxSelect[6]) *
        (maxSelect[6] -
          select7.reduce((total, currentRow) => total + currentRow[1], 0)),
    94 +
      (100 / maxSelect[7]) *
        (maxSelect[7] -
          select8.reduce((total, currentRow) => total + currentRow[1], 0)),
    94 +
      (100 / maxSelect[8]) *
        (maxSelect[8] -
          select9.reduce((total, currentRow) => total + currentRow[1], 0)),
    94 +
      (100 / maxSelect[9]) *
        (maxSelect[9] -
          select10.reduce((total, currentRow) => total + currentRow[1], 0)),
    94 +
      (100 / maxSelect[10]) *
        (maxSelect[10] -
          select11.reduce((total, currentRow) => total + currentRow[1], 0)),
    94 +
      (100 / maxSelect[11]) *
        (maxSelect[11] -
          select12.reduce((total, currentRow) => total + currentRow[1], 0)),
    94 +
      (100 / maxSelect[12]) *
        (maxSelect[12] -
          select13.reduce((total, currentRow) => total + currentRow[1], 0)),
  ];

  const sumOfFirstElements = select.reduce((acc, currentArray) => {
    currentArray.forEach((item) => {
      acc += item[1];
    });
    return acc;
  }, 0);
  const sumOfFirstElements2 = selectedData.reduce(
    (accumulator, item) => accumulator + item[1],
    0
  );
  const sumOfFirstElements3 = select0.reduce(
    (accumulator, item) => accumulator + item[1],
    0
  );
  let sum = sumOfFirstElements3;
  let sum2 = sumOfFirstElements2;
  let com = sum2 + sum;
  let maj = major_select + sum;

  console.log(com, maj);

  let pot1 = sumOfFirstElements;
  let pot = 0;

  const credit = dataArray.find((item) => item.hasOwnProperty("이수 학점"));
  if (credit) {
    console.log(credit["이수 학점"]); // 이수 학점 값 출력
    pot = credit["이수 학점"];
  }

  sessionStorage.setItem("complete_select", com);
  sessionStorage.setItem("major_select", maj);
  sessionStorage.setItem("sub_select", sub_select);

  return (
    <>
      <ProgressBar>
        <Progress width={100 - (availableItem * 100) / maxItem} bgColor={bg} />
      </ProgressBar>
      <BigTitles>
        <PageTitle
          text={{
            left: "나의 수강할 ",
            bold: "전공선택 교과를",
            right: " 선택하세요",
          }}
        />
      </BigTitles>
      <BigBox>
        <LeftBox>
          {dataArray &&
            dataArray.map(
              (item, index) =>
                item.major_tech_title !== undefined && (
                  <Title>
                    <Icon>
                      <FontAwesomeIcon
                        icon={faCheck}
                        style={{ color: "#FF6262", fontSize: "1.7rem" }}
                      />
                    </Icon>
                    <TitleText>
                      {item.major_tech_title !== "null"
                        ? item.major_tech_title
                        : "그 외"}
                      <SmallBox>
                        <XSmaillBox>
                          {item.lectures &&
                            item.lectures.map((lecture) => (
                              <SelectContainer
                                {...lecture}
                                setSelect={setSelect[index]}
                                select={select[index]}
                                ex_select={ex_select[index]}
                                setSelectEX={setSelectEX[index]}
                                selectedData={selectedData}
                                setSelect0={setSelect0}
                                select0={select0}
                                setSelectedData={setSelectedData}
                              />
                            ))}
                        </XSmaillBox>
                      </SmallBox>
                    </TitleText>
                  </Title>
                )
            )}
        </LeftBox>
        <RightBox>
          <TotalBar>
            내 학점 채우기 현황
            <br />
            <FirstBar>
              <Bar>
                <BarText>전체</BarText>

                <MiniBar>
                  <Mini width={(com * 100) / complete_point} bgColor={bg} />
                </MiniBar>
              </Bar>

              <Bar>
                <BarText>{localStorage.getItem("majorTitle")}</BarText>

                <MiniBar>
                  <Mini width={(maj * 100) / major_point} bgColor={bg} />
                </MiniBar>
              </Bar>

              {sub_point !== null && (
                <Bar>
                  <BarText>{localStorage.getItem("submajorTrack")}</BarText>

                  <MiniBar>
                    <Mini width={(sub_select * 100) / sub_point} bgColor={bg} />
                  </MiniBar>
                </Bar>
              )}
              <Bar>
                <BarText>필수이수</BarText>

                <MiniBar>
                  <Mini width={(pot1 * 100) / pot} bgColor={bg} />
                </MiniBar>
                <PointDisplay>
                  ({pot1}/{pot})
                </PointDisplay>
              </Bar>
            </FirstBar>
          </TotalBar>
          <SelectBar>
            <SecondBar>
              {dataArray.map(
                (item, index) =>
                  item.major_tech_title !== undefined && (
                    <Bar>
                      <BarText>
                        {item.major_tech_title !== "null"
                          ? item.major_tech_title
                          : "그 외"}
                      </BarText>
                      <MiniBar>
                        <Mini
                          width={
                            (select[index].reduce(
                              (total, currentRow) => total + currentRow[1],
                              0
                            ) *
                              100) /
                            maxSelect[index]
                          }
                          bgColor={`rgb(255, ${c_select[index]}, ${c_select[index]})`}
                          ex_width={
                            (ex_select[index].reduce(
                              (total, currentRow) => total + currentRow[1],
                              0
                            ) *
                              100) /
                            maxSelect[index]
                          }
                          ex_bg={`rgb(255, ${
                            94 +
                            (100 / maxSelect[index]) *
                              (maxSelect[index] -
                                ex_select[index].reduce(
                                  (total, currentRow) => total + currentRow[1],
                                  0
                                ))
                          }, ${
                            94 +
                            (100 / maxSelect[index]) *
                              (maxSelect[index] -
                                ex_select[index].reduce(
                                  (total, currentRow) => total + currentRow[1],
                                  0
                                ))
                          })`}
                        />
                      </MiniBar>
                      <PointDisplay>
                        (
                        {select[index].reduce(
                          (total, currentRow) => total + currentRow[1],
                          0
                        )}
                        /∞)
                      </PointDisplay>
                    </Bar>
                  )
              )}
            </SecondBar>
          </SelectBar>
          <Save onClick={goSave}>임시저장</Save>
          <Next onClick={() => goNext({ com, maj, sub_select })}>
            다음으로
          </Next>{" "}
        </RightBox>
      </BigBox>
    </>
  );
};
export default SelectMgtChoice;
