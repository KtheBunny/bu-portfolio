import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useEffect, useRef } from "react";

import { MouseParallax } from "react-just-parallax";

import HomeParaArt from "./HomeParaArt";
import HomeParaGame from "./HomeParaGame";
import HomeParaUI from "./HomeParaUI";

export default function HomeCanvas() {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const currentX = useRef(0.5); // normalized 0~1

  const mouseX = useMotionValue(0.5); // normalized 0~1

  const left = useSpring(0.33, { stiffness: 120, damping: 20 });
  const right = useSpring(0.66, { stiffness: 120, damping: 20 });

  const updateSeparators = (x) => {
    let l, r;
    if (x < 0.33) {
      l = 0.8;
      r = 0.9;
    } else if (x >= 0.33 && x <= 0.66) {
      l = 0.1;
      r = 0.9;
    } else {
      l = 0.1;
      r = 0.2;
    }
    left.set(l);
    right.set(r);
  };

  const leftPx = useTransform(left, (v) => v * containerWidth - 200);
  const rightPx = useTransform(right, (v) => v * containerWidth);
  const leftWidth = useTransform(left, (v) => v * containerWidth);
  const midWidth = useTransform(
    [left, right],
    ([l, r]) => (r - l) * containerWidth + 400,
  );
  const rightWidth = useTransform(right, (v) => (1 - v) * containerWidth);
  const centerX = useTransform(leftPx, (v) => `calc(50vw - ${v}px)`);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.getBoundingClientRect().width);
    }

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.getBoundingClientRect().width);
      }
      updateSeparators(currentX.current);
    };

    const handleMove = (e) => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.getBoundingClientRect().width);
      }
      const rect = containerRef.current.getBoundingClientRect(); // 獲取容器的位置和尺寸

      const relativeX = e.clientX - rect.left; // 滑鼠 x 減去容器左邊緣
      const x = Math.max(0, Math.min(1, relativeX / rect.width)); // 歸一化到 0-1，確保不超出範圍

      currentX.current = x;
      mouseX.set(x);
      updateSeparators(x);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="home-canvas-container relative h-screen w-screen overflow-hidden"
      style={{
        left: "3.5rem",
        width: "calc(100vw - 3.5rem)",
      }}
    >
      {/* Left Part */}
      <motion.div
        className="absolute left-0 top-0 z-10 h-full overflow-hidden"
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
          <div className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col">
            <h2 className="flex w-full justify-between font-gugi text-2xl font-bold text-cyan-200">
              {"Game       Dev".split("").map((c, i) => (
                <span key={i}>{c}</span>
              ))}
            </h2>
            <h1 className="font-gugi text-5xl font-bold tracking-wide text-cyan-200">
              PORTFOLIO
            </h1>
          </div>

          <HomeParaGame />
        </div>
      </motion.div>

      {/* Middle Part */}
      <motion.div
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
          <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col">
            <h2 className="flex w-full justify-between font-gugi text-2xl font-bold text-orange-500">
              {"UI/UX   Design".split("").map((c, i) => (
                <span key={i}>{c}</span>
              ))}
            </h2>
            <h1 className="font-gugi text-5xl font-bold tracking-wide text-orange-500">
              PORTFOLIO
            </h1>
          </div>

          <HomeParaUI />
        </div>
      </motion.div>

      {/* Right Part */}
      <motion.div
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
          <div className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col">
            <h2 className="flex w-full justify-between font-gugi text-2xl font-normal text-white">
              {"Illustration".split("").map((c, i) => (
                <span key={i}>{c}</span>
              ))}
            </h2>
            <h1 className="font-gugi text-5xl font-bold tracking-wide text-white">
              PORTFOLIO
            </h1>
          </div>

          <HomeParaArt />
        </div>
      </motion.div>
    </div>
  );
}
