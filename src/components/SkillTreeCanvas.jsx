import { useEffect, useRef, useState, useMemo } from "react";

import { motion } from "framer-motion";

import icon from "../assets/icon.webp";

import skills from "../data/skills";
import SkillTreeCanvasNode from "./SkillTreeCanvasNode";

export default function SkillTreeCanvas({
  selectedIds,
  setSelectedIds,
  currentProfession = "（無）",
}) {
  const [showCustomCursor, setShowCustomCursor] = useState(false);

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

  // 計算四個分類的已選技能數量
  const counts = useMemo(() => {
    let c1 = 0; // x <= -350
    let c2 = 0; // x >= 350
    let c3 = 0; // -350 < x < 350 && y < 0
    let c4 = 0; // -350 < x < 350 && y > 0

    // selectedIds 是一個 Set
    for (const s of skills) {
      if (!selectedIds || !selectedIds.has(s.id)) continue;

      if (typeof s.x === "number") {
        if (s.x <= -350) c1++;
        else if (s.x >= 350) c2++;
        else {
          if (typeof s.y === "number") {
            if (s.y < 0) c3++;
            else if (s.y > 0) c4++;
          }
        }
      }
    }

    return { c1, c2, c3, c4 };
  }, [selectedIds]);

  // 切換選取（加入或移除 id）
  const toggleSelect = (id) => {
    // setSelectedIds 由父元件傳入
    setSelectedIds((prev) => {
      const next = new Set(prev);
      const isSelected = next.has(id);

      // 找到此 node
      const skill = skills.find((s) => s.id === id);

      // ---------- 1. 如果是要選取 ----------
      if (!isSelected) {
        // 如果 mastery 小於 20，拒絕選取
        const mastery = Number(skill.mastery ?? 0);
        if (mastery < 20) {
          return next;
        }

        // 自動選取所有前置（包含遞迴的前置）
        const ancestors = getAllAncestors(id);
        ancestors.forEach((ancId) => next.add(ancId));
        // 選取當前技能
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

  // 取得所有遞迴的前置技能（ancestors）
  function getAllAncestors(skillId) {
    const result = [];
    const visited = new Set();

    function dfs(id) {
      const node = skills.find((s) => s.id === id);
      if (!node || !Array.isArray(node.prerequisites)) return;
      for (const preId of node.prerequisites) {
        if (!visited.has(preId)) {
          visited.add(preId);
          result.push(preId);
          dfs(preId);
        }
      }
    }

    dfs(skillId);
    return result;
  }

  useEffect(() => {
    // 判斷是否為滑鼠裝置
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const canHover = window.matchMedia("(hover: hover)").matches;
    setShowCustomCursor(hasFinePointer && canHover);
    console.log("裝置能力檢測：", {
      hasFinePointer,
      canHover,
      showCustomCursor,
    });
  }, [showCustomCursor]);

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
      const walkX = (x - drag.current.startX) * 1; // 調整滾動速度
      const walkY = (y - drag.current.startY) * 1;
      canvas.scrollLeft = drag.current.scrollLeft - walkX;
      canvas.scrollTop = drag.current.scrollTop - walkY;
    };

    // 註冊
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("mouseup", onMouseUp);

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

      <div className="h-screen w-screen overflow-hidden bg-[url(https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1194&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover">
        <div
          ref={canvasRef}
          className="relative h-full w-full cursor-none overflow-auto backdrop-blur-lg"
          style={{
            // 可視區背景
            background: `
      linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
      url('https://www.transparenttextures.com/patterns/graphy.png')
    `,
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

              <div className="absolute top-[150px] flex h-12 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 rounded-[4px] border-[1px] border-solid border-[rgba(255,255,255,0.5)] bg-[rgba(0,0,0,0.25)] shadow-[0_6px_14px_rgba(0,0,0,0.35)]">
                <span className="material-symbols-outlined">Other_Houses</span>
                其他技能
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
                  <div className="mt-[-32px] w-44 rounded border-[1px] border-[rgba(255,255,255,0.5)] bg-[rgba(0,0,0,0.25)] px-3 pb-3 pt-10 text-center shadow-[0_6px_14px_rgba(0,0,0,0.35)]">
                    <h3 className="font-gugi text-lg text-text-dark">BunnyK</h3>
                    <p className="text-sm text-text-secondary-dark">
                      當前職業：{currentProfession}
                    </p>
                    <div className="mt-1 font-gugi text-sm text-text-secondary-dark">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-cyan-300">{counts.c1}</span>
                        <span className="text-text-secondary-dark">/</span>
                        <span className="text-indigo-300">{counts.c3}</span>
                        <span className="text-text-secondary-dark">/</span>
                        <span className="text-purple-300">{counts.c2}</span>
                        <span className="text-text-secondary-dark">/</span>
                        <span className="text-zinc-300">{counts.c4}</span>
                      </div>
                    </div>
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
          zIndex: `${showCustomCursor ? 50 : -5}`,
        }}
      />
    </>
  );
}
