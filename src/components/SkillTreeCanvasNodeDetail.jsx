import { FloatingPortal } from "@floating-ui/react";
import { motion } from "motion/react";
import { forwardRef } from "react";

function getMasteryInfo(mastery) {
  if (mastery >= 80) {
    return {
      masterText: "特級",
      textColor: "text-amber-400",
      barColor: "bg-amber-400",
    };
  } else if (mastery >= 60) {
    return {
      masterText: "高級",
      textColor: "text-purple-400",
      barColor: "bg-purple-400",
    };
  } else if (mastery >= 30) {
    return {
      masterText: "中級",
      textColor: "text-blue-400",
      barColor: "bg-blue-400",
    };
  } else {
    return {
      masterText: "初級",
      textColor: "text-green-400",
      barColor: "bg-green-400",
    };
  }
}

const SkillTreeCanvasNodeDetail = forwardRef(
  (
    {
      style = {},
      icon,
      title,
      type,
      description,
      works = [],
      workLink,
      mastery,
      masteryDescriptions = [],
      ...props
    },
    ref,
  ) => {
    const { masterText, textColor, barColor } = getMasteryInfo(mastery);

    return (
      <FloatingPortal>
        <div
          ref={ref}
          style={{
            ...style,
            zIndex: 9999,
          }}
          {...props}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex w-52 flex-col rounded border border-white bg-[rgba(0,0,0,0.5)] p-3 text-sm shadow-lg backdrop-blur-sm"
          >
            {/* 頭部 */}
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined rounded border p-3">
                {icon}
              </span>
              <div>
                <h4 className={`font-bold ${textColor}`}>{title}</h4>
                <p className="text-xs text-gray-400">{type}</p>
              </div>
            </div>

            <hr className="my-2 border-gray-600" />

            {/* 技能說明 */}
            <p className="mb-1 text-white">技能說明：</p>
            <p className="text-gray-400">{description}</p>

            {/* 相關作品（動態可隱藏） */}
            {works.length > 0 && (
              <>
                <hr className="my-2 border-gray-600" />
                <p className="mb-1 text-white">相關作品</p>
                {works.map((w, i) => (
                  <p key={i} className="text-gray-400">
                    {w}
                  </p>
                ))}

                {workLink && (
                  <a
                    href={workLink}
                    target="_blank"
                    className="mt-2 flex justify-center rounded-sm border-[1px] border-white bg-[rgba(255,255,255,0.25)] px-3 py-1 text-white hover:bg-gray-500"
                  >
                    查看作品
                  </a>
                )}
              </>
            )}

            {/* 熟練度 */}
            <hr className="my-2 border-gray-600" />

            <p className={`${textColor} mb-1`}>熟練度: {masterText}</p>
            {masteryDescriptions.map((w, i) => (
              <p key={i} className="text-gray-400">
                {w}
              </p>
            ))}
            <p className="mt-2 text-xs text-gray-400">
              EXP {mastery * 10} / 1000
            </p>

            <div className="h-1.5 w-full rounded-full bg-gray-700">
              <div
                className={`${barColor} h-1.5 rounded-full`}
                style={{ width: `${mastery}%` }}
              />
            </div>

            <div className="mt-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-white">
                lock_open_right
              </span>
              <p className="text-xs text-white">已解鎖，點擊選擇此技能</p>
            </div>
          </motion.div>
        </div>
      </FloatingPortal>
    );
  },
);

export default SkillTreeCanvasNodeDetail;
