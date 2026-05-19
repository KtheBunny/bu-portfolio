import { Route, Routes } from "react-router-dom";
import { TransitionProvider } from "./components/PageTransitionContext";
import TransitionOverlay from "./components/TransitionOverlay";

import "./App.css";
import Tree from "./pages/Tree";
import Home from "./pages/Home";
import Portfolio from "./components/PortfolioList";
import Eminence from "./components/Eminence";
import NavSideBar from "./components/NavSideBar";

function App() {
  return (
    <TransitionProvider>
      <NavSideBar />
      <TransitionOverlay />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Skills" element={<Tree />} />
        <Route path="/Works" element={<Portfolio />} />
        <Route path="/Eminence" element={<Eminence />} />
      </Routes>
    </TransitionProvider>
  );
}

export default App;
