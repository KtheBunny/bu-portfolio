import { Route, Routes } from "react-router-dom";

import "./App.css";
import Tree from "./pages/Tree";
import Home from "./pages/Home";
import NavSideBar from "./components/NavSideBar";

function App() {
  return (
    <>
      <NavSideBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Skills" element={<Tree />} />
      </Routes>
    </>
  );
}

export default App;
