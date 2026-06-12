import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { usePageTransition } from "../components/PageTransitionContext";

import Carousel from "../components/Carousel";
import Footer from "../components/Footer";

import avatar from "../assets/new bu.webp";
import pixelBun from "../assets/other/pixelBun.webp";

const socials = [
  {
    icon: "fa7-brands:facebook-square",
    href: "https://www.facebook.com/bunny.king.5015983/",
  },
  {
    icon: "fa7-brands:instagram-square",
    href: "https://www.instagram.com/k_the_bunny/",
  },
  {
    icon: "fa7-brands:pixiv",
    href: "https://www.pixiv.net/users/10103233/",
  },
  {
    icon: "mdi:email",
    href: "mailto:usagikinn@gmail.com",
  },
];

const socialContainer = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 1,
      staggerChildren: 0.1,
    },
  },
};

const socialItem = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const revealUp = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ProfilePage() {
  // 向下scroll
  const targetRef = useRef(null);

  const handleClick = () => {
    targetRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  //
  // About Me 轉場
  //
  const { playTransition } = usePageTransition();

  return (
    <>
      <main className="min-h-scree ml-14 overflow-x-clip bg-[#0f0f0f] text-white">
        {/* HERO */}
        <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden">
          {/*  */}
          <motion.h1
            initial={{
              y: 250,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 1,
              delay: 1.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="pointer-events-none -translate-y-1/2 select-none font-gugi text-[18vw] font-black tracking-tighter text-white md:absolute xl:text-[12vw]"
          >
            BunnyK
          </motion.h1>

          {/* Avatar */}

          <motion.div
            initial={{
              clipPath: "circle(0% at center)",
            }}
            animate={{
              clipPath: "circle(75% at center)",
            }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.5,
            }}
          >
            <motion.img
              initial={{
                scale: 1.5,
              }}
              animate={{
                scale: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.5,
              }}
              src={avatar}
              className="h-56 w-56 rounded-full object-cover drop-shadow-lg"
            />
          </motion.div>

          {/* Social */}
          <motion.div
            variants={socialContainer}
            initial="hidden"
            animate="show"
            className="z-10 mt-8 flex gap-8 drop-shadow-lg"
          >
            {socials.map((social) => (
              <motion.a
                key={social.icon}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                variants={socialItem}
                whileHover={{
                  scale: 1.15,
                  y: -4,
                }}
              >
                <Icon
                  icon={social.icon}
                  className="h-10 w-10 text-white transition-colors hover:text-zinc-300"
                />
              </motion.a>
            ))}
          </motion.div>

          <motion.button
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1.8,
            }}
            className="absolute bottom-20 flex animate-bounce flex-col items-center text-sm text-zinc-500 transition duration-75 hover:text-white"
            onClick={handleClick}
          >
            <Icon icon="lineicons:scroll-down-2" className="h-10 w-10" />
          </motion.button>
        </section>

        {/* ABOUT */}
        <section className="mx-auto max-w-6xl px-10 py-32" ref={targetRef}>
          <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <img src={pixelBun} className="mb-16 w-56" />

            <h2 className="mb-8 text-center font-gugi text-5xl">About Me</h2>

            <p className="text-center text-lg leading-9 text-zinc-300">
              袁浩軒，熱愛遊戲以及與遊戲相關的創作，擁有遊戲美術與程式開發的跨領域背景。除了具備像素藝術、角色設計、場景設計、UI/UX
              設計等美術能力外，也熟悉 Unity
              與前端開發流程，能從開發者角度思考美術設計與玩家體驗。希望投入遊戲產業美術相關職位，持續創作兼具視覺表現與遊玩體驗的作品。
            </p>
          </motion.div>
        </section>

        {/* NAVIGATE */}
        <section className="mx-auto max-w-6xl px-10 py-32">
          <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <button
              onClick={() => playTransition("/Works")}
              className="mb-12 flex w-full items-center justify-center gap-2 rounded border p-4 text-center text-lg leading-9 text-zinc-300 transition-colors duration-75 hover:bg-white hover:text-[#0f0f0f]"
            >
              <Icon icon={"carbon:portfolio"} />
              查看作品列表
            </button>
            <button
              onClick={() => playTransition("/Skills")}
              className="flex w-full items-center justify-center gap-2 rounded border p-4 text-center text-lg leading-9 text-zinc-300 transition-colors duration-75 hover:bg-white hover:text-[#0f0f0f]"
            >
              <Icon icon={"jam:branch"} />
              查看技能樹
            </button>
          </motion.div>
        </section>

        {/* EDUCATION */}
        <section className="mx-auto max-w-6xl px-10 py-32 text-center">
          <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="mb-12 font-gugi text-5xl">Education</h2>

            <div className="mb-6 space-y-4">
              <h3 className="text-2xl font-semibold">國立臺北教育大學</h3>

              <p className="text-zinc-400">
                數位科技設計學系玩具與遊戲設計碩士班
              </p>

              <p className="text-zinc-500">2023 - 2025</p>
            </div>
            <div className="mb-6 space-y-4">
              <h3 className="text-2xl font-semibold">香港城市大學</h3>

              <p className="text-zinc-400">理學士（創意媒體）</p>

              <p className="text-zinc-500">2020 - 2022</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">香港理工大學</h3>

              <p className="text-zinc-400">電子及資訊工程學高級文憑</p>

              <p className="text-zinc-500">2018 - 2020</p>
            </div>
          </motion.div>
        </section>

        {/* WORK */}
        <section className="mx-auto max-w-6xl px-10 py-32 text-center">
          <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="mb-12 font-gugi text-5xl">Work Experience</h2>

            <div className="mb-6 space-y-4">
              <h3 className="text-2xl font-semibold">
                數位產品設計師 | JobMatriz 職拼
              </h3>

              <p className="text-zinc-400">
                負責網站視覺設計、UI/UX規劃、品牌視覺建立、社群內容設計及部分前端開發。
              </p>

              <p className="text-zinc-500">2022 - 2023</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">
                STEM 教材設計及課堂導師 | Idea Maker HK
              </h3>

              <p className="text-zinc-400">
                規劃並開發國小至國中學生適用之 Unity 遊戲開發、micro:bit
                電子電路和 3D 列印流程課程教材，並擔任課堂主要講師。
              </p>

              <p className="text-zinc-500">2018 - 2023</p>
            </div>
          </motion.div>
        </section>

        {/* PROJECTS */}
        <section className="mx-auto max-w-6xl px-10 py-32 text-center">
          <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="mb-12 font-gugi text-5xl">Awards & Projects</h2>

            <div className="space-y-10">
              <div className="mb-6 space-y-4">
                <h3 className="text-2xl font-semibold">
                  MAIC 行動應用創新賽 2024 臺灣決賽
                </h3>

                <p className="mt-2 text-zinc-400">Healter</p>

                <p className="text-zinc-500">
                  概念美術、玩法設計、平面設計、ＵＩ設計、前端程式、影片剪輯
                </p>
              </div>

              <div className="mb-6 space-y-4">
                <h3 className="text-2xl font-semibold">Global Game Jam 2021</h3>

                <p className="text-zinc-400">Path Of Ghost</p>

                <p className="text-zinc-500">
                  遊戲美術、人物動畫、玩法設計、關卡設計、影片剪輯
                </p>
              </div>
            </div>
          </motion.div>
        </section>
        <section className="mx-auto max-w-6xl px-10 py-32 text-center">
          <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="mb-12 font-gugi text-5xl">Gallery</h2>
            <Carousel />
          </motion.div>
          <div className="mt-32 border-b" />
        </section>
      </main>
      <Footer />
    </>
  );
}
