import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useRef, useEffect } from "react";

import FloatingItems from "./MoonwalkFloatingItems";

import logo from "../assets/logo/Moonwalk-logo.png";
import bg from "../assets/logo/Moonwalk-bg.png";

//
// powerpoint import
//

const ppts = Object.entries(
  import.meta.glob("../assets/Moonwalk/*.webp", {
    eager: true,
    import: "default",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, module]) => module);

import ShootAnimation from "../assets/Moonwalk/Moonwalk-ShootAni.png";
import DeadAnimation from "../assets/Moonwalk/Moonwalk-DeadAni.png";
import CannonAnimation from "../assets/Moonwalk/CannonAni.png";
import BlackholeAnimation from "../assets/Moonwalk/BlackholeAni.png";
import CarrotAnimation from "../assets/Moonwalk/CarrotAni.png";
import AsteroidAnimation from "../assets/Moonwalk/AsteroidAni.png";
import BubbleAnimation from "../assets/Moonwalk/BubbleAni.png";

import Fog1 from "../assets/Eminence/Eminence-Fog1.webm";
import Fog2 from "../assets/Eminence/Eminence-Fog2.webm";
import Parallax1 from "../assets/Eminence/Eminence-Para1.webm";
import Parallax2 from "../assets/Eminence/Eminence-Para2.webm";
import Decoration from "../assets/Eminence/Eminence-Deco.webm";
import Fog1Mp4 from "../assets/Eminence/Eminence-Fog1.mp4";
import Fog2Mp4 from "../assets/Eminence/Eminence-Fog2.mp4";
import Parallax1Mp4 from "../assets/Eminence/Eminence-Para1.mp4";
import Parallax2Mp4 from "../assets/Eminence/Eminence-Para2.mp4";
import DecorationMp4 from "../assets/Eminence/Eminence-Deco.mp4";

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

export default function Moonwalk() {
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
              <FloatingItems />
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
            <div className="absolute left-1/2 top-1/2 z-10 flex w-1/2 -translate-x-1/2 -translate-y-1/2 justify-center lg:w-1/3">
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
                  src="https://www.youtube.com/embed/se0cgF7GCdo?si=wC_s0rNkfuFI7kNZ"
                  title="YouTube video player"
                  className="aspect-video w-full rounded-3xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </FadeUp>

              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  <img
                    src={ppts[0]}
                    className="w-full object-cover transition duration-300 group-hover:scale-110"
                  />
                </div>
              </FadeUp>

              <FadeUp>
                <div className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  <img
                    src={ppts[1]}
                    className="w-full object-cover transition duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-y-[10%] right-[0%] flex w-auto flex-col transition duration-300 group-hover:scale-110">
                    <img
                      src={ShootAnimation}
                      className="min-h-0 w-auto object-contain"
                      style={{ imageRendering: "pixelated" }}
                    />
                    <img
                      src={DeadAnimation}
                      className="min-h-0 w-auto object-contain"
                      style={{ imageRendering: "pixelated" }}
                    />
                  </div>
                </div>
              </FadeUp>

              <FadeUp>
                <div className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <img
                    src={ppts[2]}
                    className="w-full object-cover transition duration-300 group-hover:scale-110"
                  />
                  <div className="absolute right-[4%] top-[10%] flex h-[80%] w-[10%] flex-col transition duration-300 group-hover:scale-110">
                    <img
                      src={CannonAnimation}
                      className="min-h-0 w-auto object-contain"
                    />
                  </div>
                  <div className="absolute right-[45%] top-[25%] flex h-[65%] w-[15%] flex-col transition duration-300 group-hover:scale-110">
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
                  <div className="absolute bottom-[10%] right-[12%] flex w-[35%] flex-col transition duration-300 group-hover:scale-110">
                    <img
                      src={BlackholeAnimation}
                      className="min-h-0 w-auto object-contain"
                      style={{ imageRendering: "pixelated" }}
                    />
                  </div>
                </div>
              </FadeUp>

              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <img
                    src={ppts[3]}
                    className="w-full object-cover transition duration-300 group-hover:scale-110"
                  />
                  <div className="absolute left-[5.7%] top-[10%] w-[45%] transition duration-300 group-hover:scale-110">
                    <img src={bg} className="min-h-0 w-auto object-contain" />
                  </div>
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
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
