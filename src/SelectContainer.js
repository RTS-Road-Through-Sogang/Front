import React from "react";
import { SelectBox, InsideBar, Semester1, Semester2, Progress2, ProgressBar2 } from "./Select_styledcomponent";
import { useEffect, useState, useRef } from "react";
import noteta from "./images/not_eta.png"
import yeseta from "./images/maj_eta.png"

import styled from "styled-components";
const SelectContainer = ({
  id,
  title,
  point,
  code,
  season_open,
  setSelect,
  select,
  ex_select,
  semester_one,
  semester_two,
  selectedData,
  setSelectEX,
  select0,
  setSelect0,
  setSelectedData,
  eta,
  teamplay
}) => {
  const [isClicked, setisClicked] = useState(false);
  const [currentImage, setCurrentImage] = useState(noteta);
  //new
  
  useEffect(() => {
    selectedData.forEach((item) => {
    if (item[0] === code) {
      if (!select.some(([c, p]) => c === code)) {
            setSelect((prevSelect) => {
          const newSelect = [...prevSelect, [code, point]];
          // 중복된 항목 제거
          return newSelect.filter(
            (item, index, self) =>
              index === self.findIndex(([c, p]) => c === item[0] && p === item[1])
          );
        });
      }
    }
  });
 selectedData.forEach((item) => {
   if (item[0] == code) {
     setisClicked(!isClicked);
     
   }
 }); 
  }, []);
  


  const onClick = () => {
    setSelectEX(select);
    setCurrentImage(
      currentImage === noteta ? yeseta : noteta
     );

    setisClicked((prevIsClicked) => !prevIsClicked);
    if (isClicked) {
      const filtered = select.filter(
        (item) => item[0] != code || item[1] != point
      );

      const filtere = select0.filter((item) => item[0] != code);
      const filtere1 = selectedData.filter((item) => item[0] != code);

      setSelect(filtered);
      setSelect0(filtere);
      setSelectedData(filtere1);
    } else {
      setSelect([...select, [code, point]]);
      setSelect0([...select0, [code, point]]);
    }
  };
  
 
  let season = "";
  if (season_open === true) {
    season = "O";
  } else {
    season = "X";
  }
  const handleLinkClick = () => {
    window.open(eta, "_blank");
  };

  const StarRating = ({ rating }) => {
   
    const stars = Array.from({ length: rating }, (_, index) => (
      <span key={index}>
        {index === 0 ? <span>팀플: &#8859; </span> : <span> &#8859; </span>}
      </span>
    ));

    return <div className="star-rating">{stars}</div>;
  };



  return (
    <>
      <SelectBox onClick={onClick} isClicked={isClicked}>
        <Title1>{title}</Title1>
        <br />
        수강 오픈 비율
        <br />
        과목 코드: {code}
        <br />
        학점: {point}학점 <br />
        계절: {season}
        <InsideBar>
          <Semester1>1학기</Semester1>
          <Semester2>2학기</Semester2>
        </InsideBar>
        <ProgressBar2>
          <Progress2
            width={100 * (semester_one / (semester_one + semester_two))}
            bgColor={"#ffe7f3"}
          />
        </ProgressBar2>
        <p>
          <StarRating rating={teamplay} />
        </p>
        <Eta>
          <span
            style={{
              cursor: "pointer",
            }}
          >
            에브리타임 &#8599;
          </span>
          <ClickableImage
            src={currentImage}
            isClicked={isClicked}
            onClick={handleLinkClick}
            style={{ marginTop: "4px" }}
          />
        </Eta>
        <br />
      </SelectBox>
    </>
  );
};

const Title1 = styled.div`
  font-size: 1.1rem;
  
`;


const ClickableImage = styled.img`
  /* 다른 스타일을 추가하세요 */
  position: absolute;
  cursor: pointer;
  width: 25px;
  top: -25%;
  
  textdecoration: "underline";
  aspect-ratio: 1; /* 이 숫자는 가로세로 비율입니다. 예를 들어, 1은 1:1 비율을 의미합니다. */
`;

const Eta = styled.div`
  position: relative;
 
`;

export default SelectContainer;