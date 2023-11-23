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

const SelectContainer = ({
  id,
  label,
  name,
  setSelect,
  select,
  setSelectEX,
  code,
  point,
  ex_select,
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
    const dataWithAdditionalInfo = select.map((item) => [
      item.code,
      item.point,
    ]);
    console.log(select);
    console.log(dataWithAdditionalInfo);

    const serializedArray = JSON.stringify(dataWithAdditionalInfo);
    sessionStorage.setItem("selected", serializedArray);
    sessionStorage.setItem("Defaultselected", serializedArray);
    navigate("/roadmapdefaultcreate", {
      state: { selectedData: dataWithAdditionalInfo },
    });
  };

  //axios
  const [dataArray, setDataArray] = useState([]);

  const [select, setSelect] = useState([]);
  const [select1, setSelect1] = useState([]);
  const [select2, setSelect2] = useState([]);
  const [select3, setSelect3] = useState([]);
  const [select4, setSelect4] = useState([]);
  const [ex_select, setSelectEX] = useState([]);

  const [keyword, setKeyword] = useState("");

  const len = [
    select.length,
    select1.length,
    select2.length,
    select3.length,
    select4.length,
  ];

  // useEffect(() => {
  //   handleData();
  // }, []);
  // console.log(select1);
  // console.log(keyword);

  const searchedData = dataArray.map((subject) => ({
    value: subject.id,
    label: subject.title,
    code: subject.code,
    point: subject.point,
  }));
  console.log(searchedData);
  const handleData = async () => {
    let url = `${BASE_URL}/roadmaps/completed_lecture_search/`;
    if (!select1) {
      alert("전공을 선택해주세요");
      return;
    } else {
      url += `${select1.value}/`;
      if (!keyword) {
        url += `None/`;
      } else {
        url += `${keyword}/`;
      }
    }
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
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
      <BigTitles>
        <PageTitle
          text={{
            left: "",
            bold: "이미 이수한 과목을",
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
            placeholder=" 과목을 검색하세요"
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
  border: 0.1rem solid #cccccc;
  color: #cccccc;
  border-radius: 3px;
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
