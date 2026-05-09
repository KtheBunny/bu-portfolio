import { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";

import icon from "../assets/icon.jpg";

import skills from "../data/skills";
import SkillTreeCanvasNode from "./SkillTreeCanvasNode";

export default function SkillTreeCanvas() {
  const [selectedIds, setSelectedIds] = useState(() => new Set());
  const canvasRef = useRef(null); // 實際綁在「viewport」上 (overflow container)
  const containerRef = useRef(null); // 內部實際比 viewport 大的內容
  const cursorRef = useRef(null);
  const drag = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });

  const canvasWidth = 2200;
  const canvasHeight = 1600;

  // 切換選取（加入或移除 id）
  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      const isSelected = next.has(id);

      // 找到此 node
      const skill = skills.find((s) => s.id === id);

      // ---------- 1. 如果是要選取 ----------
      if (!isSelected) {
        // 如果有 prerequisites → 檢查每個前置是否已被選取
        const allPrereqsSelected = skill.prerequisites.every((preId) =>
          next.has(preId),
        );

        if (!allPrereqsSelected) {
          console.log("❌ 前置技能未全部選取，不能選這個。");
          return next; // 不更新
        }

        // 允許選取
        next.add(id);
        return next;
      }

      // ---------- 2. 如果是要取消 ----------
      next.delete(id);

      // 取得所有子孫 node
      const descendants = getAllDescendants(id);

      // 把所有後續 node 全部強制取消
      descendants.forEach((childId) => next.delete(childId));

      return next;
    });
  };

  // 供給 view 使用的 helper（便於 render）
  const isSelected = (id) => selectedIds.has(id);

  function getAllDescendants(skillId) {
    const result = [];

    function dfs(id) {
      const children = skills.filter((s) => s.prerequisites.includes(id));
      for (const child of children) {
        result.push(child.id);
        dfs(child.id);
      }
    }

    dfs(skillId);
    return result;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const cursor = cursorRef.current;

    if (!canvas || !cursor) {
      console.error("Canvas 或 Cursor ref 未正確綁定");
      return;
    }

    // handlers
    const onMouseDown = (e) => {
      drag.current.isDragging = true;
      // 禁止文字選取以避免拖動時選到文字
      canvas.classList.add("select-none");
      const rect = canvas.getBoundingClientRect();
      drag.current.startX = e.pageX - rect.left;
      drag.current.startY = e.pageY - rect.top;
      drag.current.scrollLeft = canvas.scrollLeft;
      drag.current.scrollTop = canvas.scrollTop;

      // 按下游標變化（inline style，不需額外 CSS）
      cursor.style.transform = "translate(-50%,-50%) scale(0.8)";
      cursor.style.background = "rgba(255,255,255,0.95)";
      cursor.style.borderColor = "rgba(0,0,0,0.1)";
    };

    const onMouseUp = () => {
      drag.current.isDragging = false;
      canvas.classList.remove("select-none");
      cursor.style.transform = "translate(-50%,-50%) scale(1)";
      cursor.style.background = "transparent";
      cursor.style.borderColor = "rgba(255,255,255,0.95)";
    };

    const onMouseLeave = () => {
      drag.current.isDragging = false;
      canvas.classList.remove("select-none");
      cursor.style.opacity = "0";
    };

    const onMouseEnter = () => {
      cursor.style.opacity = "1";
    };

    const onMouseMove = (e) => {
      // 移動自訂游標
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
      cursor.style.opacity = "1";

      if (!drag.current.isDragging) return;

      e.preventDefault(); // 防止選取或拖曳預設行為
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const walkX = (x - drag.current.startX) * 1.5; // 調整滾動速度
      const walkY = (y - drag.current.startY) * 1.5;
      canvas.scrollLeft = drag.current.scrollLeft - walkX;
      canvas.scrollTop = drag.current.scrollTop - walkY;
    };

    // 註冊
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("mouseup", onMouseUp);

    console.log("事件已註冊");

    // 初始置中：將 container 的中心對齊到 canvas (viewport) 的中心
    const centerContainerInCanvas = () => {
      if (!canvas || !container) return;
      // 等待 layout 穩定 (例如圖片載入、字型等)，使用 rAF
      window.requestAnimationFrame(() => {
        try {
          const left =
            -28 +
            container.offsetLeft +
            container.offsetWidth / 2 -
            canvas.clientWidth / 2;
          const top =
            container.offsetTop +
            container.offsetHeight / 2 -
            canvas.clientHeight / 2;
          // 防止負值
          canvas.scrollLeft = Math.max(0, Math.round(left));
          canvas.scrollTop = Math.max(0, Math.round(top));
        } catch (err) {
          console.warn("Centering failed:", err);
        }
      });
    };

    // 只在初始載入時置中一次
    centerContainerInCanvas();

    // 可選：視窗大小改變時再次調整（可依需求移除）
    const onResize = () => centerContainerInCanvas();
    window.addEventListener("resize", onResize);

    // cleanup
    return () => {
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      {/* viewport: 固定顯示大小並可滾動 (綁 canvasRef) */}

      <div
        className="h-screen w-screen overflow-hidden"
        style={{
          // 可視區背景
          background:
            "url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1194&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div
          ref={canvasRef}
          className="relative h-full w-full cursor-none overflow-auto backdrop-blur-lg"
          style={{
            // 可視區背景
            background:
              "url('https://www.transparenttextures.com/patterns/graphy.png')",
          }}
        >
          {/* 內部內容: 設為比 viewport 大 (minWidth/minHeight) */}
          <motion.div
            ref={containerRef}
            style={{
              position: "relative",
              // 調整為比 viewport 大，例如 2000x1400；視需求改數值或使用內部元素決定大小
              minWidth: `${canvasWidth}px`,
              minHeight: `${canvasHeight}px`,
              // 將內容置中（可改）
              margin: "0 auto",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5,
              type: "spring",
              stiffness: 400,
              damping: 30,
              mass: 2.5,
            }}
          >
            <div
              className="absolute left-1/2 top-1/2"
              style={{
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* 主分支標題 */}
              <div className="absolute top-[-150px] flex h-12 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 rounded-[4px] border-[1px] border-solid border-[rgba(255,255,255,0.5)] bg-[rgba(0,0,0,0.25)] shadow-[0_6px_14px_rgba(0,0,0,0.35)]">
                <span className="material-symbols-outlined">select_window</span>
                互動設計
              </div>

              <div className="absolute left-[-200px] flex h-12 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 rounded-[4px] border-[1px] border-solid border-[rgba(255,255,255,0.5)] bg-[rgba(0,0,0,0.25)] shadow-[0_6px_14px_rgba(0,0,0,0.35)]">
                <span className="material-symbols-outlined">brush</span>
                數位藝術
              </div>

              <div className="absolute left-[200px] flex h-12 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 rounded-[4px] border-[1px] border-solid border-[rgba(255,255,255,0.5)] bg-[rgba(0,0,0,0.25)] shadow-[0_6px_14px_rgba(0,0,0,0.35)]">
                <span className="material-symbols-outlined">
                  Stadia_Controller
                </span>
                遊戲開發
              </div>

              {/* 連接線 */}

              <svg
                className="absolute -z-10"
                width={canvasWidth}
                height={canvasHeight}
                style={{
                  left: `-${canvasWidth / 2}`,
                  top: `-${canvasHeight / 2}`,
                  pointerEvents: "none",
                }}
              >
                {/* 下層 */}
                <g
                  transform={`translate(${canvasWidth / 2}, ${canvasHeight / 2})`}
                >
                  {/* 渲染所有 polyline */}
                  {skills.map((s) =>
                    s.polyline ? (
                      <polyline
                        key={`base-${s.id}`}
                        points={s.polyline}
                        stroke="gray"
                        strokeWidth="2"
                        fill="none"
                      />
                    ) : null,
                  )}
                </g>

                {/* 上層 */}
                <g
                  transform={`translate(${canvasWidth / 2}, ${canvasHeight / 2})`}
                >
                  {skills
                    .filter((s) => selectedIds.has(s.id) && s.polyline)
                    .map((s) => (
                      <polyline
                        key={`sel-${s.id}`}
                        points={s.polyline}
                        stroke="#f59e0b" // amber-500
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    ))}
                </g>
              </svg>

              {/* 所有技能節點 */}
              {skills.map((s) => (
                <SkillTreeCanvasNode
                  key={s.id}
                  {...s}
                  selected={isSelected(s.id)}
                  onSelect={toggleSelect}
                />
              ))}

              {/* 中心角色卡片 */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col items-center">
                  <img
                    alt="BunnyK Icon"
                    className="z-10 max-w-20 rounded-lg border-[1px] shadow-lg"
                    src={icon}
                  />
                  <div className="mt-[-32px] w-40 rounded border-[1px] border-[rgba(255,255,255,0.5)] bg-[rgba(0,0,0,0.25)] px-3 pb-3 pt-10 text-center shadow-[0_6px_14px_rgba(0,0,0,0.35)]">
                    <h3 className="text-lg font-bold text-text-light dark:text-text-dark">
                      BunnyK
                    </h3>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      研究所畢業生
                    </p>
                    <p className="mt-1 text-xs text-text-secondary-light dark:text-text-secondary-dark">
                      前網頁美術設計師
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* 自訂游標 */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-50 h-8 w-8 rounded-full border-2 border-white opacity-0 shadow-lg"
        style={{
          borderColor: "rgba(255,255,255,0.95)",
          background: "transparent",
          transform: "translate(-50%,-50%) scale(1)",
          transition: "transform 0.12s ease, background 0.12s ease",
        }}
      />
    </>
  );
}
