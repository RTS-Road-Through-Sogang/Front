import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./Header";
import Introduce from "./Introduce";
import Login from "./Login";
import SignUp from "./SignUp";
import Roadmap from "./Roadmap";
import Selecttech from "./6_tech";
import SelectSearch from "./6_search";
import SelecMajor from "./6_major";
import SelectSub from "./6_submajor";
import CurrentStatus from "./CurrentStatus";
import SemesterList from "./SemesterList";
import EachSemester from "./EachSemester";

function App() {
  return (

    <div>
      <SelecMajor />
    </div>

  );
}

export default App;
