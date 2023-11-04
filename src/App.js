import Header from "./Header";
import Introduce from "./Introduce";
import CurrentStatus from "./CurrentStatus";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SemesterList from "./SemesterList";
import EachSemester from "./EachSemester";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 웹 서비스 소개 페이지 */}
        <Route path="/" element={<Introduce />} />
        {/* ppt 19 /> */}
        <Route path="/status" element={<CurrentStatus />} />
        <Route path="/semesterlist" element={<SemesterList />} />
        <Route path="/semester1-1" element={<EachSemester />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
