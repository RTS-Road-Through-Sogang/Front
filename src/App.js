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



function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/intro" element={<Introduce />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/roadmap" element={<Roadmap />} />
      </Routes>
    </BrowserRouter>

      <SelectSub/>
    </div>

  );
}

export default App;
