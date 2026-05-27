import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useRef, useEffect } from "react";

import logo from "../assets/logo/Healter-logo.webp";

//
// powerpoint import
//

const ppts = Object.entries(
  import.meta.glob("../assets/Healter/*.webp", {
    eager: true,
    import: "default",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, module]) => module);

import function1 from "../assets/Healter/Healter-function1.webm";
import function1Mp4 from "../assets/Healter/Healter-function1.mp4";
import function2 from "../assets/Healter/Healter-function2.webm";
import function2Mp4 from "../assets/Healter/Healter-function2.mp4";
import function3 from "../assets/Healter/Healter-function3.webm";
import function3Mp4 from "../assets/Healter/Healter-function3.mp4";
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

export default function Healter() {
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
      <div className="relative ml-[3.5rem] overflow-hidden bg-white text-[#330c00]">
        {/* HERO ANIMATION */}
        <section ref={heroRef} className="relative h-[110vh]">
          <div className="fixed left-14 top-0 min-h-dvh w-[calc(100vw-3.5rem)] overflow-hidden bg-cover bg-center">
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
                  Scroll to read more
                </span>
              </div>
            </motion.div>

            {/* 右下兔子 */}
            <div className="absolute bottom-0 left-3/4 flex w-1/2 -translate-x-1/2 justify-center lg:w-1/3">
              <motion.img
                src={logo}
                className={"w-full object-contain"}
                initial={{
                  opacity: 0,
                  y: 1000,
                }}
                animate={{
                  opacity: 1,
                  y: 150,
                }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 18,
                  delay: 0.5,
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
                  src="https://www.youtube.com/embed/9U8CLFAh82Q?si=q4CiWrLMBlSWakSa"
                  title="YouTube video player"
                  className="aspect-video w-full rounded-3xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </FadeUp>

              <FadeUp>
                <div className="relative aspect-video overflow-hidden rounded-3xl border border-black/10 bg-white/5">
                  <img
                    src={ppts[0]}
                    className="w-full object-cover transition duration-300"
                  />
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
                <div className="group aspect-video overflow-hidden rounded-3xl border border-black/10 bg-white/5 backdrop-blur-md">
                  <img src={ppts[2]} className="w-full object-cover" />
                </div>
              </FadeUp>

              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-black/10 bg-white/5 backdrop-blur-md">
                  <img src={ppts[3]} className="w-full object-cover" />
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
                  <div className="absolute bottom-[11%] left-[5.7%] flex w-[41.3%] items-center justify-center">
                    <a
                      href="https://www.realtimecolors.com/?colors=330c00-faf7f5-fec99a-f9dbc3-ffb7a8&fonts=Poppins-Poppins"
                      target="_blank"
                      className="text-xs sm:text-sm lg:text-lg hover:text-ellipsiss rounded-md border border-[#330c00] p-1 md:p-2 text-center tracking-widest text-[#330c00] transition duration-300 hover:bg-[#330c00] hover:text-white"
                    >
                      查看配色網頁
                    </a>
                  </div>
                  <div className="absolute bottom-[11%] right-[5.7%] flex w-[41.3%] items-center justify-center gap-4">
                    <a
                      href="https://www.figma.com/proto/gOxQ3caVaHvmD5RxifTlT0/Healter-Prototype?node-id=0-1&t=DKJe3cDd2Sg5hA4Q-1"
                      target="_blank"
                      className="text-xs sm:text-sm lg:text-lg hover:text-ellipsiss rounded-md border border-[#330c00] p-1 md:p-2 text-center tracking-widest text-[#330c00] transition duration-300 hover:bg-[#330c00] hover:text-white"
                    >
                      試玩 Prototype
                    </a>
                    <a
                      href="https://www.figma.com/design/gOxQ3caVaHvmD5RxifTlT0/Healter-Prototype?node-id=0-1&m=dev&t=DKJe3cDd2Sg5hA4Q-1"
                      target="_blank"
                      className="hidden md:block text-xs sm:text-sm lg:text-lg hover:text-ellipsiss rounded-md border border-[#330c00] p-1 md:p-2 text-center tracking-widest text-[#330c00] transition duration-300 hover:bg-[#330c00] hover:text-white"
                    >
                      查看 Figma 檔
                    </a>
                  </div>
                </div>
              </FadeUp>

              <FadeUp>
                <iframe
                  width="100%"
                  height="100%"
                  src="https://embed.figma.com/design/gOxQ3caVaHvmD5RxifTlT0/Healter-Prototype?node-id=0-1&embed-host=share"
                  className="aspect-video w-full rounded-3xl"
                ></iframe>
              </FadeUp>

              <FadeUp>
                <div className="relative aspect-video overflow-hidden rounded-3xl border border-black/10 bg-white/5 backdrop-blur-md">
                  <img src={ppts[6]} className="w-full object-cover" />
                  <div className="absolute inset-y-[25%] right-[5.7%] flex h-[50%] w-[88.3%]">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="min-h-0 w-auto flex-1 object-contain"
                    >
                      <source src={function1} type="video/webm" />
                      <source src={function1Mp4} type="video/mp4" />
                    </video>
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="min-h-0 w-auto flex-1 object-contain"
                    >
                      <source src={function2} type="video/webm" />
                      <source src={function2Mp4} type="video/mp4" />
                    </video>
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="min-h-0 w-auto flex-1 object-contain"
                    >
                      <source src={function3} type="video/webm" />
                      <source src={function3Mp4} type="video/mp4" />
                    </video>
                  </div>
                </div>
              </FadeUp>
              <FadeUp>
                <div className="aspect-video overflow-hidden rounded-3xl border border-black/10 bg-white/5 backdrop-blur-md">
                  <img src={ppts[7]} className="w-full object-cover" />
                </div>
              </FadeUp>
              <FadeUp>
                <div className="aspect-video overflow-hidden rounded-3xl border border-black/10 bg-white/5 backdrop-blur-md">
                  <img src={ppts[8]} className="w-full object-cover" />
                </div>
              </FadeUp>
              <FadeUp>
                <div className="aspect-video overflow-hidden rounded-3xl border border-black/10 bg-white/5 backdrop-blur-md">
                  <img src={ppts[9]} className="w-full object-cover" />
                </div>
              </FadeUp>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
