import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

import logo from "../assets/logo/Healter-logo.webp";
import bg1 from "../assets/other/bg-1-1.webp";
import bg2 from "../assets/other/bg-1-2.webp";
import bg3 from "../assets/other/bg-2.webp";
import bg4 from "../assets/other/bg-3.webp";
import bg5 from "../assets/other/bg-4.webp";
import bg6 from "../assets/other/bg-5.webp";

//
// Recommended portfolio import
//

import PixelButton from "./PortfolioFolderPixel";

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
    [0, 0.07, 0.1],
    [1, 1, 0],
  );

  const bg2Opacity = useTransform(
    scrollPageProgress,
    [0.07, 0.1, 0.25, 0.28],
    [0, 1, 1, 0],
  );

  const bg3Opacity = useTransform(
    scrollPageProgress,
    [0.25, 0.28, 0.47, 0.5],
    [0, 1, 1, 0],
  );

  const bg4Opacity = useTransform(
    scrollPageProgress,
    [0.47, 0.5, 0.62, 0.65],
    [0, 1, 1, 0],
  );

  const bg5Opacity = useTransform(
    scrollPageProgress,
    [0.62, 0.65, 0.77, 0.8],
    [0, 1, 1, 0],
  );

  const bg6Opacity = useTransform(scrollPageProgress, [0.77, 0.8], [0, 1]);

  const bgBlur = useTransform(
    scrollPageProgress,
    [0, 0.05, 0.9, 1],
    [0, 10, 10, 0],
  );
  const bgFilter = useMotionTemplate`blur(${bgBlur}px)`;

  return (
    <>
      <div className="relative ml-[3.5rem] overflow-hidden bg-white text-white">
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

              <motion.img
                src={bg5}
                style={{ opacity: bg5Opacity }}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <motion.img
                src={bg6}
                style={{ opacity: bg6Opacity }}
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
              <FadeUp>
                <div className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  {/* 整個 scene 一起 scale */}
                  <div className="absolute inset-0 transition duration-300 group-hover:scale-110">
                    <img src={ppts[4]} className="h-full w-full object-cover" />
                  </div>
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  {/* 整個 scene 一起 scale */}
                  <div className="absolute inset-0 transition duration-300 group-hover:scale-110">
                    <img src={ppts[5]} className="h-full w-full object-cover" />
                  </div>
                </div>
              </FadeUp>

              {/* 查看更多 */}
              <FadeUp>
                <div className="relative flex flex-col items-center justify-around rounded-3xl border bg-[#f0f0f0] p-6 text-black">
                  <span className="mb-6 font-gugi text-xl font-bold tracking-wide lg:text-2xl">
                    謝謝觀看，您可能會對這個作品集也有興趣
                  </span>
                  <div className="relative mb-14 flex w-full items-center justify-around">
                    <div className="grid w-full gap-14 text-black [grid-template-columns:repeat(auto-fit,max(320px,1fr))]">
                      <Link
                        to="/Works/PixelArt"
                        className="group mx-auto w-full max-w-sm cursor-pointer rounded-xl border border-black p-4 transition duration-300 hover:bg-zinc-900"
                      >
                        <div className="flex h-full flex-col items-center justify-between">
                          <div className="mb-6 w-full">
                            <h3 className="w-full text-sm font-semibold text-zinc-800 transition duration-300 group-hover:text-zinc-400">
                              像素風遊戲的各種美術素材
                            </h3>
                            <h2 className="my-3 w-full text-2xl font-semibold transition duration-300 group-hover:text-white">
                              Pixel Art 作品集
                            </h2>
                            <span className="w-full text-base font-semibold text-zinc-800 transition duration-300 group-hover:text-zinc-300">
                              整理了最近的像素動畫和遊戲美術素材作品。
                            </span>
                          </div>

                          <PixelButton />
                          <span className="mt-6 w-full text-right text-base font-semibold text-zinc-800 transition duration-300 group-hover:text-zinc-300">
                            立即查看 ➔
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <Link
                    to="/Works"
                    className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-black p-4 text-center text-base font-semibold text-zinc-800 transition duration-300 hover:bg-zinc-900 hover:text-white"
                  >
                    <Icon icon={"icon-park-solid:back"} />
                    回到作品列表
                  </Link>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
