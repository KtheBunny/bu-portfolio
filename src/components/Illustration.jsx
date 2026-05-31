import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useRef, useEffect } from "react";

import logo from "../assets/logo/Healter-logo.webp";
import bg1 from "../assets/other/bg-1.webp";
import bg2 from "../assets/other/bg-2.webp";
import bg3 from "../assets/other/bg-3.webp";
import bg4 from "../assets/other/bg-4.webp";

//
// powerpoint import
//

const ppts = Object.entries(
  import.meta.glob("../assets/other/illustration-*.webp", {
    eager: true,
    import: "default",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, module]) => module);

//
//  ppts module
//

const FadeUp = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      viewport={{
        once: false,
        amount: 0.2,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Illustration() {
  const pageRef = useRef(null);
  const heroRef = useRef(null);

  // hero scroll progress
  const { scrollYProgress: scrollHeroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  // page scroll progress
  const { scrollYProgress: scrollPageProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  // scroll提示相關
  const hintsOpacity = useTransform(scrollHeroProgress, [0, 1], [1, 0]);
  const hintsBlur = useTransform(scrollHeroProgress, [0, 1], [0, 10]);
  const hintsFilter = useMotionTemplate`blur(${hintsBlur}px)`;

  // bg相關
  const bg1Opacity = useTransform(
    scrollPageProgress,
    [0, 0.1, 0.25],
    [1, 1, 0],
  );

  const bg2Opacity = useTransform(
    scrollPageProgress,
    [0.1, 0.25, 0.35, 0.5],
    [0, 1, 1, 0],
  );

  const bg3Opacity = useTransform(
    scrollPageProgress,
    [0.35, 0.5, 0.65, 0.8],
    [0, 1, 1, 0],
  );

  const bg4Opacity = useTransform(scrollPageProgress, [0.65, 0.8], [0, 1]);

  const bgBlur = useTransform(
    scrollPageProgress,
    [0, 0.05, 0.9, 1],
    [0, 10, 10, 0],
  );
  const bgFilter = useMotionTemplate`blur(${bgBlur}px)`;

  return (
    <>
      <div className="relative ml-[3.5rem] overflow-hidden bg-white text-blue-950">
        {/* HERO ANIMATION */}
        <section ref={heroRef} className="relative h-[110vh]">
          <div className="fixed left-14 top-0 min-h-dvh w-[calc(100vw-3.5rem)] overflow-hidden bg-cover bg-center">
            <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col">
              <h2 className="flex w-full justify-between font-gugi text-2xl font-normal text-white">
                {"Illustration".split("").map((c, i) => (
                  <span key={i}>{c}</span>
                ))}
              </h2>
              <h1 className="font-gugi text-4xl font-bold tracking-wide text-white lg:text-5xl">
                PORTFOLIO
              </h1>
            </div>

            {/* 下方提示 */}
            <motion.div
              style={{
                opacity: hintsOpacity,
                filter: hintsFilter,
              }}
              className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
            >
              <div className="flex animate-bounce flex-col items-center gap-2">
                <span className="text-center font-gugi text-sm tracking-widest">
                  向下滾動以瀏覽作品
                  <br />
                  Scroll to see more
                </span>
              </div>
            </motion.div>

            <motion.div
              style={{
                opacity: hintsOpacity,
                filter: hintsFilter,
              }}
              className="absolute bottom-10 left-1/2 -z-[5] -translate-x-1/2"
            ></motion.div>
            {/* BG Layer */}
            <motion.div
              className="absolute inset-0 -z-10"
              style={{
                filter: bgFilter,
              }}
            >
              <motion.img
                src={bg1}
                style={{ opacity: bg1Opacity }}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <motion.img
                src={bg2}
                style={{ opacity: bg2Opacity }}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <motion.img
                src={bg3}
                style={{ opacity: bg3Opacity }}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <motion.img
                src={bg4}
                style={{ opacity: bg4Opacity }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section ref={pageRef} className="relative z-20">
          <div className="mx-auto max-w-6xl overflow-hidden px-6 pb-40">
            <div className="grid gap-10 md:grid-cols-1">
              <FadeUp>
                <div className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  {/* 整個 scene 一起 scale */}
                  <div className="absolute inset-0 transition duration-300 group-hover:scale-110">
                    {/* 背景 */}
                    <img src={ppts[0]} className="h-full w-full object-cover" />
                  </div>
                </div>
              </FadeUp>

              <FadeUp>
                <div className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  {/* 整個 scene 一起 scale */}
                  <div className="absolute inset-0 transition duration-300 group-hover:scale-110">
                    {/* 背景 */}
                    <img src={ppts[1]} className="h-full w-full object-cover" />
                  </div>
                </div>
              </FadeUp>

              <FadeUp>
                <div className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  {/* 整個 scene 一起 scale */}
                  <div className="absolute inset-0 transition duration-300 group-hover:scale-110">
                    <img src={ppts[2]} className="h-full w-full object-cover" />
                  </div>
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  {/* 整個 scene 一起 scale */}
                  <div className="absolute inset-0 transition duration-300 group-hover:scale-110">
                    <img src={ppts[3]} className="h-full w-full object-cover" />
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
