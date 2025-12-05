// SkillTreeCanvas.jsx (伺服器端/最上層 component)
import React, { useEffect, useRef, useState } from "react";
import skills from "../data/skills"; // 確認相對路徑
// ... 其他 import ...

export default function SkillTreeCanvas() {
  const [selectedId, setSelectedId] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const canvasWidth = 2200;
  const canvasHeight = 1600;

  // ... 你的拖拉事件等 useEffect 保留 ...

  const selectedSkill = skills.find((s) => s.id === selectedId);

  return (
    <>
      <div className="h-screen w-screen overflow-hidden">
        <div ref={canvasRef} className="relative h-full w-full cursor-none overflow-auto">
          {/* 底層 background / overlay / base svg（放在內容下方） */}
          <svg className="absolute -z-10" width={canvasWidth} height={canvasHeight}
               style={{ left: `-${canvasWidth/2}px`, top: `-${canvasHeight/2}px`, pointerEvents: "none" }}>
            <g transform={`translate(${canvasWidth/2}, ${canvasHeight/2})`}>
              {/* 渲染所有一般（未選中或未高亮）的 polyline */}
              {skills.map((s) => (
                s.polyline ? (
                  <polyline
                    key={`base-${s.id}`}
                    points={s.polyline}
                    stroke="rgba(255,255,255,0.9)"
                    strokeWidth="2"
                    fill="none"
                  />
                ) : null
              ))}
            </g>
          </svg>

          {/* 主要內容（nodes, avatar, etc.） */}
          <div ref={containerRef} style={{ minWidth: `${canvasWidth}px`, minHeight: `${canvasHeight}px`, position: "relative" }}>
            <div className="absolute left-1/2 top-1/2" style={{ transform: "translate(-50%, -50%)" }}>
              {/* nodes render */}
              {skills.map((s) => (
                <SkillTreeCanvasNode
                  key={s.id}
                  {...s}
                  selected={selectedId === s.id}
                  onSelect={(id) => setSelectedId(prev => prev === id ? null : id)} // 點擊同一個可取消選取
                />
              ))}

              {/* 其餘中心區塊... */}
            </div>
          </div>

          {/* 高亮線：放在 canvas 內容之上（確保疊放順序比 nodes 高） */}
          {selectedSkill && selectedSkill.polyline && (
            <svg
              className="absolute z-30 pointer-events-none"
              width={canvasWidth}
              height={canvasHeight}
              style={{ left: `-${canvasWidth/2}px`, top: `-${canvasHeight/2}px` }}
            >
              <g transform={`translate(${canvasWidth/2}, ${canvasHeight/2})`}>
                <polyline
                  points={selectedSkill.polyline}
                  stroke="#f59e0b" /* amber-500 */
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </g>
            </svg>
          )}
        </div>
      </div>

      {/* 自訂游標 */}
      <div ref={cursorRef} className="pointer-events-none fixed z-50 h-8 w-8 rounded-full border-2 border-white opacity-0" .../>
    </>
  );
}

// SkillTreeCanvasNode.jsx
export default function SkillTreeCanvasNode({ id, x, y, icon, mastery, selected, onSelect }) {
  // ... existing hooks
  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps({
          onClick: (e) => {
            e.stopPropagation();
            onSelect && onSelect(id);
          }
        })}
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ top: y, left: x }}
      >
        <motion.div className="relative" whileHover={{ scale: 1.1 }} ...>
          <div className={
            `flex h-12 w-12 items-center justify-center rounded-full border-2 
             ${selected ? "border-amber-500 ring-amber-300 ring-2" : "border-[rgba(255,255,255,0.5)]"} 
             bg-[rgba(0,0,0,0.25)]`
          }>
            <Icon icon={icon} width="24" height="24" color={mastery >= 20 ? "white" : "gray"} />
          </div>
        </motion.div>
      </div>

      {/* NodeDetail 部分不變，但要傳 selected 與 onSelect（下一段） */}
    </>
  );
}

// SkillTreeCanvasNodeDetail.jsx
// 接收 isSelected, onSelect props (from parent)
...
<div className="mt-2 flex items-center gap-2">
  <Icon icon="material-symbols:lock-open-right-outline-rounded" width="16" height="16" />
  {isSelected ? (
    <p className="text-xs text-amber-500">已選取</p>
  ) : (
    <button
      onClick={() => onSelect && onSelect(/* skill id, 你需把 id 傳進來 */)}
      className="text-xs text-white hover:text-amber-300"
    >
      已解鎖，點擊選擇此技能
    </button>
  )}
</div>

