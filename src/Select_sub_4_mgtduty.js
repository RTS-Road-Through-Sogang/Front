import { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import PageTitle from "./PageTitleSub";
import SelectContainer from "./SelectSubContainer";
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
} from "./Select_sub_styledcomponent";
import axios from "axios";

export const BASE_URL = process.env.REACT_APP_BASE_URL;
const accessToken = localStorage.getItem("accessToken");

const SelectSubMgtDuty = () => {
  const maxItem = 5;
  let availableItem = 4;
  const c = 175 - (55 / maxItem) * (maxItem - availableItem);
  const c2 = 54 - (146 / maxItem) * (maxItem - availableItem);
  const bg = `rgb(255, ${c}, ${c2})`;

  const { state } = useLocation();

  const [selectedData, setSelectedData] = useState([]);
  console.log(selectedData);

  const navigate = useNavigate();

  const goSave = () => {
    sessionStorage.setItem("ex_complete_select", com);
    sessionStorage.setItem("ex_major_select", maj);
    sessionStorage.setItem("ex_sub_select", sub_select);
    const dataWithAdditionalInfo = [...selectedData, ...select0];
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
    navigate("/selectsubmgtdutychoice", {
      state: { selectedData: dataWithAdditionalInfo },
    });
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
        const res = await axios.get(`${BASE_URL}/roadmaps/mgt_duty_lecture/1`, {
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
    175 +
      (55 / maxSelect[0]) *
        (maxSelect[0] -
          select1.reduce((total, currentRow) => total + currentRow[1], 0)),
    175 +
      (55 / maxSelect[1]) *
        (maxSelect[1] -
          select2.reduce((total, currentRow) => total + currentRow[1], 0)),
    175 +
      (55 / maxSelect[2]) *
        (maxSelect[2] -
          select3.reduce((total, currentRow) => total + currentRow[1], 0)),
    175 +
      (55 / maxSelect[3]) *
        (maxSelect[3] -
          select4.reduce((total, currentRow) => total + currentRow[1], 0)),
  ];

  const c_select2 = [
    54 +
      (146 / maxSelect[0]) *
        (maxSelect[0] -
          select1.reduce((total, currentRow) => total + currentRow[1], 0)),
    54 +
      (146 / maxSelect[1]) *
        (maxSelect[1] -
          select2.reduce((total, currentRow) => total + currentRow[1], 0)),
    54 +
      (146 / maxSelect[2]) *
        (maxSelect[2] -
          select3.reduce((total, currentRow) => total + currentRow[1], 0)),
    54 +
      (146 / maxSelect[3]) *
        (maxSelect[3] -
          select4.reduce((total, currentRow) => total + currentRow[1], 0)),
  ];

  const sumOfFirstElements = select.reduce((acc, currentArray) => {
    currentArray.forEach((item) => {
      acc += item[1];
    });
    return acc;
  }, 0);
  let sum = sumOfFirstElements;
  let com = complete_select + sum;
  let maj = major_select;
  let sub = sub_select + sum;
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
            bold: "부전공 필수 교과를",
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
                    <Mini width={(sub * 100) / sub_point} bgColor={bg} />
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
                          bgColor={`rgb(255, ${c_select[index]}, ${c_select2[index]})`}
                          ex_width={
                            (ex_select[index].reduce(
                              (total, currentRow) => total + currentRow[1],
                              0
                            ) *
                              100) /
                            maxSelect[index]
                          }
                          ex_bg={`rgb(255, ${
                            175 +
                            (55 / maxSelect[index]) *
                              (maxSelect[index] -
                                ex_select[index].reduce(
                                  (total, currentRow) => total + currentRow[1],
                                  0
                                ))
                          }, ${
                            54 +
                            (146 / maxSelect[index]) *
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
export default SelectSubMgtDuty;
