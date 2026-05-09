import {
  motion,
  useMotionValue,
  animate,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useState } from "react";
import { usePageTransition } from "./PageTransitionContext.jsx";

import EnterOverlay from "./EnterOverlay.jsx";
import ExitOverlay from "./ExitOverlay.jsx";

export default function TransitionOverlay() {
  const { phase } = usePageTransition();

  return (
    <AnimatePresence mode="wait">
      {phase === "enter" && <EnterOverlay key="enter" />}

      {phase === "exit" && <ExitOverlay key="exit" />}
    </AnimatePresence>
  );

  {
    /*

    const { isTransitioning, completeTransition } = usePageTransition();
    
    const progress = useMotionValue(0);

  const [path, setPath] = useState("");

  useEffect(() => {
    if (!isTransitioning) return;

    progress.set(0);

    const unsubscribe = progress.on("change", (p) => {
      const y = 1000 - p * 1000;

      // 中間額外隆起
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
        completeTransition();
      },
    });

    return () => {
      unsubscribe;
      controls.stop();
    };
  }, [isTransitioning]);

  return (
    <>
      {/* <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ y: "100%", opacity: "0%" }}
          animate={{ y: "0%", opacity: "100%" }}
          exit={{ y: "-100%", opacity: "0%" }}
          transition={{
            duration: 0.5,
            type: "tween",
          }}
          className="pointer-events-none fixed inset-0 z-[9999] bg-gradient-to-b from-gray-900 to-gray-800"
        />
      )}
    </AnimatePresence>
      {isTransitioning && (
        <svg
          className="fixed inset-0 z-[9999] h-full w-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
        >
          <path fill="black" d={path} />
        </svg>
      )}
    </>
  );
  */
  }
}
