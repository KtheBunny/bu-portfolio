import { motion } from "framer-motion";

import icon from "../assets/button/Healter-icon.png";

export default function HealterButton() {
  return (
    <img
      src={icon}
      alt=""
      className="relative h-[220px] w-[220px] cursor-pointer select-none"
    />
  );
}
