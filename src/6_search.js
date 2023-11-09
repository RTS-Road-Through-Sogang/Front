import { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faCheck } from "@fortawesome/free-solid-svg-icons";
import { MultiSelect } from "react-multi-select-component";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const curri = ["서강인성"];

const major = [
  {
    id: 1,
    label: "경영경제",
    value: "성성",
  },
  {
    id: 2,
    label: "컴퓨터공학과",
    value: "알세",
  },
  {
    id: 3,
    label: "전자공학과",
    value: "3",
  },
  {
    id: 4,
    label: "화학공학과",
    value: "성성4",
  },
  {
    id: 5,
    label: "유럽문화",
    value: "성성5",
  },
  {
    id: 6,
    label: "커뮤니케이션학과",
    value: "성성6",
  },
];

const curri1 = [
  {
    id: 1,
    label: "성찰과성장",
    value: "성성",
  },
  {
    id: 2,
    label: "알바트로스세미나",
    value: "알세",
  },
  {
    id: 3,
    label: "어쩌고저쩌고",
    value: "3",
  },
  {
    id: 4,
    label: "어쩌고저쩌고",
    value: "성성4",
  },
  {
    id: 5,
    label: "어쩌고저쩌고",
    value: "성성5",
  },
  {
    id: 6,
    label: "어쩌고저쩌고",
    value: "성성6",
  },
  {
    id: 7,
    label: "어쩌고저쩌고",
    value: "성성7",
  },
  {
    id: 8,
    label: "어쩌고저쩌고",
    value: "성성8",
  },
  {
    id: 9,
    label: "어쩌고저쩌고",
    value: "성성9",
  },
  {
    id: 10,
    label: "어쩌고저쩌고",
    value: "성성10",
  },
  {
    id: 11,
    label: "어쩌고저쩌고",
    value: "11",
  },
  {
    id: 12,
    label: "어쩌고저쩌고",
    value: "성성12",
  },
];

const curri2 = [
  {
    id: 7,
    name: "자연계 글쓰기",
  },
  {
    id: 8,
    name: "인문계 글쓰기",
  },
];

const curri3 = [
  {
    id: 9,
    name: "영어글로벌의사소통1",
  },
  {
    id: 10,
    name: "영어글로벌의사소통2",
  },
];

const curri4 = [
  {
    id: 11,
    name: "영어글로벌의사소통1",
  },
  {
    id: 12,
    name: "영어글로벌의사소통2",
  },
  {
    id: 13,
    name: "000000",
  },
  {
    id: 14,
    name: "33333",
  },
];

const curri5 = [
  {
    id: 15,
    name: "컴퓨팅사고력",
  },
  {
    id: 16,
    name: "영어글로벌의사소통2",
  },
  {
    id: 17,
    name: "000000",
  },
  {
    id: 18,
    name: "33333",
  },
];

const SelectContainer = ({
  id,
  label,
  name,
  setSelect,
  select,
  setSelectEX,
}) => {
  return (
    <>
      <SelectBox>{label}</SelectBox>
    </>
  );
};

const SelectSearch = () => {
  const maxItem = 5;
  let availableItem = 4;
  const c = 194 - (100 / maxItem) * (maxItem - availableItem);
  const bg = `rgb(255, ${c}, ${c})`;

  const navigate = useNavigate();
  const goNext = () => {
    navigate("/selectcommon");
  };

  const maxSelect = [4, 1, 1, 3, 2];

  const [select, setSelect] = useState([]);
  const [select1, setSelect1] = useState([]);
  const [select2, setSelect2] = useState([]);
  const [select3, setSelect3] = useState([]);
  const [select4, setSelect4] = useState([]);
  const [ex_select, setSelectEX] = useState([]);
  const [ex_select1, setSelectEX1] = useState([]);
  const [ex_select2, setSelectEX2] = useState([]);
  const [ex_select3, setSelectEX3] = useState([]);
  const [ex_select4, setSelectEX4] = useState([]);

  const len = [
    select.length,
    select1.length,
    select2.length,
    select3.length,
    select4.length,
  ];

  const c_select = [
    94 + (100 / maxSelect[0]) * (maxSelect[0] - len[0]),
    94 + (100 / maxSelect[1]) * (maxSelect[1] - len[1]),
    94 + (100 / maxSelect[2]) * (maxSelect[2] - len[2]),
    94 + (100 / maxSelect[3]) * (maxSelect[3] - len[3]),
    94 + (100 / maxSelect[4]) * (maxSelect[4] - len[4]),
  ];

  return (
    <>
      <ProgressBar>
        <Progress width={100 - (availableItem * 100) / maxItem} bgColor={bg} />
      </ProgressBar>
      <BigTitles>
        <FontAwesomeIcon icon={faComment} style={{ color: "#FF6262" }} /> 나의
        교과과정과 부전공을 선택하세요
      </BigTitles>
      <SearchBox>
        <SelectMajor
          options={major}
          value={select1}
          onChange={setSelect1}
          labelledBy={"Select"}
          isCreatable={true}
          components={{
            IndicatorSeparator: () => null,
          }}
          placeholder={"전공을 선택하세요"}
        />
        <MultiMajor
          options={curri1}
          value={select}
          onChange={setSelect}
          labelledBy={"Select"}
          isCreatable={true}
          placeholder={"전공을 선택하세요"}
        />
      </SearchBox>
      <BigBox>
        <LeftBox>
          <Title>
            <TitleText>
              <SmallBox>
                <XSmaillBox>
                  {select.map((item) => (
                    <SelectContainer
                      {...item}
                      setSelect={setSelect}
                      select={select}
                      ex_select={ex_select}
                      setSelectEX={setSelectEX}
                    />
                  ))}
                </XSmaillBox>
              </SmallBox>
            </TitleText>
          </Title>
          <Next onClick={goNext}>다음으로</Next>
        </LeftBox>
      </BigBox>
    </>
  );
};

const ProgressBar = styled.div`
  width: 60%;
  height: 20px;
  background-color: #f5f5f5;
  border-radius: 20px;

  overflow: hidden;
  margin: 2% auto;
`;

const Progress = styled.div`
  width: ${(props) => props.width}%;
  height: 30px;
  padding: 0;
  text-align: center;
  background-color: ${(props) => props.bgColor};
  color: #111;
`;

const BigTitles = styled.div`
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 5%;
  margin-top: 5%;
`;

const BigBox = styled.div`
  width: 60%;
  margin: 0 auto;
  display: flex;
`;

const SearchBox = styled.div`
  justify-content: center;
  margin: 0 auto;
  display: flex;

  width: 60%;

  margin-bottom: 2%;
`;
const SelectMajor = styled(Select)`
  .select-placeholder-text {
    color: pink;
  }
  border-radius: 60px;
  width: 30%;
  margin-right: 10%;
`;
const MultiMajor = styled(MultiSelect)`
  width: 30%;
`;
const LeftBox = styled.div`
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  margin-bottom: 1%;
`;

const Icon = styled.div`
  margin-right: 2%;
`;

const TitleText = styled.div`
  font-size: 1.3rem;
  background-color: white;
  margin-bottom: 2%;
  width: 100%;
`;

const SmallBox = styled.div`
  width: auto%;
  margin-top: 3%;
`;
const XSmaillBox = styled.div``;
const SelectBox = styled.button`
  font-size: 0.9rem;
  margin-right: 1%;
  margin-bottom: 2%;

  padding: 0.8% 2%;

  border-radius: 60px;
  display: inline-block;

  background-color: white;
  border: 0.2rem solid #ff6262;
  color: #ff6262;
  font-weight: 700;
`;

const Next = styled.button`
  margin: 0 40%;
  width: 20%;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  border-radius: 60px;

  margin-bottom: 2%;
  background-color: #ff6262;
  padding: 0.8% 2%;
  text-align: center;
`;

export default SelectSearch;
