import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function HomeCanvas() {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0)

  const mouseX = useMotionValue(0.5); // normalized 0~1

  const left = useSpring(0.33, { stiffness: 120, damping: 20 });
  const right = useSpring(0.66, { stiffness: 120, damping: 20 });

  const leftPx = useTransform(left, (v) => v * containerWidth);
  const rightPx = useTransform(right, (v) => v * containerWidth);

  const leftWidth = useTransform(left, (v) => v * containerWidth);
  const midWidth = useTransform([left, right], ([l, r]) => (r - l) * containerWidth);
  const rightWidth = useTransform(right, (v) => (1 - v) * containerWidth);

  useEffect(() => {
    const handleMove = (e) => {
      const container = containerRef.current;
      setContainerWidth(containerRef.current.getBoundingClientRect().width);
      const rect = container.getBoundingClientRect();  // 獲取容器的位置和尺寸

      const relativeX = e.clientX - rect.left;  // 滑鼠 x 減去容器左邊緣
      const x = Math.max(0, Math.min(1, relativeX / rect.width));  // 歸一化到 0-1，確保不超出範圍
      mouseX.set(x);

      // 控制兩條分隔線位置
      let l, r;
      // 在左邊時
      if (x < 0.33) {
        //r在最右 0.95-0.9
        //l在右 0.9-0.85
        l = 0.8;
        r = 0.9;
      }
      // 在中間時
      else if(x>=0.33 && x <= 0.66) {
        //r在0.8-0.85
        //l在0.2-0.25
        l = 0.1;
        r = 0.9;
      }
      // 在右邊時
      else {
        //r在左 0.1-0.15
        //l在最左 0.05-0.1
        l = 0.1;
        r = 0.2;
      }
      //const l = Math.max(0.05, Math.min(0.45, x * 0.6));
      //const r = Math.min(0.95, Math.max(0.55, 0.4 + x * 0.6));

      left.set(l);
      right.set(r);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div 
    ref={containerRef}
    className="relative h-screen w-screen overflow-hidden home-canvas-container"
    style={{ 
    left: '3.5rem',  // 向右偏移 navBar 的寬度
    width: 'calc(100vw - 3.5rem)'  // 寬度減去 navBar 的寬度
  }}
    >
      {/* Left Image */}
      <motion.div
        className="absolute left-0 top-0 h-full"
        style={{
          width: leftWidth,
          backgroundImage:
            "url('https://pbs.twimg.com/media/Gwx9TqXbsAAczsJ?format=jpg&name=large')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Middle Image */}
      <motion.div
        className="absolute top-0 h-full"
        style={{
          left: leftPx,
          width: midWidth,
          backgroundImage:
            "url('https://pbs.twimg.com/media/G5I_zoNasAAJql_?format=jpg&name=large')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Right Image */}
      <motion.div
        className="absolute right-0 top-0 h-full"
        style={{
          width: rightWidth,
          backgroundImage:
            "url('https://pbs.twimg.com/media/G79dW35agAcWrP0?format=jpg&name=4096x4096')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Divider lines */}
      <motion.div
        className="absolute top-0 h-full w-[2px] bg-white"
        style={{ left: leftPx }}
      />

      <motion.div
        className="absolute top-0 h-full w-[2px] bg-white"
        style={{ left: rightPx }}
      />
    </div>
  );
}
