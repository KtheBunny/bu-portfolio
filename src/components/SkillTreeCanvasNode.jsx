import {
  flip,
  offset,
  safePolygon,
  shift,
  useFloating,
  useHover,
  useInteractions,
} from "@floating-ui/react";
import { motion } from "motion/react";
import { useState } from "react";

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
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: "right",
    middleware: [offset(10), flip(), shift()],
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const hover = useHover(context, {
    handleClose: safePolygon(),
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <>
      {/* 技能節點本體 */}
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ top: y, left: x }}
      >
        <motion.div
          className="relative"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[rgba(255,255,255,0.5)] bg-[rgba(0,0,0,0.25)]">
            <span className="material-symbols-outlined">{icon}</span>
          </div>
        </motion.div>
      </div>

      {/* Node Detail（使用 Portal） */}
      {isOpen && (
        <SkillTreeCanvasNodeDetail
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
          {...getFloatingProps()}
        />
      )}
    </>
  );
}
