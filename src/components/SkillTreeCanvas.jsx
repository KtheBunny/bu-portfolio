import { motion } from "motion/react";
import { useEffect, useRef } from "react";

import skills from "../data/skills";
import SkillTreeCanvasNode from "./SkillTreeCanvasNode";

export default function SkillTreeCanvas() {
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
          id="canvas"
          className="relative h-full w-full cursor-none overflow-auto backdrop-blur-lg"
          style={{
            // 可視區背景
            background:
              "url('https://www.transparenttextures.com/patterns/graphy.png')",
          }}
        >
          {/* 內部內容: 設為比 viewport 大 (minWidth/minHeight) */}
          <div
            ref={containerRef}
            id="skill-tree-container"
            style={{
              position: "relative",
              // 調整為比 viewport 大，例如 2000x1400；視需求改數值或使用內部元素決定大小
              minWidth: 2000,
              minHeight: 1600,
              // 將內容置中（可改）
              margin: "0 auto",
            }}
          >
            <div
              className="absolute"
              id="skill-tree-container"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* 連接線 */}
              <div
                className="absolute -z-10 h-[2px] bg-white"
                style={{ top: 0, left: 271, width: 55 }}
              />

              <div
                className="absolute -z-10 w-[2px] bg-gray-600"
                style={{ top: 52, left: 278, height: 50 }}
              />

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

              {/* 所有技能節點 */}
              {skills.map((s) => (
                <SkillTreeCanvasNode key={s.id} {...s} />
              ))}

              {/* 遊戲開發技能節點 */}

              {/* UI技能節點 */}
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ top: -250, left: 0 }}
              >
                <div className="group relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-500 bg-[rgba(0,0,0,0.25)]">
                    <span className="material-symbols-outlined text-gray-500">
                      Assignment
                    </span>
                  </div>

                  <div className="invisible absolute bottom-full z-10 w-48 rounded border-[1px] border-[rgba(255,255,255,1)] bg-[rgba(0,0,0,0.5)] p-3 text-sm opacity-0 shadow-lg transition-opacity duration-300 group-hover:visible group-hover:opacity-100">
                    <div className="flex w-full items-center gap-3">
                      <span className="material-symbols-outlined rounded border-[1px] p-3">
                        Assignment
                      </span>
                      <h4 className="text-center font-bold text-text-light dark:text-text-dark">
                        企劃能力 已解鎖 / 未選擇
                      </h4>
                    </div>

                    <hr className="my-2 border-t border-gray-300 dark:border-gray-700" />

                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      被動技能
                    </p>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      擁有對遊戲的整體設計與規劃的能力和經驗，包含遊戲機制、故事情節、關卡設計等。
                    </p>

                    <hr className="my-2 border-t border-gray-300 dark:border-gray-700" />
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      相關作品
                    </p>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      - 2023 gamejam
                    </p>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      - 2024 畢製
                    </p>

                    <hr className="my-2 border-t border-gray-300 dark:border-gray-700" />
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      熟練度: 中級
                    </p>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      +
                      （中級）具有數次開發小型遊戲的經驗，能夠獨立完成基本的遊戲設計與實現。
                    </p>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      EXP 200 / 255
                    </p>
                    <div className="h-1.5 w-full rounded-full bg-gray-300 dark:bg-gray-700">
                      <div
                        className="h-1.5 rounded-full bg-green-500"
                        style={{ width: "78%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ top: -250, left: 200 }}
              >
                <motion.div
                  className="group relative"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[rgba(255,255,255,0.5)] bg-[rgba(0,0,0,0.25)]">
                    <span className="material-symbols-outlined text white">
                      wall_art
                    </span>
                  </div>

                  <div className="invisible absolute bottom-full z-10 flex w-52 flex-col rounded border-[1px] border-white bg-[rgba(0,0,0,0.5)] p-3 text-sm opacity-0 shadow-lg transition-opacity duration-300 group-hover:visible group-hover:opacity-100">
                    <div className="flex w-full items-center gap-3">
                      <span className="material-symbols-outlined rounded border-[1px] p-3">
                        wall_art
                      </span>
                      <div className="flex flex-col items-start">
                        <h4 className="font-bold text-white">企劃能力</h4>
                        <p className="text-xs text-gray-400">被動技能</p>
                      </div>
                    </div>

                    <hr className="my-2 border-t border-gray-600" />
                    <p className="text-white">技能說明：</p>
                    <p className="text-gray-400">
                      擁有對遊戲的整體設計與規劃的能力和經驗，包含遊戲機制、故事情節、關卡設計等。
                    </p>

                    <hr className="my-2 border-t border-gray-600" />
                    <p className="text-white">相關作品</p>
                    <p className="text-gray-400">- [2021] Path of Ghost</p>
                    <p className="text-gray-400">- [2022] Eminence</p>
                    <button className="mt-2 cursor-none rounded-sm border-[1px] border-white bg-[rgba(255,255,255,0.25)] px-3 py-1 text-sm text-white hover:bg-gray-500">
                      查看作品
                    </button>

                    <hr className="my-2 border-t border-gray-600" />
                    <p className="text-blue-400">熟練度: 中級</p>
                    <p className="text-gray-400">
                      ＋具有多次開發小型遊戲的經驗，能夠獨立完成基本的遊戲構想、設計與實現。
                    </p>
                    <p className="mt-2 text-xs text-white">EXP 600 / 1000</p>
                    <div className="h-1.5 w-full rounded-full bg-gray-300 dark:bg-gray-700">
                      <div
                        className="h-1.5 rounded-full bg-blue-400"
                        style={{ width: "60%" }}
                      />
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-white">
                        lock_open_right
                      </span>
                      <p className="text-xs text-white">
                        已解鎖，點擊選擇此技能
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ top: 0, left: -350 }}
              >
                <div className="group relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-500 bg-[rgba(0,0,0,0.25)]">
                    <span className="material-symbols-outlined text-gray-500">
                      Assignment
                    </span>
                  </div>

                  <div className="invisible absolute bottom-full z-10 w-48 rounded border-[1px] border-[rgba(255,255,255,1)] bg-[rgba(0,0,0,0.5)] p-3 text-sm opacity-0 shadow-lg transition-opacity duration-300 group-hover:visible group-hover:opacity-100">
                    <div className="flex w-full items-center gap-3">
                      <span className="material-symbols-outlined rounded border-[1px] p-3">
                        Assignment
                      </span>
                      <h4 className="text-center font-bold text-text-light dark:text-text-dark">
                        企劃能力 已解鎖 / 未選擇
                      </h4>
                    </div>

                    <hr className="my-2 border-t border-gray-300 dark:border-gray-700" />

                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      被動技能
                    </p>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      擁有對遊戲的整體設計與規劃的能力和經驗，包含遊戲機制、故事情節、關卡設計等。
                    </p>

                    <hr className="my-2 border-t border-gray-300 dark:border-gray-700" />
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      相關作品
                    </p>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      - 2023 gamejam
                    </p>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      - 2024 畢製
                    </p>

                    <hr className="my-2 border-t border-gray-300 dark:border-gray-700" />
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      熟練度: 中級
                    </p>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      +
                      （中級）具有數次開發小型遊戲的經驗，能夠獨立完成基本的遊戲設計與實現。
                    </p>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      EXP 200 / 255
                    </p>
                    <div className="h-1.5 w-full rounded-full bg-gray-300 dark:bg-gray-700">
                      <div
                        className="h-1.5 rounded-full bg-green-500"
                        style={{ width: "78%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 中心角色卡片 */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col items-center">
                  <img
                    alt="BunnyK Icon"
                    className="z-10 max-w-20 rounded-lg border-[1px] shadow-lg"
                    src="https://scontent.ftpe8-3.fna.fbcdn.net/v/t39.30808-6/570274599_122154692420718555_5659794563334834264_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EBvDTnXsfBEQ7kNvwFjc5VP&_nc_oc=Admk4bqNP3T-t5B1sQKNvbil0RsBGoWrSDA-pU9hPYaEVNYzJQ_grZAl6xmOqxTm3KE&_nc_zt=23&_nc_ht=scontent.ftpe8-3.fna&_nc_gid=IHaAWkBDgGurrMWYA4HJmQ&oh=00_AfiPErQAbuoT5Chr6_t1_LXQQDplPKVp_MPnzJ4hetF-WQ&oe=691A3701"
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
          </div>
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
