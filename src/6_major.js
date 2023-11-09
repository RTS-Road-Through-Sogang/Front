import { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Feature from "./Feature";
import { URL } from "./App";
import { useNavigate } from "react-router-dom";
const curri = {
  name: "이우찬",
  major: {
    title: "경제",
  },
  major_tracks: [
    {
      ECO_tracks: [
        {
          title: "다전공 1전공",
          major: 3,
          student_year: {
            student_year: 21,
          },
        },
        {
          title: "단일전공",
          major: 3,
          student_year: {
            student_year: 21,
          },
        },
        {
          title: "Honors Program",
          major: 3,
          student_year: {
            student_year: 21,
          },
        },
      ],
    },
    {
      second_major: [
        {
          major: "컴퓨터공학",
        },
        {
          major: "경영",
        },
      ],
    },
  ],
};

const SelectContainer = ({ id, title, setSelect, select }) => {
  const [isclicked, setisclicked] = useState(false);

  const onClick = () => {
    setisclicked(!isclicked);
    if (isclicked) {
      const filtered = select.filter((item) => item != id);
      setSelect(filtered);
    } else {
      setSelect([...select, id]);
    }
  };

  return (
    <>
      <SelectBox onClick={onClick} isclicked={isclicked}>
        {title}
      </SelectBox>
    </>
  );
};

const SelectContainer2 = ({ id, major, setSelect, select }) => {
  const [isclicked, setisclicked] = useState(false);

  const onClick = () => {
    setisclicked(!isclicked);
    if (isclicked) {
      const filtered = select.filter((item) => item != id);
      setSelect(filtered);
    } else {
      setSelect([...select, id]);
    }
  };

  return (
    <>
      <SelectBox onClick={onClick} isclicked={isclicked}>
        {major}
      </SelectBox>
    </>
  );
};

const SelecMajor = () => {
  const maxItem = 5;
  let availableItem = 4;
  const c = 194 - (100 / maxItem) * (maxItem - availableItem);
  const bg = `rgb(255, ${c}, ${c})`;

  const maxSelect = [4, 1, 1, 3, 2];

  const [select, setSelect] = useState([]);
  const [select1, setSelect1] = useState([]);

  const navigate = useNavigate();
  const goNext = () => {
    navigate("/selectsearch");
  };
 
  // const ax = async () => {
  //   try {
  //     const res = await axios.get(url, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  //     console.log(res.data);
  //     console.log("rtrt");
  //   } catch (err) {
  //     console.log("getPost error: ", err);
  //   }
  // };
  console.log("Start");
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      // 요청이 성공하면 이 곳에서 응답을 처리합니다.
      console.log("yes");
      console.log(response.data);
    })
    .catch((error) => {
      // 요청이 실패하면 이 곳에서 에러를 처리합니다.
      console.log("no");
      console.error(error);
    });
   return (
     <>
       <ProgressBar>
         <Progress width={100 - (availableItem * 100) / maxItem} bgcolor={bg} />
       </ProgressBar>
       <BigTitles>
         <FontAwesomeIcon icon={faComment} style={{ color: "#FF6262" }} /> 나의
         교과과정과 부전공을 선택하세요
       </BigTitles>
       <BigBox>
         <LeftBox>
           <Title>
             <Icon>
               <FontAwesomeIcon
                 icon={faCheck}
                 style={{ color: "#FF6262", fontSize: "1.7rem" }}
               />
             </Icon>
             <TitleText>
               루트 선택
               <SmallBox>
                 <XSmaillBox>
                   {curri.major_tracks[0].ECO_tracks.map((item) => (
                     <SelectContainer
                       {...item}
                       setSelect={setSelect}
                       select={select}
                     />
                   ))}
                 </XSmaillBox>
               </SmallBox>
             </TitleText>
           </Title>
           <Title>
             <Icon>
               <FontAwesomeIcon
                 icon={faCheck}
                 style={{ color: "#FF6262", fontSize: "1.7rem" }}
               />
             </Icon>
             <TitleText>
               부전공 선택
               <SmallBox>
                 <XSmaillBox>
                   {curri.major_tracks[1].second_major.map((item) => (
                     <SelectContainer2
                       {...item}
                       setSelect={setSelect}
                       select={select}
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
  background-color: ${(props) => props.bgcolor};
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
  margin-top: 2%;
`;
const XSmaillBox = styled.div``;
const SelectBox = styled.button`
  font-size: 0.9rem;
  margin-right: 1%;
  margin-bottom: 2%;

  padding: 0.8% 2%;

  border-radius: 60px;
  display: inline-block;

  background-color: ${({ isclicked }) => (!isclicked ? "#EFEFEF" : "white")};
  border: ${({ isclicked }) =>
    !isclicked ? "0.2rem solid #EFEFEF" : "0.2rem solid #FF6262"};
  color: ${({ isclicked }) => (!isclicked ? "#B3B3B3" : "#FF6262")};
  font-weight: ${({ isclicked }) => (!isclicked ? 500 : 700)};
`;

const SmallTitle = styled.div`
  font-size: 1.1rem;
  margin-top: 2%;
  margin-left: 1%;
`;

const Next = styled.button`
  margin: 0% 40%;
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
export default SelecMajor;
