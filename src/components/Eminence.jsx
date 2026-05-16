import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useEffect } from "react";

import logo from "../assets/logo/Eminence-logo.png";
import bg1 from "../assets/logo/Eminence-bg1.png";

import f0000 from "../assets/frames/WakeUp0000.png";
import f0001 from "../assets/frames/WakeUp0001.png";
import f0002 from "../assets/frames/WakeUp0002.png";
import f0003 from "../assets/frames/WakeUp0003.png";
import f0004 from "../assets/frames/WakeUp0004.png";
import f0005 from "../assets/frames/WakeUp0005.png";
import f0006 from "../assets/frames/WakeUp0006.png";
import f0007 from "../assets/frames/WakeUp0007.png";
import f0008 from "../assets/frames/WakeUp0008.png";
import f0009 from "../assets/frames/WakeUp0009.png";
import f0010 from "../assets/frames/WakeUp0010.png";
import f0011 from "../assets/frames/WakeUp0011.png";
import f0012 from "../assets/frames/WakeUp0012.png";
import f0013 from "../assets/frames/WakeUp0013.png";
import f0014 from "../assets/frames/WakeUp0014.png";
import f0015 from "../assets/frames/WakeUp0015.png";
import f0016 from "../assets/frames/WakeUp0016.png";
import f0017 from "../assets/frames/WakeUp0017.png";
import f0018 from "../assets/frames/WakeUp0018.png";
import f0019 from "../assets/frames/WakeUp0019.png";
import f0020 from "../assets/frames/WakeUp0020.png";
import f0021 from "../assets/frames/WakeUp0021.png";
import f0022 from "../assets/frames/WakeUp0022.png";
import f0023 from "../assets/frames/WakeUp0023.png";
import f0024 from "../assets/frames/WakeUp0024.png";
import f0025 from "../assets/frames/WakeUp0025.png";
import f0026 from "../assets/frames/WakeUp0026.png";
import f0027 from "../assets/frames/WakeUp0027.png";
import f0028 from "../assets/frames/WakeUp0028.png";
import f0029 from "../assets/frames/WakeUp0029.png";
import f0030 from "../assets/frames/WakeUp0030.png";
import f0031 from "../assets/frames/WakeUp0031.png";

import ppt1 from "../assets/Eminence/Eminence-1.webp";
import ppt2 from "../assets/Eminence/Eminence-2.webp";
import ppt3 from "../assets/Eminence/Eminence-3.webp";
import ppt4 from "../assets/Eminence/Eminence-4.webp";
import ppt5 from "../assets/Eminence/Eminence-5.webp";
import ppt6 from "../assets/Eminence/Eminence-6.webp";
import ppt7 from "../assets/Eminence/Eminence-7.webp";
import ppt8 from "../assets/Eminence/Eminence-8.webp";
import ppt9 from "../assets/Eminence/Eminence-9.webp";
import ppt10 from "../assets/Eminence/Eminence-10.webp";
import ppt11 from "../assets/Eminence/Eminence-11.webp";
import ppt12 from "../assets/Eminence/Eminence-12.webp";
import ppt13 from "../assets/Eminence/Eminence-13.webp";
import ppt14 from "../assets/Eminence/Eminence-14.webp";
import ppt15 from "../assets/Eminence/Eminence-15.webp";

import AllCharacterAnimation from "../assets/Eminence/Eminence-CharaAni.png";
import Fog1 from "../assets/Eminence/Eminence-Fog1.webm";
import Fog2 from "../assets/Eminence/Eminence-Fog2.webm";
import Parallax1 from "../assets/Eminence/Eminence-Para1.webm";
import Parallax2 from "../assets/Eminence/Eminence-Para2.webm";
import Decoration from "../assets/Eminence/Eminence-Deco.webm";

const frames = [
  f0000,
  f0001,
  f0002,
  f0003,
  f0004,
  f0005,
  f0006,
  //f0007,
  //f0008,
  //f0009,
  //f0010,
  f0011,
  f0012,
  f0013,
  f0014,
  f0015,
  f0016,
  f0017,
  f0018,
  f0019,
  f0020,
  f0021,
  f0022,
  f0023,
  f0024,
  f0025,
  f0026,
  f0027,
  f0028,
  f0029,
  f0030,
  f0031,
];

const TOTAL_FRAMES = 28;

const FadeUp = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 120,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      viewport={{
        once: false,
        amount: 0.25,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Eminence() {
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const canvasRef = useRef(null);
  const currentFrameRef = useRef(0);

  // 取得 scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /**
   * 0~1 => frame index
   */
  const frameIndex = useTransform(
    scrollYProgress,
    [0, 0.125],
    [0, TOTAL_FRAMES - 1],
  );

  /**
   * preload images
   */
  useEffect(() => {
    const images = [];

    frames.forEach((src) => {
      const img = new Image();

      img.src = src;

      images.push(img);
    });

    imagesRef.current = images;
  }, []);

  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) return;

    const image = imagesRef.current[index];

    if (!image) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.imageSmoothingEnabled = false;

    /**
     * cover mode
     */
    const scale = Math.max(
      canvas.width / image.width,
      canvas.height / image.height,
    );

    const x = canvas.width / 2 - (image.width / 2) * scale;

    const y = canvas.height / 2 - (image.height / 2) * scale;

    context.drawImage(image, x, y, image.width * scale, image.height * scale);
  };

  /**
   * scroll update
   */
  useMotionValueEvent(frameIndex, "change", (latest) => {
    const frame = Math.floor(latest);

    currentFrameRef.current = frame;

    drawFrame(frame);
  });

  /**
   * first frame
   */
  useEffect(() => {
    const firstImage = imagesRef.current[0];

    if (!firstImage) return;

    firstImage.onload = () => {
      drawFrame(0);
    };

    const handleResize = () => {
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ----------------------

  /**
   * 背景模糊值
   * 0% ~ 35% scroll 時逐漸模糊
   * 超過後固定 blur(16px)
   */
  const blurValue = useTransform(scrollYProgress, [0, 0.15, 0.2], [0, 0, 16]);
  const filterValue = useMotionTemplate`blur(${blurValue}px)`;

  /**
   * 背景縮放
   * 讓畫面更有 cinematic 感
   */
  const scaleValue = useTransform(
    scrollYProgress,
    [0, 0.175, 0.2],
    [1, 1, 1.08],
  );

  /**
   * 封面 dark overlay
   */
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.175, 0.2],
    [0, 0, 0.55],
  );

  // scroll提示相關
  const hintsOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);
  const hintsBlur = useTransform(scrollYProgress, [0, 0.04], [0, 10]);
  const hintsFilter = useMotionTemplate`blur(${hintsBlur}px)`;

  // logo相關
  const logoOpacity = useTransform(scrollYProgress, [0, 0.175, 0.2], [0, 0, 1]);

  // 角色相關
  const characterScale = useTransform(scrollYProgress, [0, 0.125], [1.2, 1]);
  const characterY = useTransform(scrollYProgress, [0, 0.125], [-200, 0]);

  // 第一個背景圖相關
  const bg1Opacity = useTransform(scrollYProgress, [0, 0.07, 0.2], [0, 0, 1]);

  return (
    <>
      <div ref={containerRef} className="bg-black text-white">
        <div className="sticky top-0 min-h-dvh overflow-hidden">
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
        {/* =========================
          gap
        ========================== */}
        <div className="sticky top-0 min-h-[200vh] overflow-hidden"></div>

        {/* =========================
          作品集區塊
      ========================== */}
        <section className="relative z-20">
          <div className="mx-auto max-w-6xl px-6 pb-40">
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
                  <div className="overflow-hidden">
                    <img
                      src={ppt1}
                      className="w-full object-cover transition duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
              </FadeUp>

              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="overflow-hidden">
                    <img
                      src={ppt2}
                      className="w-full object-cover transition duration-300 group-hover:scale-110"
                    />
                    <img
                      src={AllCharacterAnimation}
                      className="absolute left-1/2 top-1/2 z-10 w-2/5 -translate-x-1/2 -translate-y-1/2 object-cover transition duration-300 group-hover:scale-150"
                      style={{ imageRendering: "pixelated" }}
                    />
                  </div>
                </div>
              </FadeUp>

              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="overflow-hidden">
                    <img
                      src={ppt3}
                      className="w-full object-cover transition duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
              </FadeUp>

              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="overflow-hidden">
                    <img
                      src={ppt4}
                      className="w-full object-cover transition duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="overflow-hidden">
                    <img
                      src={ppt5}
                      className="w-full object-cover transition duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
              </FadeUp>

              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="overflow-hidden">
                    <img
                      src={ppt6}
                      className="w-full object-cover transition duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="overflow-hidden">
                    <img
                      src={ppt7}
                      className="w-full object-cover transition duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="overflow-hidden">
                    <img
                      src={ppt8}
                      className="w-full object-cover transition duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="overflow-hidden">
                    <img
                      src={ppt9}
                      className="w-full object-cover transition duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="overflow-hidden">
                    <img
                      src={ppt10}
                      className="w-full object-cover transition duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-y-[10%] right-[5.7%] flex h-[80%] w-[40%] flex-col transition duration-300 group-hover:scale-110">
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="min-h-0 w-auto flex-1 object-cover"
                      >
                        <source src={Parallax1} type="video/webm" />
                      </video>
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="min-h-0 w-auto flex-1 object-cover"
                      >
                        <source src={Parallax2} type="video/webm" />
                      </video>
                    </div>
                  </div>
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="overflow-hidden">
                    <img
                      src={ppt11}
                      className="w-full object-cover transition duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-x-[5.7%] top-1/2 flex w-[88.6%] -translate-y-1/2 flex-row transition duration-300 group-hover:scale-110">
                      <div className="flex-1 overflow-hidden">
                        <video
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="h-full w-full object-cover"
                        >
                          <source src={Fog1} type="video/webm" />
                        </video>
                      </div>

                      <div className="flex-1 overflow-hidden">
                        <video
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="h-full w-full object-cover"
                        >
                          <source src={Fog2} type="video/webm" />
                        </video>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="overflow-hidden">
                    <img
                      src={ppt12}
                      className="w-full object-cover transition duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="overflow-hidden">
                    <img
                      src={ppt13}
                      className="w-full object-cover transition duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="overflow-hidden">
                    <img
                      src={ppt14}
                      className="w-full object-cover transition duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="overflow-hidden">
                    <img
                      src={ppt15}
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
                    </video>
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
