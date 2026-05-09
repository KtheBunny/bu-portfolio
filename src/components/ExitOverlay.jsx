import { animate, useMotionValue } from "framer-motion";

import { useEffect, useState } from "react";

import { usePageTransition } from "./PageTransitionContext";

export default function ExitOverlay() {
  const { completeExit } = usePageTransition();

  const progress = useMotionValue(0);

  const [path, setPath] = useState(`
  M0 0
  L1000 0
  L1000 1000
  Q500 1000 0 1000
  Z
`);

  useEffect(() => {
    progress.set(0);

    const unsubscribe = progress.on("change", (p) => {
      const topY = -p * 1000;

      const bottomY = 1000 - p * 1000;

      const curve = Math.sin(p * Math.PI) * 300;

      const newPath = `
    M0 ${topY}
    L1000 ${topY}

    L1000 ${bottomY}

    Q500 ${bottomY - curve}
    0 ${bottomY}

    Z
  `;

      setPath(newPath);
    });

    const controls = animate(progress, 1, {
      duration: 0.9,
      ease: [0.76, 0, 0.24, 1],

      onComplete() {
        completeExit();
      },
    });

    return () => {
      unsubscribe();
      controls.stop();
    };
  }, []);

  return (
    <svg
      className="pointer-events-none fixed inset-0 z-[9999] h-full w-full"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
    >
      <path fill="black" d={path} />
    </svg>
  );
}
