import { motion } from "framer-motion";

import icon from "../assets/button/POG-icon.png";

export default function PogButton() {
  return (
    <img
      src={icon}
      alt=""
      className="relative h-[220px] w-[220px] cursor-pointer select-none"
    />
  );
}
