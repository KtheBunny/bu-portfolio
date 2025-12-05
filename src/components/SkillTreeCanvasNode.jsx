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
import { Icon } from "@iconify/react";
import { addCollection } from "@iconify/react";
import { useState } from "react";

import SkillTreeCanvasNodeDetail from "./SkillTreeCanvasNodeDetail";

addCollection({
  prefix: "custom",
  icons: {
    spine: {
      body: '<path fill="currentColor" d="M7.157,2.207c0.066,2.004 1.454,3.117 4.221,3.55c2.345,0.368 4.46,0.181 5.15,-1.828c1.345,-3.918 -1.848,-2.943 -4.614,-3.378c-2.767,-0.435 -4.864,-1.564 -4.758,1.657Z" style="fill-rule:nonzero;"/><path fill="currentColor" d="M7.989,10.437c0.257,1.496 1.651,2.354 3.786,2.297c2.135,-0.059 3.727,-0.892 3.948,-2.507c0.409,-2.988 -1.945,-1.833 -4.08,-1.775c-2.136,0.059 -4.161,-0.951 -3.654,1.985Z" style="fill-rule:nonzero;"/><path fill="currentColor" d="M10.766,17.289c0.424,1.117 1.587,1.59 3.159,1.253c1.57,-0.335 2.656,-0.855 2.568,-2.129c-0.159,-2.357 -1.712,-1.616 -3.282,-1.279c-1.572,0.334 -3.273,-0.038 -2.445,2.155Z" style="fill-rule:nonzero;"/><path fill="currentColor" d="M12.114,22.51c0.124,0.943 0.939,1.499 2.216,1.489c1.279,-0.011 2.247,-0.515 2.412,-1.525c0.307,-1.871 -1.123,-1.175 -2.401,-1.164c-1.279,0.01 -2.47,-0.651 -2.227,1.2Z" style="fill-rule:nonzero;"/>',
    },
    live2d: {
      body: '<path fill="currentColor" d="M2.86,6.641c-0.058,-0.014 -0.105,0.022 -0.105,0.082l0,10.287c0,0.059 0.042,0.083 0.093,0.053l1.991,-1.165c0.051,-0.03 0.093,-0.103 0.093,-0.163l0,-8.47c0,-0.06 -0.047,-0.12 -0.105,-0.134l-1.967,-0.49Z" style="fill-rule:nonzero;"/><path fill="currentColor" d="M6.272,3.153c-0.074,-0.029 -0.134,0.011 -0.134,0.091l0,17.563c0,0.079 0.054,0.108 0.12,0.064l3.649,-2.443c0.066,-0.044 0.119,-0.144 0.119,-0.224l0,-13.409c0,-0.079 -0.06,-0.168 -0.134,-0.197l-3.621,-1.445Z" style="fill-rule:nonzero;"/><path fill="currentColor" d="M21.245,18.536c0,0.119 -0.077,0.276 -0.17,0.349l-6.484,5.078c-0.094,0.073 -0.17,0.036 -0.17,-0.083l0,-23.708c0,-0.119 0.082,-0.164 0.183,-0.101l6.458,4.063c0.101,0.063 0.183,0.212 0.183,0.331l0,14.071Z" style="fill-rule:nonzero;"/>',
    },
  },
  width: 24,
  height: 24,
});

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

  selected = false,
  onSelect,
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

  // 把 onClick 放進 getReferenceProps 以保留 floating-ui 的互動 props
  const referenceProps = getReferenceProps({
    onClick: (e) => {
      e.stopPropagation(); // 避免觸發 canvas 的 drag
      onSelect && onSelect(id);
      console.log("debug");
    },
  });

  return (
    <>
      {/* 技能節點本體 */}
      <div
        ref={refs.setReference}
        {...referenceProps}
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ top: y, left: x }}
      >
        <motion.div
          className="relative"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 bg-[rgba(0,0,0,0.25)]"
            style={
              selected
                ? { borderColor: "#f59e0b" }
                : { borderColor: "rgba(255,255,255,0.5)" }
            }
          >
            <Icon
              icon={icon}
              width="24"
              height="24"
              color={mastery >= 20 ? "white" : "gray"}
            />
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
          isSelected={selected}
          onSelect={() => onSelect && onSelect(id)}
          {...getFloatingProps()}
        />
      )}
    </>
  );
}
