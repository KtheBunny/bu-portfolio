import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import svgFolder from "../assets/button/folder.svg";
import svgPhone from "../assets/button/phone.svg";
import svgMonitor from "../assets/button/monitor.svg";
import eminenceIcon from "../assets/button/eminence-icon.png";
import mwIcon from "../assets/button/MW-icon.png";
import pogIcon from "../assets/button/POG-icon.png";

// 作品資料
const projects = [
  {
    id: 1,
    title: "Finance App",
    type: "電腦遊戲",
    skills: ["UI/UX", "React Native"],
    year: "2025",
    link: "/Eminence",
    svg: { eminenceIcon },
    image: "../src/assets/button/eminence-icon.png",
  },
  {
    id: 2,
    title: "Fantasy Game",
    type: "Game Design",
    skills: ["Game Dev", "Unity"],
    year: "2024",
    link: "/projects/fantasy-game",
    svg: "../src/assets/button/folder.svg",
    image: "/assets/projects/game-cover.png",
  },
  {
    id: 3,
    title: "Music Platform",
    type: "Web Design",
    skills: ["Frontend", "UI Design"],
    year: "2023",
    link: "/projects/music-platform",
    svg: "../src/assets/button/monitor.svg",
    image: "/assets/projects/music-cover.png",
  },
  {
    id: 4,
    title: "像素藝術作品集",
    type: "作品集",
    skills: ["Game Dev", "Unity"],
    year: "2024",
    link: "/projects/fantasy-game",
    svg: "../src/assets/button/folder.svg",
    image: "/assets/projects/game-cover.png",
  },
  {
    id: 5,
    title: "繪圖作品集",
    type: "作品集",
    skills: ["Game Dev", "Unity"],
    year: "2024",
    link: "/projects/fantasy-game",
    svg: "../src/assets/button/folder.svg",
    image: "/assets/projects/game-cover.png",
  },
];

// framer motion 容器動畫
const containerVariants = {
  hidden: {},
  show: {
    transition: {
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
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            className="flex flex-col items-center"
          >
            {/* 按鈕區 */}
            <Link to={project.link} className="group">
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 15,
                }}
                className="relative h-[280px] w-[280px] cursor-pointer"
              >
                {/* SVG底圖 */}
                <img
                  src={project.svg}
                  alt={project.title}
                  className="pointer-events-none h-full w-full select-none object-contain"
                />

                {/* 疊在SVG上的圖片 */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="pointer-events-none absolute inset-0 m-auto h-[58%] w-[58%] object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </motion.div>
            </Link>

            {/* 作品資訊 */}
            <div className="mt-5 w-full max-w-[300px] rounded-2xl border border-zinc-800 bg-zinc-900/70 px-5 py-4 backdrop-blur-md">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-xl font-semibold">{project.title}</h2>

                <span className="text-sm text-zinc-400">{project.year}</span>
              </div>

              <p className="mb-3 text-sm text-zinc-300">{project.type}</p>

              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
