import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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

const portfolios = [
  {
    id: 1,
    title: "Pixel Art 作品集",
    type: "Web Design",
    skills: ["Frontend", "UI Design"],
    year: "2025",
    link: "/Works/PixelArt",

    icon: folderPixelButton,
  },
  {
    id: 2,
    title: "繪畫相關作品集",
    type: "Web Design",
    skills: ["Frontend", "UI Design"],
    year: "2025",
    link: "/Works/Illustration",

    icon: folderArtButton,
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
    type: "電腦遊戲",
    skills: ["遊戲開發", "Pixel Art", "Unity", "技術美術", "UI 設計"],
    year: "2022",
    link: "/Works/Eminence",

    icon: EminenceButton,
  },

  {
    id: 2,
    title: "Path of Ghost",
    type: "電腦遊戲",
    skills: ["遊戲開發", "Pixel Art", "Unity", "UI 設計"],
    year: "2021",
    link: "/Works/PathOfGhost",

    icon: PogButton,
  },

  {
    id: 3,
    title: "MoonWalk",
    type: "電腦遊戲",
    skills: ["遊戲開發", "Pixel Art", "UI 設計"],
    year: "2021",
    link: "/Works/Moonwalk",

    icon: MoonwalkButton,
  },

  {
    id: 4,
    title: "Healter",
    type: "iOS APP",
    skills: [
      "APP 開發",
      "概念美術",
      "平面設計",
      "UI 設計",
      "前端程式",
      "SwiftUI",
      "Figma",
    ],
    year: "2024",
    link: "/Works/Healter",

    icon: HealterButton,
  },

  {
    id: 5,
    title: "伊香保-TCG",
    type: "Web APP",
    skills: ["遊戲開發", "前端程式", "UI 設計", "HTML", "Javascript"],
    year: "2025",
    link: "/Works/IKH-TCG",

    icon: IkhtcgButton,
  },

  {
    id: 6,
    title: "作品集網頁",
    type: "Web APP",
    skills: ["前端程式", "UI 設計", "React"],
    year: "2026",
    link: "/",

    icon: IkhtcgButton,
  },
];

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
  return (
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
            &gt; Skills & Disciplines
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
          {portfolios.map((portfolios) => {
            const IconComponent = portfolios.icon;

            return (
              <motion.div
                key={portfolios.id}
                variants={itemVariants}
                className="flex flex-col items-center"
              >
                <Link to={portfolios.link} className="group">
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
                <div className="mt-5 w-full max-w-[300px] rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-800 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                      {portfolios.title}
                    </h2>

                    <span className="text-sm text-zinc-400">
                      {portfolios.year}
                    </span>
                  </div>

                  <p className="mb-3 text-sm text-zinc-300">
                    {portfolios.type}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {portfolios.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-zinc-800 px-3 py-1 text-xs"
                      >
                        {skill}
                      </span>
                    ))}
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
          className="grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-3"
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
                <div className="mt-5 w-full max-w-[300px] rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-800 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">{project.title}</h2>

                    <span className="text-sm text-zinc-400">
                      {project.year}
                    </span>
                  </div>

                  <p className="mb-3 text-sm text-zinc-300">{project.type}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-zinc-800 px-3 py-1 text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
