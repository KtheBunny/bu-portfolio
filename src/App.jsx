import { Route, Routes } from "react-router-dom";
import { TransitionProvider } from "./components/PageTransitionContext";
import TransitionOverlay from "./components/TransitionOverlay";

import "./App.css";
import Tree from "./pages/Tree";
import Home from "./pages/Home";
import Portfolio from "./components/PortfolioList";
import Eminence from "./components/Eminence";
import Moonwalk from "./components/Moonwalk";
import PathOfGhost from "./components/PathOfGhost";
import Healter from "./components/Healter";

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
        <Route path="/Works/Eminence" element={<Eminence />} />
        <Route path="/Works/Moonwalk" element={<Moonwalk />} />
        <Route path="/Works/PathOfGhost" element={<PathOfGhost />} />
        <Route path="/Works/Healter" element={<Healter />} />
      </Routes>
    </TransitionProvider>
  );
}

export default App;
