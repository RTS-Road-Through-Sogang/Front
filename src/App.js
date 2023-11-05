import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./Header";
import Introduce from "./Introduce";
import Login from "./Login";
import SignUp from "./SignUp";
import Roadmap from "./Roadmap";

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
  );
}

export default App;
