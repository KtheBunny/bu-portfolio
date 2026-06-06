import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { usePageTransition } from "./PageTransitionContext";

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

export default function Footer() {
  //
  // About Me 轉場
  //
  const { playTransition } = usePageTransition();

  return (
    <footer className="ml-14 bg-[#0f0f0f] pb-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-10 lg:flex-row lg:justify-between">
        {/* 左側 */}
        <div className="shrink-0">
          <h2 className="font-gugi text-3xl">From player to creator.</h2>

          <a
            href="mailto:usagikinn@gmail.com"
            className="mt-4 block text-zinc-400 transition-colors hover:text-white"
          >
            usagikinn@gmail.com
          </a>
          <div className="z-10 mt-8 flex gap-4 drop-shadow-lg">
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
                  className="h-8 w-8 text-white transition-colors hover:text-zinc-300"
                />
              </motion.a>
            ))}
          </div>
          <p className="mt-4 text-sm text-zinc-500">© 2026 BunnyK</p>
        </div>

        {/* 右側 */}
        <div className="grid flex-1 grid-cols-2 gap-10 sm:grid-cols-3">
          {/* 網站頁面 */}
          <div className="flex flex-col gap-2">
            <p className="font-bold">網站頁面</p>

            <button
              onClick={() => playTransition("/")}
              className="text-left text-zinc-400 transition-colors hover:text-white"
            >
              主頁
            </button>

            <button
              onClick={() => playTransition("/Skills")}
              className="text-left text-zinc-400 transition-colors hover:text-white"
            >
              技能樹
            </button>

            <button
              onClick={() => playTransition("/Portfolio")}
              className="text-left text-zinc-400 transition-colors hover:text-white"
            >
              作品集
            </button>

            <button
              onClick={() => playTransition("/About")}
              className="text-left text-zinc-400 transition-colors hover:text-white"
            >
              關於我
            </button>
          </div>

          {/* 作品集 */}
          <div className="flex flex-col gap-2">
            <p className="font-bold">作品集</p>

            <button
              onClick={() => playTransition("/Works/PixelArt")}
              className="text-left text-zinc-400 transition-colors hover:text-white"
            >
              Pixel Art 作品集
            </button>

            <button
              onClick={() => playTransition("/Works/Illustration")}
              className="text-left text-zinc-400 transition-colors hover:text-white"
            >
              繪圖作品集
            </button>
          </div>

          {/* 作品列表 */}
          <div className="flex flex-col gap-2">
            <p className="font-bold">作品列表</p>

            <button
              onClick={() => playTransition("/Works/Eminence")}
              className="text-left text-zinc-400 transition-colors hover:text-white"
            >
              Eminence
            </button>

            <button
              onClick={() => playTransition("/Works/PathOfGhost")}
              className="text-left text-zinc-400 transition-colors hover:text-white"
            >
              Path Of Ghost
            </button>

            <button
              onClick={() => playTransition("/Works/Moonwalk")}
              className="text-left text-zinc-400 transition-colors hover:text-white"
            >
              Moonwalk
            </button>

            <button
              onClick={() => playTransition("/Works/Healter")}
              className="text-left text-zinc-400 transition-colors hover:text-white"
            >
              Healter
            </button>

            <button
              onClick={() => playTransition("/Works/IKH-TCG")}
              className="text-left text-zinc-400 transition-colors hover:text-white"
            >
              IKH-TCG
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
