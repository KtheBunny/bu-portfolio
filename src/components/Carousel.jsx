import { useEffect, useRef, useState } from "react";
import { motion, useDragControls } from "framer-motion";

import photo1 from "../assets/photo1.webp";
import photo2 from "../assets/photo2.webp";
import photo3 from "../assets/photo3.webp";

export default function Gallery() {
  const containerRef = useRef(null);
  const rowRef = useRef(null);

  const [dragWidth, setDragWidth] = useState(0);
  const dragControls = useDragControls();

  useEffect(() => {
    const container = containerRef.current;
    const row = rowRef.current;

    if (!container || !row) return;

    const width = row.scrollWidth - container.offsetWidth;

    setDragWidth(width);
  }, []);

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-3">
        <div className="flex flex-col gap-3">
          <img
            src={photo2}
            draggable={false}
            className="pointer-events-none aspect-square w-full flex-1 select-none rounded object-cover"
          />
          <p className="mt-2 text-zinc-400">公司成員合照</p>
        </div>
        <div className="flex flex-col gap-3">
          <img
            src={photo3}
            draggable={false}
            className="pointer-events-none aspect-square w-full flex-1 select-none rounded object-cover"
          />
          <p className="mt-2 text-zinc-400">2024 MAIC 與組員作品前合照</p>
        </div>
        <div className="flex flex-col gap-3">
          <img
            src={photo1}
            draggable={false}
            className="pointer-events-none aspect-square w-full flex-1 select-none rounded object-cover"
          />
          <p className="mt-2 text-zinc-400">大學遊戲開發社擔任遊戲美術講師</p>
        </div>
      </div>

      {/* Mobile */}
      <div
        ref={containerRef}
        onPointerDown={(e) => dragControls.start(e)}
        className="lg:hidden"
      >
        <motion.div
          drag="x"
          dragControls={dragControls}
          dragListener={false}
          dragConstraints={{
            left: -dragWidth,
            right: 0,
          }}
        >
          <div
            ref={rowRef}
            className="pointer-events-none flex select-none gap-4"
          >
            <div className="flex w-96 shrink-0 flex-col gap-3">
              <img
                src={photo2}
                draggable={false}
                className="pointer-events-none aspect-square w-full select-none rounded"
              />
              <p className="mt-2 text-zinc-400">公司成員合照</p>
            </div>
            <div className="flex w-96 shrink-0 flex-col gap-3">
              <img
                src={photo3}
                draggable={false}
                className="pointer-events-none aspect-square w-full select-none rounded"
              />
              <p className="mt-2 text-zinc-400">2024 MAIC 與組員作品前合照</p>
            </div>
            <div className="flex w-96 shrink-0 flex-col gap-3">
              <img
                src={photo1}
                draggable={false}
                className="pointer-events-none aspect-square w-full select-none rounded"
              />
              <p className="mt-2 text-zinc-400">
                大學遊戲開發社擔任遊戲美術講師
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
