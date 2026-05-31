import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo/Healter-logo.webp";

//
// Recommended portfolio import
//

import EminenceButton from "./PortfolioEminenceButton";
import PogButton from "./PortfolioPogButton";
import MoonwalkButton from "./PortfolioMoonwalkButton";

//
// powerpoint import
//

const ppts = Object.entries(
  import.meta.glob("../assets/other/pixel-*.webp", {
    eager: true,
    import: "default",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, module]) => module);

import dn1 from "../assets/other/dn-1.png";
import dn2 from "../assets/other/dn-2.png";
import EminenceAni from "../assets/Eminence/Eminence-CharaAni.png";

import CannonAnimation from "../assets/Moonwalk/CannonAni.png";
import BlackholeAnimation from "../assets/Moonwalk/BlackholeAni.png";
import CarrotAnimation from "../assets/Moonwalk/CarrotAni.png";
import AsteroidAnimation from "../assets/Moonwalk/AsteroidAni.png";
import BubbleAnimation from "../assets/Moonwalk/BubbleAni.png";

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

export default function Pixelart() {
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
      <div className="relative ml-[3.5rem] overflow-hidden bg-gray-600 text-white">
        {/* HERO ANIMATION */}
        <section ref={heroRef} className="relative h-[110vh]">
          <div className="fixed left-14 top-0 min-h-dvh w-[calc(100vw-3.5rem)] overflow-hidden bg-cover bg-center">
            <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col">
              <h2 className="flex w-full justify-between font-gugi text-2xl font-normal drop-shadow-lg">
                {"Pixel    Art".split("").map((c, i) => (
                  <span key={i}>{c}</span>
                ))}
              </h2>
              <h1 className="font-gugi text-4xl font-bold tracking-wide drop-shadow-lg lg:text-5xl">
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

            <div className="absolute left-1/2 top-1/2 flex w-1/2 -translate-x-1/2 -translate-y-1/2 justify-center lg:w-1/3">
              <motion.img
                src={dn1}
                className={"w-full object-contain"}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  type: "ease",
                  delay: 0.2,
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
                <div className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  {/* 整個 scene 一起 scale */}
                  <div className="absolute inset-0">
                    {/* 背景 */}
                    <img src={ppts[0]} className="h-full w-full object-cover" />

                    {/* overlay */}
                    <div className="absolute left-1/2 top-1/2 flex w-[61%] -translate-x-1/2 -translate-y-1/2 flex-row transition duration-300 group-hover:scale-[165%]">
                      <img src={dn2} className="h-full w-full object-contain" />
                    </div>
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
                    <div className="absolute bottom-[10%] left-1/2 flex h-[80%] flex-row">
                      <img
                        src={EminenceAni}
                        className="h-full w-full object-contain"
                      />
                    </div>
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
                    {/* overlay */}
                    <div className="absolute right-[4%] top-[10%] flex h-[80%] w-[10%] flex-col">
                      <img
                        src={CannonAnimation}
                        className="min-h-0 w-auto object-contain"
                      />
                    </div>
                    <div className="absolute right-[45%] top-[25%] flex h-[65%] w-[15%] flex-col">
                      <img
                        src={AsteroidAnimation}
                        className="min-h-0 w-auto object-contain"
                        style={{ imageRendering: "pixelated" }}
                      />
                      <img
                        src={BubbleAnimation}
                        className="min-h-0 w-auto object-contain"
                        style={{ imageRendering: "pixelated" }}
                      />
                      <img
                        src={CarrotAnimation}
                        className="min-h-0 w-auto object-contain"
                        style={{ imageRendering: "pixelated" }}
                      />
                    </div>
                    <div className="absolute bottom-[10%] right-[12%] flex w-[35%] flex-col">
                      <img
                        src={BlackholeAnimation}
                        className="min-h-0 w-auto object-contain"
                        style={{ imageRendering: "pixelated" }}
                      />
                    </div>
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

              <FadeUp>
                <div className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  {/* 整個 scene 一起 scale */}
                  <div className="absolute inset-0 transition duration-300 group-hover:scale-110">
                    <img src={ppts[6]} className="h-full w-full object-cover" />
                  </div>
                </div>
              </FadeUp>

              <FadeUp>
                <div className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  {/* 整個 scene 一起 scale */}
                  <div className="absolute inset-0 transition duration-300 group-hover:scale-110">
                    <img src={ppts[7]} className="h-full w-full object-cover" />
                  </div>
                </div>
              </FadeUp>

              {/* 查看更多 */}
              <FadeUp>
                <div className="relative flex flex-col items-center justify-around rounded-3xl border bg-[#f0f0f0] p-6 text-black">
                  <span className="mb-6 font-gugi text-xl font-bold tracking-wide lg:text-2xl">
                    謝謝觀看，下面可以詳細瀏覽個別作品
                  </span>
                  <div className="relative flex w-full items-center justify-around">
                    <div className="grid w-full grid-cols-1 gap-14 text-black md:grid-cols-2 lg:grid-cols-3">
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
                        to="/Works/PathOfGhost"
                        className="group w-full cursor-pointer rounded-xl border border-black p-4 transition duration-300 hover:bg-zinc-900"
                      >
                        <div className="flex h-full flex-col items-center justify-between">
                          <div className="mb-6 w-full">
                            <h3 className="w-full text-sm font-semibold text-zinc-800 transition duration-300 group-hover:text-zinc-400">
                              電腦遊戲 - GameJam 作品
                            </h3>
                            <h2 className="my-3 w-full text-2xl font-semibold transition duration-300 group-hover:text-white">
                              Path Of Ghost
                            </h2>
                            <span className="w-full text-base font-semibold text-zinc-800 transition duration-300 group-hover:text-zinc-300">
                              透過死亡和重生來解開重重機關的橫向捲軸解迷遊戲。
                            </span>
                          </div>

                          <PogButton />
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
