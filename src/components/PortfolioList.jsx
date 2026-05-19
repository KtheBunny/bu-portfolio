import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import svgFolder from "../assets/button/folder.svg";
import svgPhone from "../assets/button/phone.svg";
import svgMonitor from "../assets/button/monitor.svg";
import eminenceIcon from "../assets/button/eminence-icon.png";
import mwIcon from "../assets/button/MW-icon.png";
import pogIcon from "../assets/button/POG-icon.png";

import folderButton from "./PortfolioFolderButton";
import EminenceButton from "./PortfolioEminenceButton";
import PogButton from "./PortfolioPogButton";
import MoonwalkButton from "./PortfolioMoonwalkButton";

const projects = [
  {
    id: 1,
    title: "Eminence",
    type: "Game",
    skills: ["Game Dev", "Pixel Art"],
    year: "2025",
    link: "/projects/pixel-adventure",

    icon: EminenceButton,
  },

  {
    id: 2,
    title: "Path of Ghost",
    type: "Mobile APP",
    skills: ["UI/UX", "React Native"],
    year: "2024",
    link: "/projects/finance-app",

    icon: PogButton,
  },

  {
    id: 3,
    title: "Moonwalk",
    type: "Web Design",
    skills: ["Frontend", "UI Design"],
    year: "2023",
    link: "/projects/music-platform",

    icon: MoonwalkButton,
  },
  {
    id: 4,
    title: "Pixel Art 作品集",
    type: "Web Design",
    skills: ["Frontend", "UI Design"],
    year: "2023",
    link: "/projects/music-platform",

    icon: folderButton,
  },
  {
    id: 5,
    title: "繪畫作品集",
    type: "Web Design",
    skills: ["Frontend", "UI Design"],
    year: "2023",
    link: "/projects/music-platform",

    icon: folderButton,
  },
];

// framer motion 容器動畫
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.5,
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
    <section className="relative ml-[3.5rem] min-h-screen bg-[#0f0f0f] px-8 py-20 text-white">
      {/* 標題 */}
      <div className="mb-16">
        <h1 className="mb-3 text-center font-gugi text-5xl font-bold">
          My Projects
        </h1>
        <p className="text-center text-lg text-zinc-400">
          選擇您感興趣的作品，點擊進入詳細頁面。
        </p>
      </div>

      {/* 作品列表 */}
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
              <div className="mt-5 w-full max-w-[300px] rounded-2xl bg-zinc-900 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{project.title}</h2>

                  <span className="text-sm text-zinc-400">{project.year}</span>
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
    </section>
  );
}
