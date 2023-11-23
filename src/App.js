import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import GlobalStyle from "./GlobalStyle.jsx";
import Header from "./Header";
import Introduce from "./Introduce";
import Login from "./Login";
import SignUp from "./SignUp";
import Roadmap from "./Roadmap";
import SelectSearch from "./6_search";
import SelecMajor from "./6_major";
import SelectCommon from "./Select_1_commonduty";
import SelectChoice from "./Select_2_commonchioce";

import SelectCseGicho from "./Select_3_cse_gicho";
import SelectMgtGicho from "./Select_3_mgt_gicho.js";
import SelectEcoGicho from "./Select_3_eco_gicho";

import SelectCseDuty from "./Select_4_cseduty";
import SelectEcoDuty from "./Select_4_ecoduty";

import SelectCseDutyChoice from "./Select_5_csedutychoice";
import SelectEcoDutyChoice from "./Select_5_ecodutychoice";

import SelectCseChoice from "./Select_6_cseselect";
import SelectEcoChoice from "./Select_6_ecochoice";
import SelectMgtDuty from "./Select_4_mgtduty.js";
import SelectmgtDutyChoice from "./Select_5_mgtducychoice.js";
import SelectMgtChoice from "./Select_6_mgtchoice.js";
import SelectSubCseDuty from "./Select_sub_4_cseduty.js";
import SelectSubMgtDuty from "./Select_sub_4_mgtduty.js";
import SelectSubEcoDuty from "./Select_sub_4_ecoduty.js";
import SelectSubCseDutyChoice from "./Select_sub_5_csedutychoice.js";
import SelectSubmgtDutyChoice from "./Select_sub_5_mgtdutychoice.js";
import SelectSubEcoDutyChoice from "./Select_sub_5_ecodutychoice.js";
import SelectSubCseChoice from "./Select_sub_6_cseselect.js";
import SelectSubMgtChoice from "./Select_sub_6_mgtchoice.js";
import SelectSubEcoChoice from "./Select_sub_6_ecoselect.js";
import SelectSubCseGicho from "./Select_sub_3_cse_gicho.js";
import SelectSubMgtGicho from "./Select_sub_3_mgt_gicho.js";
import SelectSubEcoGicho from "./Select_sub_3_eco_gicho.js";
import CurrentStatus from "./19_currentstatus.js";
import CreateRoadmapDetails from "./20_roadmapcreate.js";
import CreateDefaultRoadmapDetails from "./20_roadmapdefaultcreate.js";
import SelectMajor2 from "./6_roadmap_major.js";
import { AuthProvider } from "./AuthContext.js";
export const URL = process.env.APIURL;

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Introduce />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/majortrack" element={<SelecMajor />} />
            <Route path="/afterdefault" element={<SelectMajor2 />} />
            <Route path="/selectsearch" element={<SelectSearch />} />
            <Route path="/selectcommon" element={<SelectCommon />} />

            <Route path="/selectchoice" element={<SelectChoice />} />

            <Route path="/selectcsegicho" element={<SelectCseGicho />} />
            <Route path="/selectmgtgicho" element={<SelectMgtGicho />} />
            <Route path="/selectecogicho" element={<SelectEcoGicho />} />

            <Route path="/selectecoduty" element={<SelectEcoDuty />} />
            <Route path="/selectcseduty" element={<SelectCseDuty />} />
            <Route path="/selectmgtduty" element={<SelectMgtDuty />} />

            <Route
              path="/selectecodutychoice"
              element={<SelectEcoDutyChoice />}
            />
            <Route
              path="/selectcsedutychoice"
              element={<SelectCseDutyChoice />}
            />
            <Route
              path="/selectmgtdutychoice"
              element={<SelectmgtDutyChoice />}
            />

            <Route path="/selectcsechoice" element={<SelectCseChoice />} />
            <Route path="/selectecochoice" element={<SelectEcoChoice />} />
            <Route path="/selectmgtchoice" element={<SelectMgtChoice />} />

            <Route path="/selectsubcsegicho" element={<SelectSubCseGicho />} />
            <Route path="/selectsubmgtgicho" element={<SelectSubMgtGicho />} />
            <Route path="/selectsubecogicho" element={<SelectSubEcoGicho />} />

            <Route path="/selectsubcseduty" element={<SelectSubCseDuty />} />
            <Route path="/selectsubmgtduty" element={<SelectSubMgtDuty />} />
            <Route path="/selectsubecoduty" element={<SelectSubEcoDuty />} />

            <Route
              path="/selectsubcsedutychoice"
              element={<SelectSubCseDutyChoice />}
            />
            <Route
              path="/selectsubmgtdutychoice"
              element={<SelectSubmgtDutyChoice />}
            />
            <Route
              path="/selectsubecodutychoice"
              element={<SelectSubEcoDutyChoice />}
            />

            <Route
              path="/selectsubcsechoice"
              element={<SelectSubCseChoice />}
            />
            <Route
              path="/selectsubmgtchoice"
              element={<SelectSubMgtChoice />}
            />
            <Route
              path="/selectsubecochoice"
              element={<SelectSubEcoChoice />}
            />

            <Route path="/status" element={<CurrentStatus />} />
            <Route path="/roadmapcreate" element={<CreateRoadmapDetails />} />
            <Route
              path="/roadmapdefaultcreate"
              element={<CreateDefaultRoadmapDetails />}
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
