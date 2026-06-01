import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo/Pog-logo.png";
import bg from "../assets/logo/Pog-bg.png";

//
// Recommended portfolio import
//

import PixelButton from "./PortfolioFolderPixel";
import EminenceButton from "./PortfolioEminenceButton";
import MoonwalkButton from "./PortfolioMoonwalkButton";

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
                  Scroll to see more
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
                      className="hover:text-ellipsiss animate-bounce rounded-md border border-black p-2 text-center text-xs tracking-widest text-black transition duration-300 hover:bg-black hover:text-white sm:text-sm lg:text-lg"
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

              {/* 查看更多 */}
              <FadeUp>
                <div className="relative flex flex-col items-center justify-around rounded-3xl border bg-[#f0f0f0] p-6 text-black">
                  <span className="mb-6 font-gugi text-xl font-bold tracking-wide lg:text-2xl">
                    謝謝觀看，您可能會對這些作品也有興趣
                  </span>
                  <div className="relative flex w-full items-center justify-around">
                    <div className="grid w-full grid-cols-1 gap-14 text-black md:grid-cols-2 lg:grid-cols-3">
                      <Link
                        to="/Works/PixelArt"
                        className="group w-full cursor-pointer rounded-xl border border-black p-4 transition duration-300 hover:bg-zinc-900"
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

                      <Link
                        to="/Works/Eminence"
                        className="group w-full cursor-pointer rounded-xl border border-black p-4 transition duration-300 hover:bg-zinc-900"
                      >
                        <div className="flex h-full flex-col items-center justify-between">
                          <div className="mb-6 w-full">
                            <h3 className="w-full text-sm font-semibold text-zinc-800 transition duration-300 group-hover:text-zinc-400">
                              電腦遊戲 - 畢業專題
                            </h3>
                            <h2 className="my-3 w-full text-2xl font-semibold transition duration-300 group-hover:text-white">
                              Eminence
                            </h2>
                            <span className="w-full text-base font-semibold text-zinc-800 transition duration-300 group-hover:text-zinc-300">
                              少女在陌生的星球和實驗室醒來，探索自己身世的橫向捲軸類銀河惡魔城遊戲。
                            </span>
                          </div>

                          <EminenceButton />
                          <span className="mt-6 w-full text-right text-base font-semibold text-zinc-800 transition duration-300 group-hover:text-zinc-300">
                            立即查看 ➔
                          </span>
                        </div>
                      </Link>

                      <Link
                        to="/Works/Moonwalk"
                        className="group w-full cursor-pointer rounded-xl border border-black p-4 transition duration-300 hover:bg-zinc-900"
                      >
                        <div className="flex h-full flex-col items-center justify-between">
                          <div className="mb-6 w-full">
                            <h3 className="w-full text-sm font-semibold text-zinc-800 transition duration-300 group-hover:text-zinc-400">
                              電腦遊戲 - SDL
                            </h3>
                            <h2 className="my-3 w-full text-2xl font-semibold transition duration-300 group-hover:text-white">
                              Moonwalk
                            </h2>
                            <span className="w-full text-base font-semibold text-zinc-800 transition duration-300 group-hover:text-zinc-300">
                              射擊隕石的同時要控制角色在畫面內的街機型小遊戲。
                            </span>
                          </div>

                          <MoonwalkButton />
                          <span className="mt-6 w-full text-right text-base font-semibold text-zinc-800 transition duration-300 group-hover:text-zinc-300">
                            立即查看 ➔
                          </span>
                        </div>
                      </Link>
                    </div>
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
