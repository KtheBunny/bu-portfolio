import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { usePageTransition } from "./PageTransitionContext";

import HomeParaArt from "./HomeParaArt";
import HomeParaGame from "./HomeParaGame";
import HomeParaUI from "./HomeParaUI";

export default function HomeCanvas() {
  const [isLeaving, setIsLeaving] = useState(false);
  const [showSeeMore, setShowSeeMore] = useState(false);
  const { playTransition } = usePageTransition();
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const hoverLock = useRef(false);

  const left = useSpring(0.33, { stiffness: 300, damping: 25, mass: 1.2 });
  const right = useSpring(0.66, { stiffness: 300, damping: 25, mass: 1.2 });

  const leftPx = useTransform(left, (v) => v * containerWidth - 200);
  const rightPx = useTransform(right, (v) => v * containerWidth);
  const leftWidth = useTransform(left, (v) => v * containerWidth);
  const midWidth = useTransform(
    [left, right],
    ([l, r]) => (r - l) * containerWidth + 400,
  );
  const rightWidth = useTransform(right, (v) => (1 - v) * containerWidth);
  const centerX = useTransform(leftPx, (v) => `calc(50vw - ${v}px)`);

  const TitleClicked = () => {
    if (!isLeaving) {
      setIsLeaving(true);
      playTransition("/Works");
    }
  };
  const BottomClicked = () => {
    if (!isLeaving) {
      setIsLeaving(true);
      playTransition("/About");
    }
  };

  useEffect(() => {
    setIsLeaving(false);

    if (containerRef.current) {
      setContainerWidth(containerRef.current.getBoundingClientRect().width);
    }

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.getBoundingClientRect().width);
      }
    };

    // Scroll to leave page
    const handleWheel = (e) => {
      // 往下滾
      if (e.deltaY > 0 && !isLeaving) {
        setIsLeaving(true);
        playTransition("/About");
      }
    };

    //window.addEventListener("mousemove", handleMove);
    window.addEventListener("resize", handleResize);
    window.addEventListener("wheel", handleWheel);
    return () => {
      //window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isLeaving]);

  const handleMotionDivEntering = (div) => {
    hoverLock.current = true;
    if (div === "left") {
      left.set(0.8);
      right.set(0.95);
    } else if (div === "right") {
      left.set(0.05);
      right.set(0.2);
    } else {
      left.set(0.1);
      right.set(0.9);
    }
  };

  const handleMotionDivLeaving = () => {
    hoverLock.current = false;
  };

  //
  // 首次手機使用提示
  //
  const MOBILE_HINT_KEY = "mobile-view-hint-dismissed";

  const [showMobileHint, setShowMobileHint] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(MOBILE_HINT_KEY);

    // md 以下才顯示
    const isSmallScreen = window.innerWidth < 768;

    if (!dismissed && isSmallScreen) {
      setShowMobileHint(true);
    }
  }, []);

  const handleMobileHintDismiss = () => {
    localStorage.setItem(MOBILE_HINT_KEY, "true");
    setShowMobileHint(false);
  };

  //
  // 首次NAVBAR使用提示
  //
  const NAVBAR_HINT_KEY = "navbar-view-hint-dismissed";

  const [showNavbarHint, setShowNavbarHint] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(NAVBAR_HINT_KEY);

    if (!dismissed) {
      setShowNavbarHint(true);
    }
  }, []);

  const handleNavbarHintDismiss = () => {
    localStorage.setItem(NAVBAR_HINT_KEY, "true");
    setShowNavbarHint(false);
  };

  return (
    <>
      {/* 手機提示 */}
      {showMobileHint && (
        <div className="fixed inset-0 z-[999] ml-14 flex items-center justify-center bg-black/70">
          <div className="mx-4 flex max-w-sm flex-col items-center gap-6 rounded-xl border bg-[#0f0f0f] p-8 text-center shadow-xl">
            <Icon icon="mdi:phone-rotate-landscape" className="h-10 w-10" />
            <p className="text-white">推薦使用電腦或橫向手機觀看網頁。</p>

            <button
              onClick={handleMobileHintDismiss}
              className="rounded-md border px-4 py-2 text-white hover:bg-white hover:text-[#0f0f0f]"
            >
              我知道了
            </button>
          </div>
        </div>
      )}

      {/* 導航提示 */}
      {showNavbarHint && (
        <div className="fixed inset-0 z-[888] ml-14 flex items-center justify-start bg-black/70">
          <div className="mx-4 flex max-w-sm flex-col items-center gap-6 rounded-xl border bg-[#0f0f0f] p-6 text-center shadow-xl">
            <Icon icon="ix:navigation-left-hide" className="h-10 w-10" />
            <p className="text-white">您可以透過左側導覽列隨時切換頁面。</p>

            <button
              onClick={handleNavbarHintDismiss}
              className="rounded-md border px-4 py-2 text-white hover:bg-white hover:text-[#0f0f0f]"
            >
              我知道了
            </button>
          </div>
        </div>
      )}

      {/* 首頁內容 */}
      <div
        ref={containerRef}
        className="relative min-h-svh overflow-hidden"
        style={{
          left: "3.5rem",
          width: "calc(100vw - 3.5rem)",
        }}
      >
        {/* Middle Part */}
        <motion.div
          onPointerEnter={() => {
            handleMotionDivEntering("middle");
          }}
          onPointerLeave={handleMotionDivLeaving}
          onPointerDown={() => {
            handleMotionDivEntering("middle");
          }}
          onPointerUp={handleMotionDivLeaving}
          className="absolute top-0 h-full overflow-hidden"
          style={{
            left: leftPx,
            width: midWidth,
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div
            className="fixed left-[3.5rem] top-0 h-full"
            style={{
              backgroundColor: "#FFF",
              width: "calc(100vw - 3.5rem)",
            }}
          >
            <div
              className="group absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center"
              onClick={TitleClicked}
            >
              <h2 className="flex w-full justify-between font-gugi text-2xl font-bold text-orange-600 transition duration-75 group-hover:text-orange-900">
                {"UI/UX   Design".split("").map((c, i) => (
                  <span key={i}>{c}</span>
                ))}
              </h2>
              <h1 className="border-b border-orange-600 pb-3 font-gugi text-4xl font-bold tracking-wide text-orange-600 transition duration-75 group-hover:border-orange-900 group-hover:text-orange-900 lg:text-5xl">
                PORTFOLIO
              </h1>
              <span className="mt-3 font-bold tracking-widest text-orange-600 transition duration-75 group-hover:text-orange-900">
                查看作品列表
              </span>
            </div>

            {/* Guide */}
            <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-orange-600 transition duration-75 hover:text-orange-900">
              <button
                className="flex animate-bounce flex-col items-center gap-2"
                onClick={BottomClicked}
              >
                <Icon icon="lineicons:scroll-down-2" className="h-10 w-10" />
                <span className="font-bold tracking-widest">關於我</span>
              </button>
            </div>

            <HomeParaUI />
          </div>
        </motion.div>

        {/* Left Part */}
        <motion.div
          onPointerEnter={() => {
            handleMotionDivEntering("left");
          }}
          onPointerLeave={handleMotionDivLeaving}
          onPointerDown={() => {
            handleMotionDivEntering("left");
          }}
          onPointerUp={handleMotionDivLeaving}
          className="absolute left-0 top-0 h-full overflow-hidden"
          style={{
            width: leftWidth,
            WebkitMaskImage:
              "linear-gradient(to right, black 85%, transparent)",
            maskImage: "linear-gradient(to right, black 85%, transparent)",
          }}
        >
          <div
            className="fixed left-[3.5rem] top-0 h-full"
            style={{
              width: "calc(100vw - 3.5rem)",
            }}
          >
            <div
              className="group absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center"
              onClick={TitleClicked}
            >
              <h2 className="flex w-full justify-between font-gugi text-2xl font-bold text-cyan-200 transition duration-75 group-hover:text-emerald-400">
                {"Game       Dev".split("").map((c, i) => (
                  <span key={i}>{c}</span>
                ))}
              </h2>
              <h1 className="border-b border-cyan-200 pb-3 font-gugi text-4xl font-bold tracking-wide text-cyan-200 transition duration-75 group-hover:border-emerald-400 group-hover:text-emerald-400 lg:text-5xl">
                PORTFOLIO
              </h1>
              <span className="mt-3 font-bold tracking-widest text-cyan-200 transition duration-75 group-hover:text-emerald-400">
                查看作品列表
              </span>
            </div>

            {/* Guide */}
            <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-cyan-200 transition duration-75 hover:text-emerald-400">
              <button
                className="flex animate-bounce flex-col items-center gap-2"
                onClick={BottomClicked}
              >
                <Icon icon="lineicons:scroll-down-2" className="h-10 w-10" />
                <span className="font-bold tracking-widest">關於我</span>
              </button>
            </div>

            <HomeParaGame />
          </div>
        </motion.div>

        {/* Right Part */}
        <motion.div
          onPointerEnter={() => {
            handleMotionDivEntering("right");
          }}
          onPointerLeave={handleMotionDivLeaving}
          onPointerDown={() => {
            handleMotionDivEntering("right");
          }}
          onPointerUp={handleMotionDivLeaving}
          className="absolute right-0 top-0 h-full overflow-hidden"
          style={{
            width: rightWidth,
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 15%)",
            maskImage: "linear-gradient(to right, transparent, black 15%)",
          }}
        >
          <div
            className="fixed left-[3.5rem] top-0 h-full"
            style={{ width: "calc(100vw - 3.5rem)" }}
          >
            <div
              className="group absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center"
              onClick={TitleClicked}
            >
              <h2 className="flex w-full justify-between font-gugi text-2xl font-normal text-white transition duration-75 group-hover:text-violet-300">
                {"Illustration".split("").map((c, i) => (
                  <span key={i}>{c}</span>
                ))}
              </h2>
              <h1 className="border-b pb-3 font-gugi text-4xl font-bold tracking-wide text-white transition duration-75 group-hover:border-violet-300 group-hover:text-violet-300 lg:text-5xl">
                PORTFOLIO
              </h1>
              <span className="mt-3 font-bold tracking-widest transition duration-75 group-hover:text-violet-300">
                查看作品列表
              </span>
            </div>

            {/* Guide */}
            <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transition duration-75 hover:text-violet-300">
              <button
                className="flex animate-bounce flex-col items-center gap-2"
                onClick={BottomClicked}
              >
                <Icon icon="lineicons:scroll-down-2" className="h-10 w-10" />
                <span className="font-bold tracking-widest">關於我</span>
              </button>
            </div>

            <HomeParaArt />
          </div>
        </motion.div>
      </div>
    </>
  );
}
