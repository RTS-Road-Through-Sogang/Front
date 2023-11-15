import React from "react";
import { SelectBox, InsideBar, Semester1, Semester2, Progress2, ProgressBar2 } from "./Select_styledcomponent";
import { useEffect, useState, useRef } from "react";
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
  //new
  
  useEffect(() => {
    selectedData.forEach((item) => {
      if (item[0] == code) {
        setisClicked(!isClicked);
        setSelect([...select, [code, point]]);
      }
    });
  }, []);

  const onClick = () => {
    setSelectEX(select);

    setisClicked(!isClicked);
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
  console.log(selectedData);
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
    console.log(rating);
    const stars = Array.from({ length: rating }, (_, index) => (
      <span key={index}>
        {index === 0 ? <span>팀플: &#9733; </span> : <span>&#9733; </span>}
      </span>
    ));

    return <div className="star-rating">{stars}</div>;
  };


  return (
    <>
      <SelectBox onClick={onClick} isClicked={isClicked}>
        {title}
        <br />
        <br />
        - 수강 오픈 비율
        <br />- 과목 코드: {code}
        <br />- 학점: {point}학점 <br />- 계절: {season}
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
     
        <span
          style={{
            textDecoration: "underline",

            cursor: "pointer",
          }}
          onClick={handleLinkClick}
        >
          에브리타임 바로가기
        </span>
        <br />
      </SelectBox>
    </>
  );
};

export default SelectContainer;