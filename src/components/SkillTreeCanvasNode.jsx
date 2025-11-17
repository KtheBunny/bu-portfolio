import { useState } from "react";
import { motion } from "motion/react";
import { useFloating, offset, flip, shift } from "@floating-ui/react";

import SkillTreeCanvasNodeDetail from "./SkillTreeCanvasNodeDetail";

export default function SkillTreeCanvasNode({
  id,
  x,
  y,
  icon,
  title,
  type,
  description,
  works,
  workLink,
  mastery,
  masteryDescriptions,
  prerequisites,
}) {
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles } = useFloating({
    placement: "top",
    middleware: [offset(0), flip(), shift()],
  });

  return (
    <>
      {/* 技能節點本體 */}
      <div
        ref={refs.setReference}
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ top: y, left: x }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <motion.div
          className="relative"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div
            className="
            w-12 h-12 rounded-full
            bg-[rgba(0,0,0,0.25)]
            border-2 border-[rgba(255,255,255,0.5)]
            flex items-center justify-center
          "
          >
            <span className="material-symbols-outlined">{icon}</span>
          </div>
        </motion.div>
      </div>

      {/* Node Detail（使用 Portal） */}
      <SkillTreeCanvasNodeDetail
        open={open}
        ref={refs.setFloating}
        style={floatingStyles}
        icon={icon}
        title={title}
        type={type}
        description={description}
        works={works}
        workLink={workLink}
        mastery={mastery}
        masteryDescriptions={masteryDescriptions}
      />
    </>
  );
}
