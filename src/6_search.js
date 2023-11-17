import { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faCheck } from "@fortawesome/free-solid-svg-icons";
import { MultiSelect } from "react-multi-select-component";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PageTitle from "./PageTitle";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export const BASE_URL = process.env.REACT_APP_BASE_URL;
const accessToken = localStorage.getItem("accessToken");

const major = [
  {
    id: 1,
    label: "경제학과",
    value: "경제",
  },
  {
    id: 2,
    label: "컴퓨터공학과",
    value: "컴퓨터공학",
  },
  {
    id: 3,
    label: "경영학과",
    value: "경영",
  },
  {
    id: 4,
    label: "공통",
    value: "공통",
  },
  // {
  //   id: 5,
  //   label: "유럽문화",
  //   value: "성성5",
  // },
  // {
  //   id: 6,
  //   label: "커뮤니케이션학과",
  //   value: "성성6",
  // },
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
    const dataWithAdditionalInfo = [
      ["COR1012", 3],
      ["HFS2001", 3],
      ["ECO3008", 3],
      ["ECO2004", 3],
      ["ECO2003", 3],
    ];
    navigate("/selectcommon", {
      state: { selectedData: dataWithAdditionalInfo },
    });
  };

  //axios
  const [dataArray, setDataArray] = useState([]);

  const maxSelect = [4, 1, 1, 3, 2];
  // console.log(dataArray);

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
  const [keyword, setKeyword] = useState("");

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
  // useEffect(() => {
  //   handleData();
  // }, []);
  // console.log(select1);
  // console.log(keyword);

  const searchedData = dataArray.map((subject) => ({
    value: subject.id,
    label: subject.title,
  }));
  const handleData = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/roadmaps/completed_lecture_search/${select1.value}/${keyword}/`,
        // `${BASE_URL}/roadmaps/completed_lecture_search/${"경제"}/${"금융"}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setDataArray(res.data);
      console.log(res.data);
    } catch (err) {
      console.log("getPost error: ", err);
    }
  };
  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  return (
    <>
      <ProgressBar>
        <Progress width={100 - (availableItem * 100) / maxItem} bgColor={bg} />
      </ProgressBar>
      <BigTitles>
        <PageTitle
          text={{
            left: "나의 교과 과정과 ",
            bold: "부전공을",
            right: " 선택하세요",
          }}
        />
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
        <SearchBar>
          <StyledInput
            type="text"
            value={keyword}
            onChange={handleChange}
            placeholder="과목을 검색하세요"
          />
          <SearchIcon icon={faMagnifyingGlass} onClick={handleData} />
        </SearchBar>
        <MultiMajor
          options={searchedData}
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
  // justify-content: center;
  margin: 0 auto;
  display: flex;

  width: 60%;

  margin-bottom: 2%;
  justify-content: space-between;
`;
const SelectMajor = styled(Select)`
  .select-placeholder-text {
    color: pink;
  }
  border-radius: 60px;
  width: 30%;
  // margin-right: 10%;
`;
const SearchBar = styled.div`
  position: relative;
  // background: black;
  width: 30%;
`;
const StyledInput = styled.input`
  width: 100%;
  height: 80%;
  border-radius: 60px;
`;
const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 10px;
  top: 30%;
  right: 3%;
  cursor: pointer;
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
  font-family: "Noto Sans KR";
  font-weight: 700;
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
  font-family: "Noto Sans KR";
  font-weight: 700;
`;

export default SelectSearch;
