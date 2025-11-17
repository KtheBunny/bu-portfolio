import { FloatingPortal } from "@floating-ui/react";
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
  } else if (mastery >= 25) {
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
      open,
      style = {},
      icon,
      title,
      type,
      description,
      works = [],
      workLink,
      mastery,
      masteryDescriptions = [],
    },
    ref
  ) => {
    const { masterText, textColor, barColor } = getMasteryInfo(mastery);

    if (!open) return null;

    console.log(style);

    return (
      <FloatingPortal>
        <div
          ref={ref}
          style={{
            ...style,
            zIndex: 9999,
          }}
          className="flex flex-col w-52 bg-[rgba(0,0,0,0.5)] border border-white p-3 rounded shadow-lg text-sm"
        >
          {/* 頭部 */}
          <div className="flex gap-3 items-center">
            <span className="material-symbols-outlined p-3 rounded border">
              {icon}
            </span>
            <div>
              <h4 className={`font-bold ${textColor}`}>{title}</h4>
              <p className="text-xs text-gray-400">{type}</p>
            </div>
          </div>

          <hr className="my-2 border-gray-600" />

          {/* 技能說明 */}
          <p className="text-white mb-1">技能說明：</p>
          <p className="text-gray-400">{description}</p>

          {/* 相關作品（動態可隱藏） */}
          {works.length > 0 && (
            <>
              <hr className="my-2 border-gray-600" />
              <p className="text-white mb-1">相關作品</p>
              {works.map((w, i) => (
                <p key={i} className="text-gray-400">
                  - {w}
                </p>
              ))}

              {workLink && (
                <a
                  href={workLink}
                  target="_blank"
                  className="flex justify-center mt-2 px-3 py-1 bg-[rgba(255,255,255,0.25)] border-[1px] border-white text-white rounded-sm hover:bg-gray-500 cursor-none"
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
          <p className="text-gray-400 mt-2 text-xs">
            EXP {mastery * 10} / 1000
          </p>

          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <div
              className={`${barColor} h-1.5 rounded-full`}
              style={{ width: `${mastery}%` }}
            />
          </div>

          <div className="flex items-center mt-2 gap-2">
            <span className="material-symbols-outlined text-sm text-white">
              lock_open_right
            </span>
            <p className="text-white text-xs">已解鎖，點擊選擇此技能</p>
          </div>
        </div>
      </FloatingPortal>
    );
  }
);

export default SkillTreeCanvasNodeDetail;
