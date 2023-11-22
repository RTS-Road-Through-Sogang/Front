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

const SelectEcoDuty = () => {
  const maxItem = localStorage.getItem("bar");
  let availableItem = localStorage.getItem("bar") - 4;
  const bar_av = 4;
  const bar_max = 5;

  const c = 194 - (100 / bar_max) * (bar_max - bar_av);
  const bg = `rgb(255, ${c}, ${c})`;
  const { state } = useLocation();

  const [selectedData, setSelectedData] = useState([]);
  console.log(selectedData);

  const navigate = useNavigate();
  const goNext = ({ com, maj, sub_select }) => {
     sessionStorage.setItem("ex_complete_select", com);
     sessionStorage.setItem("ex_major_select", maj);
     sessionStorage.setItem("ex_sub_select", sub_select);
     const dataWithAdditionalInfo = [...selectedData, ...select0];
     const serializedArray = JSON.stringify(dataWithAdditionalInfo);
     sessionStorage.setItem("selected", serializedArray);

    navigate("/selectecodutychoice", {
      state: { selectedData: dataWithAdditionalInfo },
    });

  };
const goSave = () => {
  sessionStorage.setItem("ex_complete_select", com);
  sessionStorage.setItem("ex_major_select", maj);
  sessionStorage.setItem("ex_sub_select", sub_select);
  const dataWithAdditionalInfo = [...selectedData, ...select0];
  const serializedArray = JSON.stringify(dataWithAdditionalInfo);
  sessionStorage.setItem("selected", serializedArray);
  alert("임시저장 되었습니다.");
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
        const res = await axios.get(`${BASE_URL}/roadmaps/eco_duty_lecture/${pk}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

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

  const maxSelect = dataArray.map((item) => item.category_point);

  const [select0, setSelect0] = useState([]); //전체 저장

  const [select1, setSelect1] = useState([]);
  const [select2, setSelect2] = useState([]);
  const [select3, setSelect3] = useState([]);
  const [select4, setSelect4] = useState([]);
  const [select5, setSelect5] = useState([]);

  const [ex_select1, setSelectEX1] = useState([]);
  const [ex_select2, setSelectEX2] = useState([]);
  const [ex_select3, setSelectEX3] = useState([]);
  const [ex_select4, setSelectEX4] = useState([]);
  const [ex_select5, setSelectEX5] = useState([]);

  const select = [select1, select2, select3, select4, select5];
  const setSelect = [
    setSelect1,
    setSelect2,
    setSelect3,
    setSelect4,
    setSelectEX5,
  ];
  const ex_select = [
    ex_select1,
    ex_select2,
    ex_select3,
    ex_select4,
    ex_select5,
  ];
  const setSelectEX = [
    setSelectEX1,
    setSelectEX2,
    setSelectEX3,
    setSelectEX4,
    setSelectEX5,
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
            bold: "전공필수 교과를",
            right: " 선택하세요",
          }}
        />
      </BigTitles>
      <BigBox>
        <LeftBox>
          {dataArray &&
            dataArray.map(
              (item, index) =>
                item.category_detail !== undefined && (
                  <Title>
                    <Icon>
                      <FontAwesomeIcon
                        icon={faCheck}
                        style={{ color: "#FF6262", fontSize: "1.7rem" }}
                      />
                    </Icon>
                    <TitleText>
                      전공필수교과
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
            </FirstBar>
          </TotalBar>
          <SelectBar>
            <SecondBar>
              {dataArray.map(
                (item, index) =>
                  item.category_detail !== undefined && (
                    <Bar>
                      <BarText>전공필수교과</BarText>
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
                        /{maxSelect[index]})
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

export default SelectEcoDuty;
