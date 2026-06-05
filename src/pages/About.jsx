import { useEffect } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

import avatar from "../assets/new bu.png";

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
      delayChildren: 1.2,
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
  return (
    <main className="ml-14 min-h-screen bg-[#0f0f0f] text-white">
      {/* HERO */}
      <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden">
        {/* Background Text */}
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
            delay: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="pointer-events-none absolute select-none font-gugi text-[18vw] font-black tracking-tighter text-white"
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
              scale: 0.8,
            }}
            animate={{
              scale: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 8,
              delay: 0.5,
            }}
            src={avatar}
            className="h-56 w-56 rounded-full object-cover"
          />
        </motion.div>

        {/* Social */}
        <motion.div
          variants={socialContainer}
          initial="hidden"
          animate="show"
          className="z-10 mt-8 flex gap-8"
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

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.8,
          }}
          className="absolute bottom-10 text-sm text-zinc-500"
        >
          Scroll Down ↓
        </motion.div>
      </section>

      {/* ABOUT */}
      <section className="mx-auto max-w-6xl px-10 py-32">
        <motion.div
          variants={revealUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="mb-8 text-5xl font-bold">About Me</h2>

          <p className="max-w-3xl text-lg leading-9 text-zinc-300">
            Frontend Developer specializing in React, TypeScript, UI Engineering
            and modern web experiences.
          </p>
        </motion.div>
      </section>

      {/* EDUCATION */}
      <section className="mx-auto max-w-6xl px-10 py-32">
        <motion.div
          variants={revealUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="mb-12 text-5xl font-bold">Education</h2>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">
              National Taiwan University
            </h3>

            <p className="text-zinc-400">Computer Science</p>

            <p className="text-zinc-500">2020 - 2024</p>
          </div>
        </motion.div>
      </section>

      {/* WORK */}
      <section className="mx-auto max-w-6xl px-10 py-32">
        <motion.div
          variants={revealUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="mb-12 text-5xl font-bold">Work Experience</h2>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Frontend Developer</h3>

            <p className="text-zinc-400">Your Company</p>

            <p className="text-zinc-500">2024 - Present</p>
          </div>
        </motion.div>
      </section>

      {/* PROJECTS */}
      <section className="mx-auto max-w-6xl px-10 py-32">
        <motion.div
          variants={revealUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="mb-12 text-5xl font-bold">Awards & Projects</h2>

          <div className="space-y-10">
            <div>
              <h3 className="text-2xl font-semibold">Best UI Design Award</h3>

              <p className="mt-2 text-zinc-400">2024</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold">Portfolio Website</h3>

              <p className="mt-2 text-zinc-400">
                React + Three.js + Framer Motion
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
