import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useRef, useEffect } from "react";
import { ScrollParallax } from "react-just-parallax";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

import logo from "../assets/logo/Healter-logo.webp";
import card1 from "../assets/IKHTCG/card1.webp";
import card2 from "../assets/IKHTCG/card2.webp";
import card3 from "../assets/IKHTCG/card3.webp";
import card4 from "../assets/IKHTCG/card4.webp";
import card5 from "../assets/IKHTCG/card5.webp";
import card6 from "../assets/IKHTCG/card6.webp";

//
// Recommended portfolio import
//

import PixelButton from "./PortfolioFolderPixel";
import IllustrationButton from "./PortfolioFolderArt";
import HealterButton from "./PortfolioHealterButton";

//
// powerpoint import
//

const ppts = Object.entries(
  import.meta.glob("../assets/IKHTCG/IKHTCG*.webp", {
    eager: true,
    import: "default",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, module]) => module);

import cardDraw from "../assets/IKHTCG/CardDraw.mp4";
import function1 from "../assets/IKHTCG/CardFunction1.mp4";
import function3 from "../assets/IKHTCG/CardFunction3.mp4";

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

export default function IKHTCG() {
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

  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const overlayBlur = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const overlayFilter = useMotionTemplate`blur(${overlayBlur}px)`;

  return (
    <>
      <div className="relative ml-[3.5rem] overflow-hidden text-black">
        {/* HERO ANIMATION */}
        <section ref={heroRef} className="relative h-[150vh]">
          <motion.div
            className="fixed left-14 top-0 min-h-dvh w-[calc(100vw-3.5rem)] overflow-hidden bg-[radial-gradient(circle_at_center,#eaecee_0%,#c6d7ee_100%)] bg-cover bg-center"
            style={{
              filter: overlayFilter,
            }}
          >
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

            {/* 卡片 */}
            {/* F2 */}
            <div className="absolute left-[20%] top-[-40%] flex w-1/3 -translate-x-1/2 justify-center lg:w-1/4">
              <ScrollParallax
                strength={0.1}
                shouldPause={false}
                enableOnTouchDevice={true}
              >
                <motion.img
                  src={card6}
                  className={"w-full object-contain"}
                  initial={{
                    opacity: 0,
                    y: 100,
                  }}
                  animate={{
                    opacity: 1,
                    y: [0, -20, 0], // 上下浮動
                  }}
                  transition={{
                    opacity: {
                      duration: 0.5,
                      delay: 0.3,
                      type: "ease",
                    },
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                    },
                  }}
                />
              </ScrollParallax>
            </div>

            {/* ill */}
            <div className="absolute bottom-[40%] left-[10%] flex w-1/3 -translate-x-1/2 justify-center lg:w-1/4">
              <ScrollParallax
                strength={0.15}
                shouldPause={false}
                enableOnTouchDevice={true}
              >
                <motion.img
                  src={card3}
                  className={"w-full object-contain"}
                  initial={{
                    opacity: 0,
                    y: 100,
                  }}
                  animate={{
                    opacity: 1,
                    y: [0, -35, 0], // 上下浮動
                  }}
                  transition={{
                    opacity: {
                      duration: 0.5,
                      delay: 0.55,
                      type: "ease",
                    },
                    y: {
                      duration: 3.1,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                    },
                  }}
                />
              </ScrollParallax>
            </div>

            {/* 羊 */}
            <div className="absolute left-[70%] top-[-70%] flex w-1/3 -translate-x-1/2 justify-center lg:w-1/4">
              <ScrollParallax
                strength={0.14}
                shouldPause={false}
                enableOnTouchDevice={true}
              >
                <motion.img
                  src={card4}
                  className={"w-full object-contain"}
                  initial={{
                    opacity: 0,
                    y: 100,
                  }}
                  animate={{
                    opacity: 1,
                    y: [0, -25, 0], // 上下浮動
                  }}
                  transition={{
                    opacity: {
                      duration: 0.5,
                      delay: 0.5,
                      type: "ease",
                    },
                    y: {
                      duration: 2.9,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                    },
                  }}
                />
              </ScrollParallax>
            </div>

            {/* KK */}
            <div className="absolute bottom-[-10%] left-[30%] flex w-1/3 -translate-x-1/2 justify-center lg:w-1/4">
              <ScrollParallax
                strength={0.17}
                shouldPause={false}
                enableOnTouchDevice={true}
              >
                <motion.img
                  src={card2}
                  className={"w-full object-contain"}
                  initial={{
                    opacity: 0,
                    y: 100,
                  }}
                  animate={{
                    opacity: 1,
                    y: [0, -30, 0], // 上下浮動
                  }}
                  transition={{
                    opacity: {
                      duration: 0.5,
                      delay: 0.4,
                      type: "ease",
                    },
                    y: {
                      duration: 3.2,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                    },
                  }}
                />
              </ScrollParallax>
            </div>

            {/* AT */}
            <div className="absolute left-[90%] top-0 flex w-1/3 -translate-x-1/2 justify-center lg:w-1/4">
              <ScrollParallax
                strength={0.12}
                shouldPause={false}
                enableOnTouchDevice={true}
              >
                <motion.img
                  src={card5}
                  className={"w-full object-contain"}
                  initial={{
                    opacity: 0,
                    y: 100,
                  }}
                  animate={{
                    opacity: 1,
                    y: [0, -15, 0], // 上下浮動
                  }}
                  transition={{
                    opacity: {
                      duration: 0.5,
                      delay: 0.45,
                      type: "ease",
                    },
                    y: {
                      duration: 2.8,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                    },
                  }}
                />
              </ScrollParallax>
            </div>

            {/* F1 */}
            <div className="absolute bottom-[5%] left-[80%] flex w-1/3 -translate-x-1/2 justify-center lg:w-1/4">
              <ScrollParallax
                strength={0.15}
                shouldPause={false}
                enableOnTouchDevice={true}
              >
                <motion.img
                  src={card1}
                  className={"w-full object-contain"}
                  initial={{
                    opacity: 0,
                    y: 100,
                  }}
                  animate={{
                    opacity: 1,
                    y: [0, -25, 0], // 上下浮動
                  }}
                  transition={{
                    opacity: {
                      duration: 0.5,
                      delay: 0.35,
                      type: "ease",
                    },
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                    },
                  }}
                />
              </ScrollParallax>
            </div>

            {/* overlay */}
            <motion.div
              style={{
                opacity: overlayOpacity,
              }}
              className="absolute h-full w-full bg-black/20"
            />
          </motion.div>
        </section>

        {/* PORTFOLIO */}
        <section className="relative z-20">
          <div className="mx-auto max-w-6xl overflow-hidden px-6 pb-40">
            <div className="grid gap-10 md:grid-cols-1">
              <FadeUp>
                <div className="relative aspect-video overflow-hidden rounded-3xl border border-black/10 bg-white/5">
                  <img
                    src={ppts[0]}
                    className="w-full object-cover transition duration-300"
                  />
                  <div className="absolute bottom-[22%] left-[5.7%] flex w-[30%] items-center justify-center">
                    <a
                      href="https://ikh-tcg.vercel.app/"
                      target="_blank"
                      className="hover:text-ellipsiss animate-bounce rounded-md border border-[#3d3029] p-2 text-center text-xs tracking-widest text-[#3d3029] transition duration-300 hover:bg-[#3d3029] hover:text-white sm:text-sm lg:text-lg"
                    >
                      立即試玩
                    </a>
                  </div>
                </div>
              </FadeUp>

              <FadeUp>
                <div className="relative aspect-video overflow-hidden rounded-3xl border border-black/10 bg-white/5">
                  <div className="absolute inset-0">
                    <img src={ppts[1]} className="h-full w-full object-cover" />
                  </div>
                </div>
              </FadeUp>

              <FadeUp>
                <div className="relaive group aspect-video overflow-hidden rounded-3xl border border-black/10 bg-white/5 backdrop-blur-md">
                  <img src={ppts[2]} className="w-full object-cover" />
                  <div className="absolute inset-y-[10%] left-[5.7%] flex h-[80] w-[37%]">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="min-h-0 w-auto flex-1 object-contain"
                    >
                      <source src={cardDraw} type="video/mp4" />
                    </video>
                  </div>
                </div>
              </FadeUp>

              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-black/10 bg-white/5 backdrop-blur-md">
                  <img src={ppts[3]} className="w-full object-cover" />
                  <div className="absolute inset-y-[28%] right-[5.7%] flex h-[54%] w-[88.3%]">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="min-h-0 w-auto flex-1 object-contain"
                    >
                      <source src={function1} type="video/mp4" />
                    </video>
                    <div className="min-h-0 w-auto flex-1" />
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="min-h-0 w-auto flex-1 object-contain"
                    >
                      <source src={function3} type="video/mp4" />
                    </video>
                  </div>
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-black/10 bg-white/5 backdrop-blur-md">
                  <img src={ppts[4]} className="w-full object-cover" />
                </div>
              </FadeUp>
              <FadeUp>
                <div className="relative aspect-video overflow-hidden rounded-3xl border border-black/10 bg-white/5 backdrop-blur-md">
                  <img src={ppts[5]} className="w-full object-cover" />
                </div>
              </FadeUp>

              {/* 查看更多 */}
              <FadeUp>
                <div className="relative flex flex-col items-center justify-around rounded-3xl border bg-[#f0f0f0] p-6 text-black">
                  <span className="mb-6 font-gugi text-xl font-bold tracking-wide lg:text-2xl">
                    謝謝觀看，您可能會對這些作品也有興趣
                  </span>
                  <div className="relative mb-14 flex w-full items-center justify-around">
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
                        to="/Works/Illustration"
                        className="group w-full cursor-pointer rounded-xl border border-black p-4 transition duration-300 hover:bg-zinc-900"
                      >
                        <div className="flex h-full flex-col items-center justify-between">
                          <div className="mb-6 w-full">
                            <h3 className="w-full text-sm font-semibold text-zinc-800 transition duration-300 group-hover:text-zinc-400">
                              個人及委託的日系繪圖作品
                            </h3>
                            <h2 className="my-3 w-full text-2xl font-semibold transition duration-300 group-hover:text-white">
                              繪畫相關作品集
                            </h2>
                            <span className="w-full text-base font-semibold text-zinc-800 transition duration-300 group-hover:text-zinc-300">
                              整理了最近的繪圖作品。
                            </span>
                          </div>

                          <IllustrationButton />
                          <span className="mt-6 w-full text-right text-base font-semibold text-zinc-800 transition duration-300 group-hover:text-zinc-300">
                            立即查看 ➔
                          </span>
                        </div>
                      </Link>

                      <Link
                        to="/Works/Healter"
                        className="group w-full cursor-pointer rounded-xl border border-black p-4 transition duration-300 hover:bg-zinc-900"
                      >
                        <div className="flex h-full flex-col items-center justify-between">
                          <div className="mb-6 w-full">
                            <h3 className="w-full text-sm font-semibold text-zinc-800 transition duration-300 group-hover:text-zinc-400">
                              iOS APP - MAIC決賽入圍作品
                            </h3>
                            <h2 className="my-3 w-full text-2xl font-semibold transition duration-300 group-hover:text-white">
                              Healter
                            </h2>
                            <span className="w-full text-base font-semibold text-zinc-800 transition duration-300 group-hover:text-zinc-300">
                              針對現代文明病、微笑憂鬱症等的人性化處理憂鬱情緒APP。
                            </span>
                          </div>

                          <HealterButton />
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
