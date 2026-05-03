import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function HomeCanvas() {
  const mouseX = useMotionValue(0.5); // normalized 0~1

  const left = useSpring(0.33, { stiffness: 120, damping: 20 });
  const right = useSpring(0.66, { stiffness: 120, damping: 20 });

  const leftPx = useTransform(left, (v) => v * window.innerWidth);
  const rightPx = useTransform(right, (v) => v * window.innerWidth);

  useEffect(() => {
    const handleMove = (e) => {
      const x = e.clientX / window.innerWidth;
      mouseX.set(x);

      console.log(x);
      // 控制兩條分隔線位置
      // 讓中間圖片在中間時最大
      const l = Math.max(0.05, Math.min(0.45, x * 0.6));
      const r = Math.min(0.95, Math.max(0.55, 0.4 + x * 0.6));

      left.set(l);
      right.set(r);

      leftPx = useTransform(left, (v) => v * window.innerWidth);
      rightPx = useTransform(right, (v) => v * window.innerWidth);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Left Image */}
      <motion.div
        className="absolute left-0 top-0 h-full"
        style={{
          width: leftPx,
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
          left: left.get() * window.innerWidth,
          width: (right.get() - left.get()) * window.innerWidth,
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
          width: (1 - right.get()) * window.innerWidth,
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
