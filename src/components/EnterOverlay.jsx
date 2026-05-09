import { animate, motion, useMotionValue } from "framer-motion";

import { useEffect, useState } from "react";

import { usePageTransition } from "./PageTransitionContext";

export default function EnterOverlay() {
  const { completeEnter } = usePageTransition();

  const progress = useMotionValue(0);

  const [path, setPath] = useState("");

  useEffect(() => {
    progress.set(0);

    const unsubscribe = progress.on("change", (p) => {
      const y = 1000 - p * 1000;

      const curve = Math.sin(p * Math.PI) * 300;

      const newPath = `
          M0 ${y}
          Q500 ${y - curve} 1000 ${y}
          L1000 1000
          L0 1000
          Z
        `;

      setPath(newPath);
    });

    const controls = animate(progress, 1, {
      duration: 0.9,
      ease: [0.76, 0, 0.24, 1],

      onComplete() {
        completeEnter();
      },
    });

    return () => {
      unsubscribe();
      controls.stop();
    };
  }, []);

  return (
    <motion.svg
      className="pointer-events-none fixed inset-0 z-[9999] h-full w-full"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
    >
      <path fill="black" d={path} />
    </motion.svg>
  );
}
