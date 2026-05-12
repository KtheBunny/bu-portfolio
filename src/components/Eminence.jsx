import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useRef } from "react";

import logo from "../assets/logo/Eminence-logo.png";
import hi from "../assets/logo/hi.png";

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

export default function Eminence() {
  const containerRef = useRef(null);

  // 取得 scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

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
        {/* =========================
          背景封面區
        ========================== */}
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* 背景圖 */}
          <motion.div
            style={{
              scale: scaleValue,
              filter: filterValue,
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

          <motion.div
            style={{
              opacity: hintsOpacity,
              filter: hintsFilter,
            }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="flex animate-bounce flex-col items-center gap-2">
              <span className="font-gugi text-sm tracking-widest text-white">
                Scroll to continue
              </span>
            </div>
          </motion.div>
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
