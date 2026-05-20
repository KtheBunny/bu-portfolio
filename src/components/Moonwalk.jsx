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

export default function Moonwalk() {
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
        <section ref={heroRef} className="relative h-[150vh]">
          <div
            className="fixed top-0 min-h-dvh overflow-hidden bg-black"
            style={{ left: "3.5rem", width: "calc(100vw - 3.5rem)" }}
          >
           {/* 中央文字 */}
                       <div className="absolute z-10 flex h-full w-full flex-col items-center justify-center">
                         <motion.img
                           src={logo}
                           className={"w-1/2 lg:w-1/3"}
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
            {/* Title */}
            <div className="absolute flex flex-col left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <motion.div
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
            >
              <img src={logo} className="w-64" />
              <span className="w-full text-center">123</span>
            </motion.div>
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
                  <div className="overflow-hidden">
                    <img
                      src={ppts[0]}
                      className="w-full object-cover transition duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
              </FadeUp>

              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="overflow-hidden">
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
                </div>
              </FadeUp>

              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="overflow-hidden">
                    <img
                      src={ppts[2]}
                      className="w-full object-cover transition duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
              </FadeUp>

              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="overflow-hidden">
                    <img
                      src={ppts[3]}
                      className="w-full object-cover transition duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="overflow-hidden">
                    <img
                      src={ppts[4]}
                      className="w-full object-cover transition duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
              </FadeUp>

              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="overflow-hidden">
                    <img
                      src={ppts[5]}
                      className="w-full object-cover transition duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="overflow-hidden">
                    <img
                      src={ppts[6]}
                      className="w-full object-cover transition duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="overflow-hidden">
                    <img
                      src={ppts[7]}
                      className="w-full object-cover transition duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="overflow-hidden">
                    <img
                      src={ppts[8]}
                      className="w-full object-cover transition duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="overflow-hidden">
                    <img
                      src={ppts[9]}
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
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="overflow-hidden">
                    <img
                      src={ppts[10]}
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
                          <source src={Fog1Mp4} type="video/mp4" />
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
                          <source src={Fog2Mp4} type="video/mp4" />
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
                      src={ppts[11]}
                      className="w-full object-cover transition duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="overflow-hidden">
                    <img
                      src={ppts[12]}
                      className="w-full object-cover transition duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="overflow-hidden">
                    <img
                      src={ppts[13]}
                      className="w-full object-cover transition duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
              </FadeUp>
              <FadeUp>
                <div className="group aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="overflow-hidden">
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
                </div>
              </FadeUp>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
