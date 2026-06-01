import { motion } from "framer-motion";

import icon from "../assets/icon.jpg";

export default function WebButton() {
  return (
    <img
      src={icon}
      alt=""
      className="relative h-[220px] w-[220px] cursor-pointer select-none rounded-lg"
    />
  );
}
