import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo/Eminence-logo.png";
import bg1 from "../assets/logo/Eminence-bg1.png";

//
// Recommended portfolio import
//

import PixelButton from "./PortfolioFolderPixel";
import PogButton from "./PortfolioPogButton";
import MoonwalkButton from "./PortfolioMoonwalkButton";

//
// frames import
//

const frameModules = import.meta.glob("../assets/frames/WakeUp*.png", {
  eager: true,
  import: "default",
});

const excluded = ["0007", "0008", "0009", "0010"];

const frames = Object.entries(frameModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .filter(([path]) => {
    return !excluded.some((id) => path.includes(id));
  })
  .map(([, module]) => module);

const TOTAL_FRAMES = 28;

//
// powerpoint import
//

const ppts = Object.entries(
  import.meta.glob("../assets/Eminence/*.webp", {
    eager: true,
    import: "default",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, module]) => module);

import AllCharacterAnimation from "../assets/Eminence/Eminence-CharaAni.png";
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

export default function Eminence() {
  const heroRef = useRef(null);
  const imagesRef = useRef([]);
  const canvasRef = useRef(null);
  const currentFrameRef = useRef(0);
  const sizeRef = useRef({
    width: 0,
    height: 0,
  });

  // 取得 scroll progress
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  //
  // 0~1 => frame index
  //
  const frameIndex = useTransform(
    scrollYProgress,
    [0, 0.75],
    [0, TOTAL_FRAMES - 1],
  );

  //
  // preload images
  //
  useEffect(() => {
    const images = [];

    frames.forEach((src) => {
      const img = new Image();

      img.src = src;

      images.push(img);
    });

    imagesRef.current = images;
  }, []);

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const rect = canvas.getBoundingClientRect();

    if (
      rect.width === sizeRef.current.width &&
      rect.height === sizeRef.current.height
    ) {
      return;
    }

    const width = rect.width;
    const height = rect.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    context.setTransform(1, 0, 0, 1, 0, 0);

    context.scale(dpr, dpr);

    context.imageSmoothingEnabled = false;
  };

  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) return;

    const image = imagesRef.current[index];

    if (!image) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    context.clearRect(0, 0, width, height);

    const scale = Math.max(width / image.width, height / image.height);

    const x = width / 2 - (image.width / 2) * scale;

    const y = height / 2 - (image.height / 2) * scale;

    context.drawImage(image, x, y, image.width * scale, image.height * scale);
  };

  //
  // scroll update
  //
  useMotionValueEvent(frameIndex, "change", (latest) => {
    const frame = Math.floor(latest);

    currentFrameRef.current = frame;

    drawFrame(frame);
  });

  //
  // first frame
  //
  useEffect(() => {
    let resizeTimer;

    setupCanvas();

    const firstImage = imagesRef.current[0];
    if (!firstImage) return;
    firstImage.onload = () => {
      drawFrame(0);
    };

    const handleResize = () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        setupCanvas();
        drawFrame(currentFrameRef.current);
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ----------------------

  const blurValue = useTransform(scrollYProgress, [0, 0.85, 1], [0, 0, 16]);
  const filterValue = useMotionTemplate`blur(${blurValue}px)`;

  const scaleValue = useTransform(scrollYProgress, [0, 0.8, 0.9], [1, 1, 1.08]);

  // scroll提示相關
  const hintsOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);
  const hintsBlur = useTransform(scrollYProgress, [0, 0.04], [0, 10]);
  const hintsFilter = useMotionTemplate`blur(${hintsBlur}px)`;

  // logo相關
  const logoOpacity = useTransform(scrollYProgress, [0, 0.8, 0.9], [0, 0, 1]);

  // 角色相關
  const characterScale = useTransform(scrollYProgress, [0, 0.75], [1.2, 1]);
  const characterY = useTransform(scrollYProgress, [0, 0.75], [-200, 0]);

  // 第一個背景圖相關
  const bg1Opacity = useTransform(scrollYProgress, [0, 0.5, 0.9], [0, 0, 1]);

  return (
    <>
      <div className="relative ml-[3.5rem] overflow-hidden bg-black text-white">
        {/* HERO ANIMATION */}
        <section ref={heroRef} className="relative h-[300vh]">
          <div
            className="fixed top-0 min-h-dvh overflow-hidden bg-black"
            style={{ left: "3.5rem", width: "calc(100vw - 3.5rem)" }}
          >
            <motion.div
              style={{
                opacity: hintsOpacity,
                filter: hintsFilter,
              }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
              <div className="flex animate-bounce flex-col items-center gap-2">
                <span className="text-center font-gugi text-sm tracking-widest text-white">
                  向下滾動以起來
                  <br />
                  Scroll to wake up
                </span>
              </div>
            </motion.div>

            <motion.div
              style={{
                scale: characterScale,
                filter: filterValue,
                y: characterY,
              }}
              className="absolute inset-0"
            >
              <motion.img
                src={bg1}
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                  opacity: bg1Opacity,
                  imageRendering: "pixelated",
                }}
              />
              <canvas
                ref={canvasRef}
                className="z-1 absolute h-full w-full"
                style={{ imageRendering: "pixelated" }}
              />
            </motion.div>

            {/* 中央文字 */}
            <div className="absolute z-10 flex h-full w-full flex-col items-center justify-center">
              <motion.img
                src={logo}
                className={"w-1/2 lg:w-1/3"}
                style={{ opacity: logoOpacity }}
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
                  src="https://www.youtube.com/embed/YxCVZVR6xT4?si=7Ibymi1PXo8_QdAc"
                  title="YouTube video player"
                  className="aspect-video w-full rounded-3xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </FadeUp>

              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <img
                    src={ppts[0]}
                    className="w-full object-cover transition duration-300 group-hover:scale-110"
                  />
                </div>
              </FadeUp>

              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <img
                    src={ppts[1]}
                    className="w-full object-cover transition duration-300 group-hover:scale-110"
                  />
                  <img
                    src={AllCharacterAnimation}
                    className="absolute left-1/2 top-1/2 z-10 w-2/5 -translate-x-1/2 -translate-y-1/2 object-cover transition duration-300 group-hover:scale-150"
                    style={{ imageRendering: "pixelated" }}
                  />
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

              <FadeUp>
                <div className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  {/* 整個 scene 一起 scale */}
                  <div className="absolute inset-0 transition duration-300 group-hover:scale-110">
                    {/* 背景 */}
                    <img src={ppts[9]} className="h-full w-full object-cover" />

                    {/* overlay */}
                    <div className="absolute inset-y-[10%] right-[5.7%] flex h-[80%] w-[40%] flex-col">
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="min-h-0 w-auto flex-1 object-cover"
                      >
                        <source src={Parallax1} type="video/webm" />
                        <source src={Parallax1Mp4} type="video/mp4" />
                      </video>
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="min-h-0 w-auto flex-1 object-cover"
                      >
                        <source src={Parallax2} type="video/webm" />
                        <source src={Parallax2Mp4} type="video/mp4" />
                      </video>
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
                      src={ppts[10]}
                      className="h-full w-full object-cover"
                    />

                    {/* overlay */}
                    <div className="absolute inset-x-[5.7%] top-1/2 flex w-[88.6%] -translate-y-1/2 flex-row">
                      <div className="flex-1">
                        <video
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="h-full w-full object-cover"
                        >
                          <source src={Fog1} type="video/webm" />
                          <source src={Fog1Mp4} type="video/mp4" />
                        </video>
                      </div>
                      <div className="flex-1">
                        <video
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="h-full w-full object-cover"
                        >
                          <source src={Fog2} type="video/webm" />
                          <source src={Fog2Mp4} type="video/mp4" />
                        </video>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>

              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <img
                    src={ppts[11]}
                    className="w-full object-cover transition duration-300 group-hover:scale-110"
                  />
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <img
                    src={ppts[12]}
                    className="w-full object-cover transition duration-300 group-hover:scale-110"
                  />
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <img
                    src={ppts[13]}
                    className="w-full object-cover transition duration-300 group-hover:scale-110"
                  />
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <img
                    src={ppts[14]}
                    className="w-full object-cover transition duration-300 group-hover:scale-110"
                  />
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute left-1/2 top-1/2 w-[30%] -translate-x-1/2 -translate-y-1/2 object-cover transition duration-300 group-hover:scale-[210%]"
                  >
                    <source src={Decoration} type="video/webm" />
                    <source src={DecorationMp4} type="video/mp4" />
                  </video>
                </div>
              </FadeUp>

              {/* 查看更多 */}
              <FadeUp>
                <div className="relative flex flex-col items-center justify-around rounded-3xl border bg-[#f0f0f0] p-6 text-black">
                  <span className="mb-6 font-gugi text-xl font-bold tracking-wide lg:text-2xl">
                    謝謝觀看，您可能對這些作品也有興趣
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
