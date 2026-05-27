import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useRef, useEffect } from "react";

import logo from "../assets/logo/Pog-logo.png";
import bg from "../assets/logo/Pog-bg.png";

//
// powerpoint import
//

const ppts = Object.entries(
  import.meta.glob("../assets/Pog/*.webp", {
    eager: true,
    import: "default",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, module]) => module);

import DeadAnimation from "../assets/Pog/Pog-DeadAni.png";
import ClimbAnimation from "../assets/Pog/Pog-ClimbAni.png";
import RunAnimation from "../assets/Pog/Pog-RunAni.png";
import GhostAnimation from "../assets/Pog/Pog-GhostAni.png";
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

export default function PathOfGhost() {
  const heroRef = useRef(null);

  // 取得 scroll progress
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  // scroll提示相關
  const hintsOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const hintsBlur = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const hintsFilter = useMotionTemplate`blur(${hintsBlur}px)`;

  return (
    <>
      <div className="relative ml-[3.5rem] overflow-hidden bg-black text-white">
        {/* HERO ANIMATION */}
        <section ref={heroRef} className="relative h-[110vh]">
          <div className="fixed left-14 top-0 min-h-dvh w-[calc(100vw-3.5rem)] overflow-hidden bg-cover bg-center">
            {/* DARK BG */}
            <div className="absolute inset-0 brightness-50">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${bg})`,
                }}
              />
            </div>

            {/* 下方提示 */}
            <motion.div
              style={{
                opacity: hintsOpacity,
                filter: hintsFilter,
              }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
              <div className="flex animate-bounce flex-col items-center gap-2">
                <span className="text-center font-gugi text-sm tracking-widest text-white">
                  向下滾動以瀏覽作品
                  <br />
                  Scroll to read more
                </span>
              </div>
            </motion.div>

            {/* 中央文字 */}
            <div className="absolute left-1/2 top-1/2 z-10 flex w-1/2 -translate-x-1/2 -translate-y-1/2 justify-center">
              <motion.img
                src={logo}
                className={"w-full object-contain"}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                }}
              />
            </div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section className="relative z-20">
          <div className="mx-auto max-w-6xl overflow-hidden px-6 pb-40">
            <div className="grid gap-10 md:grid-cols-1">
              <FadeUp>
                <iframe
                  src="https://www.youtube.com/embed/222H4_0xNIw?si=LRwQM2W3U8y1Ze8W"
                  title="YouTube video player"
                  className="aspect-video w-full rounded-3xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </FadeUp>

              <FadeUp>
                <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  <img
                    src={ppts[0]}
                    className="w-full object-cover transition duration-300"
                  />
                  <div className="absolute bottom-[10%] left-[8.6%] flex h-[28%] w-[28.9%] items-center justify-center">
                    <a
                      href="https://v3.globalgamejam.org/2021/games/temp-4"
                      target="_blank"
                      className="text-xs sm:text-sm lg:text-lg hover:text-ellipsiss animate-bounce rounded-md border border-black p-2 text-center tracking-widest text-black transition duration-300 hover:bg-black hover:text-white"
                    >
                      前往作品 GGJ 網頁
                    </a>
                  </div>
                </div>
              </FadeUp>

              <FadeUp>
                <div className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  {/* 整個 scene 一起 scale */}
                  <div className="absolute inset-0 transition duration-300 group-hover:scale-110">
                    {/* 背景 */}
                    <img src={ppts[1]} className="h-full w-full object-cover" />

                    {/* overlay */}
                    <div className="absolute inset-y-[10%] right-[10%] flex w-[15%] flex-col">
                      <img
                        src={DeadAnimation}
                        className="min-h-0 w-auto object-contain"
                        style={{ imageRendering: "pixelated" }}
                      />

                      <img
                        src={ClimbAnimation}
                        className="min-h-0 w-auto object-contain"
                        style={{ imageRendering: "pixelated" }}
                      />

                      <img
                        src={RunAnimation}
                        className="min-h-0 w-auto object-contain"
                        style={{ imageRendering: "pixelated" }}
                      />

                      <img
                        src={GhostAnimation}
                        className="min-h-0 w-auto object-contain"
                        style={{ imageRendering: "pixelated" }}
                      />
                    </div>
                  </div>
                </div>
              </FadeUp>

              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <img
                    src={ppts[2]}
                    className="w-full object-cover transition duration-300 group-hover:scale-110"
                  />
                </div>
              </FadeUp>

              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <img
                    src={ppts[3]}
                    className="w-full object-cover transition duration-300 group-hover:scale-110"
                  />
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <img
                    src={ppts[4]}
                    className="w-full object-cover transition duration-300 group-hover:scale-110"
                  />
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <img
                    src={ppts[5]}
                    className="w-full object-cover transition duration-300 group-hover:scale-110"
                  />
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <img
                    src={ppts[6]}
                    className="w-full object-cover transition duration-300 group-hover:scale-110"
                  />
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <img
                    src={ppts[7]}
                    className="w-full object-cover transition duration-300 group-hover:scale-110"
                  />
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <img
                    src={ppts[8]}
                    className="w-full object-cover transition duration-300 group-hover:scale-110"
                  />
                </div>
              </FadeUp>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
