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

  const gamedevClicked = () => {
    if (!isLeaving) {
      setIsLeaving(true);
      playTransition("/Works/Eminence");
    }
  };
  const UIClicked = () => {
    if (!isLeaving) {
      setIsLeaving(true);
      playTransition("/Works/Healter");
    }
  };
  const illustrationClicked = () => {
    if (!isLeaving) {
      setIsLeaving(true);
      playTransition("/Works/Illustration");
    }
  };

  useEffect(() => {
    // 判斷是否為滑鼠裝置
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const canHover = window.matchMedia("(hover: hover)").matches;
    setShowSeeMore(hasFinePointer && canHover);
  }, [showSeeMore]);

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
        playTransition("/Skills");
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

  return (
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
            className="group absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col"
            onClick={UIClicked}
          >
            <h2 className="flex w-full justify-between font-gugi text-2xl font-bold text-orange-500 transition duration-300 group-hover:text-orange-900">
              {"UI/UX   Design".split("").map((c, i) => (
                <span key={i}>{c}</span>
              ))}
            </h2>
            <h1 className="font-gugi text-4xl font-bold tracking-wide text-orange-500 transition duration-300 group-hover:text-orange-900 lg:text-5xl">
              PORTFOLIO
            </h1>
          </div>

          {/* Guide */}
          <div
            className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-orange-500"
            style={{
              display: `${showSeeMore ? "block" : "none"}`,
            }}
          >
            <div className="flex animate-bounce flex-col items-center gap-2">
              <Icon icon="lineicons:scroll-down-2" className="h-10 w-10" />
            </div>
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
          WebkitMaskImage: "linear-gradient(to right, black 85%, transparent)",
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
            className="group absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col"
            onClick={gamedevClicked}
          >
            <h2 className="flex w-full justify-between font-gugi text-2xl font-bold text-cyan-200 transition duration-300 group-hover:text-emerald-400">
              {"Game       Dev".split("").map((c, i) => (
                <span key={i}>{c}</span>
              ))}
            </h2>
            <h1 className="font-gugi text-4xl font-bold tracking-wide text-cyan-200 transition duration-300 group-hover:text-emerald-400 lg:text-5xl">
              PORTFOLIO
            </h1>
          </div>

          {/* Guide */}
          <div
            className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-cyan-200"
            style={{
              display: `${showSeeMore ? "block" : "none"}`,
            }}
          >
            <div className="flex animate-bounce flex-col items-center gap-2">
              <Icon icon="lineicons:scroll-down-2" className="h-10 w-10" />
            </div>
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
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%)",
          maskImage: "linear-gradient(to right, transparent, black 15%)",
        }}
      >
        <div
          className="fixed left-[3.5rem] top-0 h-full"
          style={{ width: "calc(100vw - 3.5rem)" }}
        >
          <div
            className="group absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col"
            onClick={illustrationClicked}
          >
            <h2 className="flex w-full justify-between font-gugi text-2xl font-normal text-white transition duration-300 group-hover:text-violet-300">
              {"Illustration".split("").map((c, i) => (
                <span key={i}>{c}</span>
              ))}
            </h2>
            <h1 className="font-gugi text-4xl font-bold tracking-wide text-white transition duration-300 group-hover:text-violet-300 lg:text-5xl">
              PORTFOLIO
            </h1>
          </div>

          {/* Guide */}
          <div
            className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-white"
            style={{
              display: `${showSeeMore ? "block" : "none"}`,
            }}
          >
            <div className="flex animate-bounce flex-col items-center gap-2">
              <Icon icon="lineicons:scroll-down-2" className="h-10 w-10" />
            </div>
          </div>

          <HomeParaArt />
        </div>
      </motion.div>
    </div>
  );
}
