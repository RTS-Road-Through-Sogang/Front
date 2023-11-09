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
import SelectCommon from "./Select_1_commonduty";
import SelectChoice from "./Select_2_commonchioce";
import SelectCseGicho from "./Select_3_cse_gicho";
import SelectCseDuty from "./Select_4_cseduty";
import SelectCseDutyChoice from "./Select_5_csedutychoice";
import SelectCseChoice from "./Select_6_cseselect";

export const URL = process.env.APIURL;

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/majortrack" element={<SelecMajor />} />
          <Route path="/selectsearch" element={<SelectSearch />} />
          <Route path="/selectcommon" element={<SelectCommon />} />
          <Route path="/selectchoice" element={<SelectChoice />} />

          <Route path="/selectcsegicho" element={<SelectCseGicho />} />
          <Route path="/selectcseduty" element={<SelectCseDuty />} />
          <Route
            path="/selectcsedutychoice"
            element={<SelectCseDutyChoice />}
          />
          <Route path="/selectcsechoice" element={<SelectCseChoice />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
