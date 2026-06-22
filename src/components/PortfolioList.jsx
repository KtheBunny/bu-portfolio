import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

import { usePageTransition } from "../components/PageTransitionContext";

import svgFolder from "../assets/button/folder.svg";
import svgPhone from "../assets/button/phone.svg";
import svgMonitor from "../assets/button/monitor.svg";
import eminenceIcon from "../assets/button/Eminence-icon.png";
import mwIcon from "../assets/button/MW-icon.png";
import pogIcon from "../assets/button/POG-icon.png";

import folderPixelButton from "./PortfolioFolderPixel";
import folderArtButton from "./PortfolioFolderArt";
import folderUIButton from "./PortfolioFolderUI";
import EminenceButton from "./PortfolioEminenceButton";
import PogButton from "./PortfolioPogButton";
import MoonwalkButton from "./PortfolioMoonwalkButton";
import HealterButton from "./PortfolioHealterButton";
import IkhtcgButton from "./PortfolioIkhtcgButton";
import webButton from "./PortfolioWebButton";

import Footer from "../components/Footer";

const portfolios = [
  {
    id: 1,
    title: "繪畫相關作品集",
    type: "個人及委託的日系繪圖作品",
    skills: ["2D 繪畫", "插畫繪製", "人物設計"],
    year: "2025",
    link: "/Works/Illustration",

    icon: folderArtButton,
  },
  {
    id: 2,
    title: "Pixel Art 作品集",
    type: "像素風遊戲的各種美術素材",
    skills: [
      "Pixel Art",
      "動畫繪製",
      "動作設計",
      "場景設計",
      "Tilemap",
      "遊戲美術",
      "關卡設計",
    ],
    year: "2025",
    link: "/Works/PixelArt",

    icon: folderPixelButton,
  },

  /*
  {
    id: 3,
    title: "APP及網頁作品集",
    type: "Web Design",
    skills: ["Frontend", "UI Design"],
    year: "2025",
    link: "/Works/Web&App",

    icon: folderUIButton,
  },
  */
];

const projects = [
  {
    id: 1,
    title: "Eminence",
    type: "電腦遊戲 - 畢業專題",
    skills: [
      "遊戲開發",
      "Unity",
      "C#",
      "Pixel Art",
      "人物設計",
      "動作設計",
      "動畫繪製",
      "場景設計",
      "Tilemap",
      "UI 設計",
      "遊戲美術",
      "技術美術",
      "關卡設計",
    ],
    year: "2022",
    link: "/Works/Eminence",

    icon: EminenceButton,
  },

  {
    id: 2,
    title: "Path of Ghost",
    type: "電腦遊戲 - GameJam 作品",
    skills: [
      "遊戲開發",
      "Unity",
      "C#",
      "Pixel Art",
      "動畫繪製",
      "場景設計",
      "Tilemap",
      "遊戲美術",
      "關卡設計",
      "遊戲企劃",
    ],
    year: "2021",
    link: "/Works/PathOfGhost",

    icon: PogButton,
  },

  {
    id: 3,
    title: "MoonWalk",
    type: "電腦遊戲 - SDL",
    skills: ["遊戲開發", "Pixel Art", "動畫繪製", "UI 設計", "遊戲美術"],
    year: "2021",
    link: "/Works/Moonwalk",

    icon: MoonwalkButton,
  },

  {
    id: 4,
    title: "Healter",
    type: "iOS APP - MAIC決賽入圍作品",
    skills: [
      "APP 開發",
      "SwiftUI",
      "Figma",
      "概念美術",
      "平面設計",
      "UI 設計",
      "Prototype 製作",
      "前端程式",
    ],
    year: "2024",
    link: "/Works/Healter",

    icon: HealterButton,
  },

  {
    id: 5,
    title: "伊香保-TCG",
    type: "Web APP - 網頁抽卡小遊戲",
    skills: [
      "遊戲開發",
      "HTML",
      "Javascript",
      "UI 設計",
      "前端程式",
      "PWA 設計",
      "RWD",
      "遊戲企劃",
    ],
    year: "2025",
    link: "/Works/IKH-TCG",

    icon: IkhtcgButton,
  },

  {
    id: 6,
    title: "本作品集網頁",
    type: "Web APP",
    skills: [
      "網頁開發",
      "React",
      "TailwindCSS",
      "平面設計",
      "前端程式",
      "UI 設計",
    ],
    year: "2026",
    link: "/Works/PortfolioWeb",

    icon: webButton,
  },
];

// class map
const skillClassMap = {
  "2D 繪畫": "bg-teal-900 text-teal-300 border-teal-300",
  插畫繪製: "bg-teal-900 text-teal-200 border-teal-200",
  "Pixel Art": "bg-teal-900 text-teal-200 border-teal-200",

  人物設計: "bg-cyan-900 text-cyan-200 border-cyan-200",
  概念美術: "bg-cyan-900 text-cyan-200 border-cyan-200",

  動畫繪製: "bg-sky-900 text-sky-200 border-sky-200",
  動作設計: "bg-sky-900 text-sky-200 border-sky-200",

  場景設計: "bg-blue-900 text-blue-200 border-blue-200",
  Tilemap: "bg-blue-900 text-blue-200 border-blue-200",

  平面設計: "bg-indigo-900 text-indigo-200 border-indigo-200",
  "UI 設計": "bg-indigo-900 text-indigo-200 border-indigo-200",
  "Prototype 製作": "bg-indigo-900 text-indigo-200 border-indigo-200",

  "APP 開發": "bg-violet-900 text-violet-200 border-violet-200",
  網頁開發: "bg-violet-900 text-violet-200 border-violet-200",
  前端程式: "bg-violet-900 text-violet-200 border-violet-200",
  "PWA 設計": "bg-violet-900 text-violet-200 border-violet-200",
  RWD: "bg-violet-900 text-violet-200 border-violet-200",

  遊戲美術: "bg-purple-900 text-purple-200 border-purple-200",
  技術美術: "bg-purple-900 text-purple-200 border-purple-200",

  關卡設計: "bg-fuchsia-900 text-fuchsia-200 border-fuchsia-200",
  遊戲企劃: "bg-fuchsia-900 text-fuchsia-200 border-fuchsia-200",
  遊戲開發: "bg-fuchsia-900 text-fuchsia-200 border-fuchsia-200",
};

// class map
const skillIconMap = {
  "2D 繪畫": "material-symbols:draw-rounded",
  插畫繪製: "material-symbols:wall-art-rounded",
  "Pixel Art": "mdi:space-invaders",
  人物設計: "material-symbols:user-attributes-rounded",
  概念美術: "tabler:bulb-filled",
  平面設計: "fluent:design-ideas-24-regular",
  動畫繪製: "material-symbols:animation-outline",
  動作設計: "material-symbols:directions-run-rounded",
  場景設計: "material-symbols:mountain-steam-outline-rounded",
  Tilemap: "material-symbols:grid-on-outline",
  "UI 設計": "material-symbols:interactive-space-outline-rounded",
  "Prototype 製作": "fe:prototype",
  "APP 開發": "tdesign:app-filled",
  網頁開發: "material-symbols:code-rounded",
  前端程式: "material-symbols:code-rounded",
  RWD: "material-symbols:responsive-layout-outline-rounded",
  遊戲美術: "material-symbols:wall-art-rounded",
  技術美術: "grommet-icons:technology",
  關卡設計: "mdi:architecture",
  遊戲企劃: "material-symbols:article",
  遊戲開發: "streamline-plump:controller-1-solid",
  Unity: "mdi:unity",
  "C#": "bxl:c-sharp",
  Figma: "solar:figma-bold",
  SwiftUI: "lineicons:swift",
  HTML: "flowbite:html-solid",
  Javascript: "ri:javascript-fill",
  React: "mdi:react",
  TailwindCSS: "mdi:tailwind",
};

// framer motion 容器動畫
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.15,
    },
  },
};

// 單一卡片動畫
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

export default function PortfolioList() {
  //
  // 轉場
  //
  const { playTransition } = usePageTransition();

  return (
    <>
      <section className="relative ml-[3.5rem] min-h-screen bg-[#0f0f0f] px-8 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 self-center py-20">
          {/* 標題 */}
          <motion.div
            className="mb-6"
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
            <h1 className="mb-3 text-center font-gugi text-5xl font-bold">
              Portfolios
            </h1>
            <p className="text-center text-lg text-zinc-400">
              選擇您感興趣的作品，點擊進入詳細頁面。
            </p>
          </motion.div>

          {/* 作品集標題 */}
          <motion.div
            className="mb-3"
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
              delay: 0.2,
              ease: "easeOut",
            }}
          >
            <h2 className="mb-1 text-left font-gugi text-3xl font-bold">
              Skills & Disciplines
            </h2>
            <span className="text-left text-xl text-zinc-400">
              依技能分類的作品集
            </span>
          </motion.div>

          {/* 作品集列表 */}
          <motion.div
            className="mb-16 grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {portfolios.map((portfolio) => {
              const IconComponent = portfolio.icon;

              return (
                <motion.div
                  key={portfolio.id}
                  variants={itemVariants}
                  className="flex flex-col items-center"
                >
                  <Link to={portfolio.link} className="group">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        type: "spring",
                        stiffness: 220,
                        damping: 15,
                      }}
                    >
                      {/* 直接 render */}
                      <IconComponent />
                    </motion.div>
                  </Link>

                  {/* 資訊卡 */}
                  <div className="mt-5 w-full max-w-[320px] rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-800 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h2 className="text-xl font-semibold">
                        {portfolio.title}
                      </h2>

                      <span className="text-sm text-zinc-400">
                        {portfolio.year}
                      </span>
                    </div>

                    <p className="mb-3 text-sm text-zinc-300">
                      {portfolio.type}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {portfolio.skills.map((skill) => {
                        const style =
                          skillClassMap[skill] ??
                          "bg-zinc-800 text-zinc-200 border-zinc-200";
                        const icon =
                          skillIconMap[skill] ?? "icon-park-outline:dot";
                        return (
                          <span
                            key={skill}
                            className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs ${style}`}
                          >
                            <Icon icon={icon} width="12" height="12" />
                            {skill}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* 專題標題 */}
          <motion.div
            className="mb-8"
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
              delay: 0.4,
              ease: "easeOut",
            }}
          >
            <h2 className="mb-1 text-left font-gugi text-3xl font-bold">
              Projects & Cases
            </h2>
            <span className="text-left text-xl text-zinc-400">
              依專案分類的作品集
            </span>
          </motion.div>

          {/* 專題列表 */}
          <motion.div
            className="mb-12 grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {projects.map((project) => {
              const IconComponent = project.icon;

              return (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="flex flex-col items-center"
                >
                  <Link to={project.link} className="group">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        type: "spring",
                        stiffness: 220,
                        damping: 15,
                      }}
                    >
                      {/* 直接 render */}
                      <IconComponent />
                    </motion.div>
                  </Link>

                  {/* 資訊卡 */}
                  <div className="mt-5 w-full max-w-[320px] rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-800 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h2 className="text-xl font-semibold">{project.title}</h2>

                      <span className="text-sm text-zinc-400">
                        {project.year}
                      </span>
                    </div>

                    <p className="mb-3 text-sm text-zinc-300">{project.type}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill) => {
                        const style =
                          skillClassMap[skill] ??
                          "bg-zinc-800 text-zinc-200 border-zinc-200";
                        const icon =
                          skillIconMap[skill] ?? "icon-park-outline:dot";
                        return (
                          <span
                            key={skill}
                            className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs ${style}`}
                          >
                            <Icon icon={icon} width="12" height="12" />
                            {skill}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
          <div className="my-24 flex w-full flex-col items-center gap-2">
            <h1 className="mb-1 text-left font-gugi text-5xl font-bold">
              Skill Tree
            </h1>
            <p className="mb-12 text-center text-lg text-zinc-400">
              探索我的技能樹，了解各項能力的掌握程度與發展方向。
            </p>
            <button
              onClick={() => playTransition("/Skills")}
              className="flex w-full items-center justify-center gap-2 rounded border p-4 text-center text-lg leading-9 text-zinc-300 transition-colors duration-75 hover:bg-white hover:text-[#0f0f0f]"
            >
              <Icon icon={"jam:branch"} />
              查看技能樹
            </button>
          </div>

          <div className="my-16 border-b" />
        </div>
      </section>
      <Footer />
    </>
  );
}
