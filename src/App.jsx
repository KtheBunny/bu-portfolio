import { Route, Routes } from "react-router-dom";
import { TransitionProvider } from "./components/PageTransitionContext";
import TransitionOverlay from "./components/TransitionOverlay";
import ScrollToTop from "./components/ScrollToTop";

import "./App.css";
import Tree from "./pages/Tree";
import Home from "./pages/Home";
import Portfolio from "./components/PortfolioList";
import Eminence from "./components/Eminence";
import Moonwalk from "./components/Moonwalk";
import PathOfGhost from "./components/PathOfGhost";
import Healter from "./components/Healter";
import IKHTCG from "./components/IKHTCG";
import Pixelart from "./components/Pixelart"

import NavSideBar from "./components/NavSideBar";

function App() {
  return (
    <TransitionProvider>
      <ScrollToTop />

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
        <Route path="/Works/IKH-TCG" element={<IKHTCG />} />
        <Route path="/Works/PixelArt" element={<Pixelart />} />
      </Routes>
    </TransitionProvider>
  );
}

export default App;
