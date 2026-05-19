import { motion } from "framer-motion";

import cover from "../assets/button/folder-UI-cover.svg";
import paper1 from "../assets/button/folder-paper1.svg";
import paper2 from "../assets/button/folder-paper2.svg";
import base from "../assets/button/folder-UI-base.svg";

export default function FolderButton() {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="relative h-[220px] w-[220px] cursor-pointer select-none"
    >
      {/* =========================
          底層
      ========================= */}

      <img
        src={base}
        alt=""
        className="pointer-events-none absolute inset-0 z-10 h-full w-full object-contain"
      />

      {/* =========================
          紙張
      ========================= */}
      <motion.img
        src={paper2}
        alt=""
        variants={{
          rest: {
            y: 0,
          },
          hover: {
            y: -40,
          },
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 18,
        }}
        className="pointer-events-none absolute inset-0 z-20 h-full w-full object-contain"
      />
      <motion.img
        src={paper1}
        alt=""
        variants={{
          rest: {
            y: 0,
          },
          hover: {
            y: -20,
          },
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 18,
          delay: 0.1,
        }}
        className="pointer-events-none absolute inset-0 z-20 h-full w-full object-contain"
      />

      {/* =========================
          上層
      ========================= */}
      <img
        src={cover}
        alt=""
        className="pointer-events-none absolute inset-0 z-30 h-full w-full object-contain"
      />
    </motion.div>
  );
}
