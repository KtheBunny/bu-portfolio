import { Route, Routes } from "react-router-dom";
import { TransitionProvider } from "./components/PageTransitionContext";
import { lazy, Suspense } from "react";
import TransitionOverlay from "./components/TransitionOverlay";
import ScrollToTop from "./components/ScrollToTop";

import "./App.css";
/*
import Tree from "./pages/Tree";
import Home from "./pages/Home";z
import About from "./pages/About";
import Portfolio from "./components/PortfolioList";
import Eminence from "./components/Eminence";
import Moonwalk from "./components/Moonwalk";
import PathOfGhost from "./components/PathOfGhost";
import Healter from "./components/Healter";
import IKHTCG from "./components/IKHTCG";
import Pixelart from "./components/Pixelart";
import Illustration from "./components/Illustration";
*/

const Home = lazy(() => import("./pages/Home"));
const Tree = lazy(() => import("./pages/Tree"));
const About = lazy(() => import("./pages/About"));
const Articles = lazy(() => import("./pages/Articles"));
const Portfolio = lazy(() => import("./components/PortfolioList"));

const Eminence = lazy(() => import("./components/Eminence"));
const Moonwalk = lazy(() => import("./components/Moonwalk"));
const PathOfGhost = lazy(() => import("./components/PathOfGhost"));
const Healter = lazy(() => import("./components/Healter"));
const IKHTCG = lazy(() => import("./components/IKHTCG"));
const Pixelart = lazy(() => import("./components/Pixelart"));
const Illustration = lazy(() => import("./components/Illustration"));
const PortfolioWeb = lazy(() => import("./components/PortfolioWeb"));

import NavSideBar from "./components/NavSideBar";

function App() {
  return (
    <TransitionProvider>
      <ScrollToTop />

      <NavSideBar />
      <TransitionOverlay />

      <Suspense
        fallback={
          <div className="ml-14 flex h-screen w-[vh100-3.5rem] items-center justify-center bg-[#0f0f0f] font-gugi">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Articles" element={<Articles />} />
          <Route path="/Skills" element={<Tree />} />
          <Route path="/Works" element={<Portfolio />} />
          <Route path="/Works/Eminence" element={<Eminence />} />
          <Route path="/Works/Moonwalk" element={<Moonwalk />} />
          <Route path="/Works/PathOfGhost" element={<PathOfGhost />} />
          <Route path="/Works/Healter" element={<Healter />} />
          <Route path="/Works/IKH-TCG" element={<IKHTCG />} />
          <Route path="/Works/PixelArt" element={<Pixelart />} />
          <Route path="/Works/Illustration" element={<Illustration />} />
          <Route path="/Works/PortfolioWeb" element={<PortfolioWeb />} />
        </Routes>
      </Suspense>
    </TransitionProvider>
  );
}

export default App;
