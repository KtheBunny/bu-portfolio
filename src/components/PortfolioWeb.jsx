import { motion, useTransform, useMotionTemplate } from "framer-motion";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

//
// Recommended portfolio import
//

import MoonwalkButton from "./PortfolioMoonwalkButton";
import IKHButton from "./PortfolioIkhtcgButton";
import HealterButton from "./PortfolioHealterButton";

//
// powerpoint import
//

const ppts = Object.entries(
  import.meta.glob("../assets/web/web-*.webp", {
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

export default function Web() {
  return (
    <>
      <div className="relative ml-[3.5rem] overflow-hidden bg-[#0f0f0f] text-white">
        {/* HERO ANIMATION */}
        <section className="relative h-[20vh]"></section>
        {/* PORTFOLIO */}
        <section className="relative z-20">
          <div className="mx-auto max-w-6xl overflow-hidden px-6 pb-40">
            <div className="grid gap-10 md:grid-cols-1">
              <FadeUp>
                <div className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  {/* 整個 scene 一起 scale */}
                  <div className="absolute inset-0 transition duration-300 group-hover:scale-110">
                    <img src={ppts[0]} className="h-full w-full object-cover" />
                  </div>
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  {/* 整個 scene 一起 scale */}
                  <div className="absolute inset-0 transition duration-300 group-hover:scale-110">
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
                  <div className="absolute inset-0">
                    {/* 背景 */}
                    <img src={ppts[5]} className="h-full w-full object-cover" />
                  </div>
                </div>
              </FadeUp>

              <FadeUp>
                <div className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  {/* 整個 scene 一起 scale */}
                  <div className="absolute inset-0 transition duration-300 group-hover:scale-110">
                    {/* 背景 */}
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
              <FadeUp>
                <div className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  {/* 整個 scene 一起 scale */}
                  <div className="absolute inset-0 transition duration-300 group-hover:scale-110">
                    <img src={ppts[8]} className="h-full w-full object-cover" />
                  </div>
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  {/* 整個 scene 一起 scale */}
                  <div className="absolute inset-0 transition duration-300 group-hover:scale-110">
                    <img src={ppts[9]} className="h-full w-full object-cover" />
                  </div>
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  {/* 整個 scene 一起 scale */}
                  <div className="absolute inset-0 transition duration-300 group-hover:scale-110">
                    <img
                      src={ppts[10]}
                      className="h-full w-full object-cover"
                    />
                  </div>
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

                      <Link
                        to="/Works/IKH-TCG"
                        className="group w-full cursor-pointer rounded-xl border border-black p-4 transition duration-300 hover:bg-zinc-900"
                      >
                        <div className="flex h-full flex-col items-center justify-between">
                          <div className="mb-6 w-full">
                            <h3 className="w-full text-sm font-semibold text-zinc-800 transition duration-300 group-hover:text-zinc-400">
                              Web APP - 網頁抽卡小遊戲
                            </h3>
                            <h2 className="my-3 w-full text-2xl font-semibold transition duration-300 group-hover:text-white">
                              伊香保-TCG
                            </h2>
                            <span className="w-full text-base font-semibold text-zinc-800 transition duration-300 group-hover:text-zinc-300">
                              收集伊香保人物卡片的網頁小遊戲。
                            </span>
                          </div>

                          <IKHButton />
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
