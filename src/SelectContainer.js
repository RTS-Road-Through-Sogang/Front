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
  //각 박스 클릭이벤트 감지
  const [isClicked, setisClicked] = useState(false);
  //에타 선택시, 선택 취소시 변경 관리
  const [currentImage, setCurrentImage] = useState(noteta); //일단 클릭x로 설정

  useEffect(() => {
    //selectedData(전 페이지에서까지 선택된 데이터)는 클릭하지 않았어도 클릭한 것처럼 처리 해줘야함

    selectedData.forEach((item) => {
      if (item[0] === code) {
        //현재 박스와 selectedData의 한 원소가 겹치면
        if (!select.some(([c, p]) => c === code)) {
          //그런데 이미 선택된 목록에 이 원소가 없다면
          setSelect((prevSelect) => {
            const newSelect = [...prevSelect, [code, point]]; //[과목코드, 학점] 형태로 newSelect에 저장

            // 중복된 항목을 제거하고 유일한 값만 남김
            return newSelect.filter(
              (item, index, self) =>
                index ===
                self.findIndex(([c, p]) => c === item[0] && p === item[1])
            );
          });
        }
      }
    });
    //isClicked, eta 값을 변경해 박스 테두리 색깔 변경
    selectedData.forEach((item) => {
      if (item[0] == code) {
        setisClicked(!isClicked);
        setCurrentImage(currentImage === noteta ? yeseta : noteta);
      }
    });
  }, []);

  //클릭 이벤트 시 발생
  //클릭되면 해당 item을 배열에 추가해야한다.
  const onClick = () => {
    //ex_select 배열에 현재까지 선택된 select[숫자] (여기서는 select로 사용) 배열을 넣어줌
    setSelectEX(select);
    setCurrentImage(currentImage === noteta ? yeseta : noteta); //eta 이미지 변경

    setisClicked((prevIsClicked) => !prevIsClicked); //isclicked 변경

    //클릭되면 해당 item을 배열에 추가, 삭제 해야한다.

    //***만약 isclicked true면 해당 item을 배열에서 빼야 한다 (담아놓기 취소)
    if (isClicked) {
      //select 배열에 code와 point와 일치하지 않는 항목들을 남기고, 일치하는 항목들을 제거
      const filtered = select.filter(
        (item) => item[0] != code || item[1] != point
      );
      //select0 배열에 code와 point와 일치하지 않는 항목들을 남기고, 일치하는 항목들을 제거
      const filtere = select0.filter((item) => item[0] != code);
      //selected 배열에 code와 point와 일치하지 않는 항목들을 남기고, 일치하는 항목들을 제거
      const filtere1 = selectedData.filter((item) => item[0] != code);

      //필터링된 것들을 다시 각 배열에 저장
      setSelect(filtered);
      setSelect0(filtere);
      setSelectedData(filtere1);
    } else {
      //외에는 그냥 해당 item을 배열에 추가하면 된다
      setSelect([...select, [code, point]]);
      setSelect0([...select0, [code, point]]);
    }
  };
//계절학기 개설 여부
  let season = "";
  if (season_open === true) {
    season = "O";
  } else {
    season = "X";
  }
  //에타 링크 연결
  const handleLinkClick = () => {
    window.open(eta, "_blank");
  };
//팀플 여부
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