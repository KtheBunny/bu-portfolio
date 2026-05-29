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
  import.meta.glob("../assets/other/pixel-*.webp", {
    eager: true,
    import: "default",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, module]) => module);

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
                <div className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  {/* 整個 scene 一起 scale */}
                  <div className="absolute inset-0">
                    {/* 背景 */}
                    <img
                      src={ppts[0]}
                      className="h-full w-full object-cover"
                    />

                    {/* overlay */}
                    <div className="absolute left-1/2 top-1/2 flex w-[61%] -translate-y-1/2 -translate-x-1/2 flex-row transition duration-300 group-hover:scale-[165%]">
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
                    <img
                      src={ppts[1]}
                      className="h-full w-full object-cover"
                    />

                    {/* overlay */}
                    <div className="absolute bottom-[10%] left-1/2 flex h-[80%] flex-row">
                      <img src={EminenceAni} className="h-full w-full object-contain" />
                    </div>
                  </div>
                </div>
              </FadeUp>

              <FadeUp>
                <div className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  {/* 整個 scene 一起 scale */}
                  <div className="absolute inset-0 transition duration-300 group-hover:scale-110">
                    <img
                      src={ppts[2]}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  {/* 整個 scene 一起 scale */}
                  <div className="absolute inset-0 transition duration-300 group-hover:scale-110">
                    <img
                      src={ppts[3]}
                      className="h-full w-full object-cover"
                    />
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
                    <img
                      src={ppts[4]}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  {/* 整個 scene 一起 scale */}
                  <div className="absolute inset-0 transition duration-300 group-hover:scale-110">
                    <img
                      src={ppts[5]}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </FadeUp>

              <FadeUp>
                <div className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  {/* 整個 scene 一起 scale */}
                  <div className="absolute inset-0 transition duration-300 group-hover:scale-110">
                    <img
                      src={ppts[6]}
                      className="h-full w-full object-cover"
                    />
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
