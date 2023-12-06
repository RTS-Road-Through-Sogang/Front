import { useEffect, useState, useRef } from "react";
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
} from "./Select_styledcomponent"; //styled component
import axios from "axios";

//전체 point 가져온 후 int 변환
let complete_select1 = sessionStorage.getItem("complete_select");
let major_select1 = sessionStorage.getItem("major_select");
let sub_select1 = sessionStorage.getItem("sub_select");

let complete_select = parseInt(complete_select1);
let major_select = parseInt(major_select1);
let sub_select = parseInt(sub_select1);

//url, access token 가져오기
export const BASE_URL = process.env.REACT_APP_BASE_URL;
const accessToken = localStorage.getItem("accessToken");


const SelectCommon = () => {
  //맨 위 progress bar
  const maxItem = localStorage.getItem("bar"); //pk에 따라 maxitem이 바뀜
  let availableItem = localStorage.getItem("bar") - 1; //현재 상태값 = max-1 (1번째 페이지라는 뜻)

  //기본 색 계산 (전체, 전공, 부전공 학점 비율 칠하는 색)
  const bar_av = 4;
  const bar_max = 5;
  const c = 194 - (100 / bar_max) * (bar_max - bar_av);
  const bg = `rgb(255, ${c}, ${c})`;

  const { state } = useLocation(); //모든 값 session에 저장하면서 안쓰게 된 값

  //전 페이지까지 선택한 모든 과목을 저장하는 배열
  const [selectedData, setSelectedData] = useState([]);

  const navigate = useNavigate();

  //임시저장
  const goSave = () => {
    //이제까지 수강한 com(전체), maj(전공), sub(부전공) 학점을 session에 저장
    sessionStorage.setItem("ex_complete_select", com);
    sessionStorage.setItem("ex_major_select", maj);
    sessionStorage.setItem("ex_sub_select", sub_select);

    //전 페이지까지 선택한 모든 과목(selectedData)과 이 페이지에서 선택한 모든 과목(select0) 합쳐 stringfy / 저장
    const dataWithAdditionalInfo = [...selectedData, ...select0];
    const serializedArray = JSON.stringify(dataWithAdditionalInfo);
    sessionStorage.setItem("selected", serializedArray);
    alert("임시저장 되었습니다.");
  };

  //다음으로 (임시저장과 동일 /  navigate 추가)
  const goNext = () => {
    sessionStorage.setItem("ex_complete_select", com);
    sessionStorage.setItem("ex_major_select", maj);
    sessionStorage.setItem("ex_sub_select", sub_select);
    const dataWithAdditionalInfo = [...selectedData, ...select0];
    const serializedArray = JSON.stringify(dataWithAdditionalInfo);
    sessionStorage.setItem("selected", serializedArray);
    navigate("/selectchoice", {
      state: { selectedData: dataWithAdditionalInfo },
    });
  };

  //url로부터 받아온 데이터 저장
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    const handleData = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/roadmaps/commondutylecturelists/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setDataArray(res.data); //url로부터 받아온 데이터 저장
      } catch (err) {
        console.log("getPost error: ", err);
      }
    };

    handleData();
    const storedArray = sessionStorage.getItem("selected"); //전 페이지까지 저장한 데이터 받아옴
    const deserializedArray = JSON.parse(storedArray); //array 형태로 파싱
    setSelectedData(deserializedArray); //selectedData에 저장 (전 페이지까지 저장한 모든 데이터)
  }, []);
  console.log(selectedData);
  const complete_point = sessionStorage.getItem("complete_point"); //이제까지 수강한 전공 학점
  const major_point = sessionStorage.getItem("major_point"); //이제까지 수강한 전공 학점
  let sub_point = null; //부전공은 null로 두고
  if (sessionStorage.getItem("sub_point")) {
    //만약 sub_point가 존재할 때만 session에서 가져온다 (부전공 선택 안 할 경우 오류나기 때문)
    sub_point = sessionStorage.getItem("sub_point");
  }

  //수강해야하는 학점 표시
  //dataArray(url에서 받아온 전체 object)에서 category_point를 maxselect 배열에 저장(명세서 참고)
  const maxSelect = dataArray.map((item) => item.category_point);

  const [select0, setSelect0] = useState([]); //이 페이지에서 선택한 모든 과목 저장

  //각 카테고리가 페이지마다 1-10개까지 있는데, 그 카테고리에서 선택한 것들을 모두 select[숫자] 배열로 관리
  //예를 들어 전공 필수에서
  //서강 인성, 글로벌언어, 글쓰기, 소프트웨어 4 개의 카테고리가 있을 경우 select1~4까지 각 배열로 관리
  //[과목코드, 학점] 으로 저장됨
  const [select1, setSelect1] = useState([]);
  const [select2, setSelect2] = useState([]);
  const [select3, setSelect3] = useState([]);
  const [select4, setSelect4] = useState([]);
  const [select5, setSelect5] = useState([]);
  const [select6, setSelect6] = useState([]);

  //bar 움직임을 위한 usestate 배열
  //각 select[숫자] 배열의 클릭 이벤트 발생 이전 상태를 저장한다
  //각 카테고리 bar를 예쁘게 움직이려면 a, b, c라는 과목을 선택했다가 추가로 d를 선택해 a, b, c, d, 4개로 늘게 되었다 라는 상황에서
  //원래 a, b, c라는 과목이 선택되었었음 이라는 정보가 필요하다
  //그래야 3과목 > 4과목 라는 수치로 bar가 예쁘게 움직일 수 있음
  const [ex_select1, setSelectEX1] = useState([]);
  const [ex_select2, setSelectEX2] = useState([]);
  const [ex_select3, setSelectEX3] = useState([]);
  const [ex_select4, setSelectEX4] = useState([]);
  const [ex_select5, setSelectEX5] = useState([]);
  const [ex_select6, setSelectEX6] = useState([]);

  //select[숫자]를 저장하는 배열
  const select = [select1, select2, select3, select4, select5, select6];
  const setSelect = [
    setSelect1,
    setSelect2,
    setSelect3,
    setSelect4,
    setSelect5,
    setSelect6,
  ];

  //ex_select[숫자]를 저장하는 배열
  const ex_select = [
    ex_select1,
    ex_select2,
    ex_select3,
    ex_select4,
    ex_select5,
    ex_select6,
  ];
  const setSelectEX = [
    setSelectEX1,
    setSelectEX2,
    setSelectEX3,
    setSelectEX4,
    setSelectEX5,
    setSelectEX6,
  ];

  //left progress bar의 색을 저장하는 배열
  //select[숫자]의 총 학점 수에 따라 달라진다
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
      (100 / maxSelect[3]) *
        (maxSelect[3] -
          select5.reduce((total, currentRow) => total + currentRow[1], 0)),
  ];

  //select (select[숫자]를 모두 저장한 배열) 속 모든 학점을 계산하는 함수
  const sumOfFirstElements = select.reduce((acc, currentArray) => {
    currentArray.forEach((item) => {
      acc += item[1];
    });
    return acc;
  }, 0);
  let sum = sumOfFirstElements;
  let com = complete_select + sum; //원래 전체학점 + 여기서 추가된 학점
  let maj = major_select; //여기는 전공선택 페이지가 아님
  console.log(com);

  //session에 저장
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
            bold: "필수 교과를",
            right: " 선택하세요",
          }}
        />
      </BigTitles>
      <BigBox>
        <LeftBox>
          {dataArray.map((item, index) => (
            <Title>
              <Icon>
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ color: "#FF6262", fontSize: "1.7rem" }}
                />
              </Icon>
              <TitleText>
                {item.category_detail}
                <SmallBox>
                  <XSmaillBox>
                    {item.lectures && //백에서 넘겨주는 코드를 보면 item.lecures가 비어있는 경우가 있음 꼭 걸러내야 함
                      item.lectures.map((lecture) => ( 
                        //selectcontainer.js 참구
                        <SelectContainer 
                          {...lecture}
                          setSelect={setSelect[index]} 
                          select={select[index]}
                          ex_select={ex_select[index]}
                          setSelectEX={setSelectEX[index]}
                          setSelect0={setSelect0}
                          select0={select0}
                          selectedData={selectedData}
                          setSelectedData={setSelectedData}
                        />
                      ))}
                  </XSmaillBox>
                </SmallBox>
              </TitleText>
            </Title>
          ))}
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
              {dataArray.map((item, index) => ( //각 카테고리별 선택된 학점 표시
                <Bar>
                  <BarText>{item.category_detail}</BarText>
                  <MiniBar>
                    <Mini
                      width={
                        (select[index].reduce(
                          (total, currentRow) => TotalBar + currentRow[1],
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
                            )) //ex_select에 선택된 학점을 바탕으로 서서히 색깔 변화를 주기 위한 항목
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
                      0  //(선택학점/총학점) 표시하는 항목
                    )} 
                    /{maxSelect[index]}) 
                  </PointDisplay>
                </Bar>
              ))}
            </SecondBar>
          </SelectBar>
          <Save onClick={goSave}>임시저장</Save>
          <Next onClick={goNext}>다음으로</Next>
        </RightBox>
      </BigBox>
    </>
  );
};
export default SelectCommon;
