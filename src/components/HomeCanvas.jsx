import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function HomeCanvas() {
  const mouseX = useMotionValue(0.5); // normalized 0~1

  const left = useSpring(0.33, { stiffness: 120, damping: 20 });
  const right = useSpring(0.66, { stiffness: 120, damping: 20 });

  const leftPx = useTransform(left, v => v * window.innerWidth);
  const rightPx = useTransform(right, v => v * window.innerWidth);

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

      leftPx = useTransform(left, v => v * window.innerWidth);
      rightPx = useTransform(right, v => v * window.innerWidth);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      {/* Left Image */}
      <motion.div
        className="absolute top-0 left-0 h-full"
        style={{
          width: leftPx,
          backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSARy92buJi10IoE0rkPff3TSyea70gs6p_A&s')",
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
          backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5LyLOEgzHI_DUyT9ZZZ8f_2v5wxARxThc_g&s')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Right Image */}
      <motion.div
        className="absolute top-0 right-0 h-full"
        style={{
          width: (1 - right.get()) * window.innerWidth,
          backgroundImage: "url('https://moegirl.uk/images/b/ba/%E9%A6%99%E8%95%89%E5%90%9B%E9%AB%98%E6%B8%85.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Divider lines */}
      <motion.div
        className="absolute top-0 h-full w-[2px] bg-white"
        style={{ left: leftPx}}
      />

      <motion.div
        className="absolute top-0 h-full w-[2px] bg-white"
        style={{ left: rightPx}}
      />
    </div>
  );

}