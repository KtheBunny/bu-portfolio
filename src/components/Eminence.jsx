import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useEffect } from "react";

import logo from "../assets/logo/Eminence-logo.png";
import hi from "../assets/logo/hi.png";

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

const frames = [
  f0000,
  f0001,
  f0002,
  f0003,
  f0004,
  f0005,
  f0006,
  f0007,
  f0008,
  f0009,
  f0010,
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

const portfolioItems = [
  {
    id: 1,
    title: "Project One",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200",
  },
  {
    id: 2,
    title: "Project Two",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200",
  },
  {
    id: 3,
    title: "Project Three",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200",
  },
  {
    id: 4,
    title: "Project Four",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200",
  },
];

const TOTAL_FRAMES = 32;

export default function Eminence() {
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const canvasRef = useRef(null);

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
    [0, 0.4],
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

  /**
   * draw frame
   */
  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) return;

    const image = imagesRef.current[index];

    if (!image) return;

    /**
     * resize canvas
     */
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.imageSmoothingEnabled = false;

    /**
     * cover mode
     */
    const scale = 4;
    //Math.min(
    //  canvas.width / image.width,
    //  canvas.height / image.height,
    //);

    const x = canvas.width / 2 - (image.width / 2) * scale;

    const y = canvas.height / 2 - (image.height / 2) * scale;

    context.drawImage(image, x, y, image.width * scale, image.height * scale);
  };

  /**
   * scroll update
   */
  useMotionValueEvent(frameIndex, "change", (latest) => {
    drawFrame(Math.floor(latest));
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
  }, []);

  // ----------------------

  /**
   * 背景模糊值
   * 0% ~ 35% scroll 時逐漸模糊
   * 超過後固定 blur(16px)
   */
  const blurValue = useTransform(scrollYProgress, [0, 0.35], [0, 16]);
  const filterValue = useMotionTemplate`blur(${blurValue}px)`;

  /**
   * 背景縮放
   * 讓畫面更有 cinematic 感
   */
  const scaleValue = useTransform(scrollYProgress, [0, 0.35], [1, 1.08]);

  /**
   * 封面 dark overlay
   */
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.35], [0.2, 0.55]);

  // scroll提示相關
  const hintsOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const hintsBlur = useTransform(scrollYProgress, [0, 0.08], [0, 10]);
  const hintsFilter = useMotionTemplate`blur(${hintsBlur}px)`;

  return (
    <>
      <div ref={containerRef} className="bg-black text-white">
        <div className="sticky top-0 h-screen overflow-hidden">
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
          <canvas
            ref={canvasRef}
            className="h-screen w-screen"
            style={{ imageRendering: "pixelated" }}
          />
        </div>
        {/* =========================
          背景封面區
        ========================== */}
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* 背景圖 */}
          <motion.div
            style={{
              scale: scaleValue,
              filter: filterValue,
              opacity: 0.1,
            }}
            className="absolute inset-0"
          >
            <img src={hi} className="h-full w-full object-cover" />
          </motion.div>

          {/* 黑色遮罩 */}
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-black"
          />

          {/* 中央文字 */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center">
            <img src={logo} className="w-1/3" />
          </div>
        </div>

        {/* =========================
          作品集區塊
      ========================== */}
        <section className="relative z-20 min-h-[220vh]">
          <div className="mx-auto max-w-6xl px-6 pb-40 pt-[120vh]">
            <div className="grid gap-10 md:grid-cols-2">
              {portfolioItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{
                    opacity: 0,
                    y: 120,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                  viewport={{
                    once: false,
                    amount: 0.25,
                  }}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md"
                >
                  <div className="overflow-hidden">
                    <img
                      src={item.image}
                      className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <h2 className="text-2xl font-semibold">{item.title}</h2>

                    <p className="mt-3 text-white/60">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
