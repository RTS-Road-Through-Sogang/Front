import React, { useState } from "react";
import "./EachSemesterCourses.css";

function EachSemesterCourses() {
  let data = [
    "과목입니다",
    "과목입니다",
    "과목입니다",
    "과목입니다",
    "과목입니다",
    "과목입니다",
  ];

  let [btnActive, setBtnActive] = useState("");

  const toggleActive = (e) => {
    setBtnActive((prev) => {
      return e.target.value;
    });
  };

  return (
    <div className="courses-container">
      {data.map((item, idx) => {
        return (
          <>
            <button
              value={idx}
              className={"btn" + (idx == btnActive ? " active" : "")}
              onClick={toggleActive}
            >
              {item}
            </button>
          </>
        );
      })}
    </div>
  );
}

export default EachSemesterCourses;
