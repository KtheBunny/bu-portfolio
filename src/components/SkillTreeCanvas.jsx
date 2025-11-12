import { useEffect, useRef } from "react";

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

    // 檢查 ref 是否有成功取得元素
    console.log("Canvas:", canvas);
    console.log("Cursor:", cursor);

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

    // cleanup
    return () => {
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <>
      {/* viewport: 固定顯示大小並可滾動 (綁 canvasRef) */}
      <div className="w-screen h-screen overflow-hidden">
        <div
          ref={canvasRef}
          id="canvas"
          className="relative w-full h-full overflow-auto cursor-none"
          style={{
            // 可視區背景
            background:
              "url('https://www.transparenttextures.com/patterns/washi.png')",
          }}
        >
          {/* 內部內容: 設為比 viewport 大 (minWidth/minHeight) */}
          <div
            ref={containerRef}
            id="skill-tree-container"
            style={{
              position: "relative",
              // 調整為比 viewport 大，例如 2000x1400；視需求改數值或使用內部元素決定大小
              minWidth: 1800,
              minHeight: 1400,
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
              <div
                className="line line-h"
                style={{ top: 52, left: 162, width: 116 }}
              />
              <div
                className="line line-v"
                style={{ top: 52, left: 278, height: 50 }}
              />
              <div
                className="line line-h"
                style={{ top: 102, left: 278, width: 50 }}
              />
              <div
                className="line line-h"
                style={{ top: 102, left: 228, width: 50 }}
              />
              <div
                className="line line-h line-active"
                style={{ top: 152, left: 187, width: 206 }}
              />
              <div
                className="line line-h"
                style={{ top: 52, left: 412, width: 116 }}
              />
              <div
                className="line line-v"
                style={{ top: 52, left: 412, height: 50 }}
              />
              <div
                className="line line-h"
                style={{ top: 102, left: 362, width: 50 }}
              />
              <div
                className="line line-h"
                style={{ top: 102, left: 412, width: 50 }}
              />
              <div
                className="line line-v"
                style={{ top: 182, left: 102, height: 50 }}
              />
              <div
                className="line line-h line-active"
                style={{ top: 232, left: 102, width: 50 }}
              />
              <div
                className="line line-h"
                style={{ top: 232, left: 52, width: 50 }}
              />
              <div
                className="line line-v"
                style={{ top: 232, left: 52, height: 50 }}
              />
              <div
                className="line line-v"
                style={{ top: 182, left: 102, height: 50 }}
              />
              <div
                className="line line-v"
                style={{ top: 182, left: 472, height: 50 }}
              />
              <div
                className="line line-h line-active"
                style={{ top: 232, left: 472, width: 50 }}
              />
              <div
                className="line line-h line-active"
                style={{ top: 232, left: 522, width: 50 }}
              />
              <div
                className="line line-v"
                style={{ top: 232, left: 572, height: 50 }}
              />
              <div className="absolute" style={{ top: 40, left: 150 }}>
                <div className="skill-node">
                  <div className="w-6 h-6 rounded-full bg-surface-light dark:bg-surface-dark border-2 border-border-light dark:border-border-dark flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500" />
                  </div>
                  <div className="tooltip absolute bottom-full mb-2 w-48 bg-surface-light dark:bg-surface-dark p-3 rounded-lg shadow-lg z-10 text-sm">
                    <h4 className="font-bold text-text-light dark:text-text-dark">
                      Introduction to Web
                    </h4>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      Learn the basics of how the web works.
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute" style={{ top: 40, left: 270 }}>
                <div className="skill-node">
                  <div className="w-6 h-6 rounded-full bg-surface-light dark:bg-surface-dark border-2 border-border-light dark:border-border-dark flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500" />
                  </div>
                  <div className="tooltip absolute bottom-full mb-2 w-48 bg-surface-light dark:bg-surface-dark p-3 rounded-lg shadow-lg z-10 text-sm">
                    <h4 className="font-bold text-text-light dark:text-text-dark">
                      HTML Basics
                    </h4>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      Structure your content with HTML.
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute" style={{ top: 90, left: 220 }}>
                <div className="skill-node">
                  <div className="w-6 h-6 rounded-full bg-surface-light dark:bg-surface-dark border-2 border-border-light dark:border-border-dark flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500" />
                  </div>
                  <div className="tooltip absolute bottom-full mb-2 w-48 bg-surface-light dark:bg-surface-dark p-3 rounded-lg shadow-lg z-10 text-sm">
                    <h4 className="font-bold text-text-light dark:text-text-dark">
                      CSS Fundamentals
                    </h4>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      Style your web pages with CSS.
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute" style={{ top: 90, left: 320 }}>
                <div className="skill-node">
                  <div className="w-6 h-6 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div className="tooltip absolute bottom-full mb-2 w-48 bg-surface-light dark:bg-surface-dark p-3 rounded-lg shadow-lg z-10 text-sm">
                    <h4 className="font-bold text-text-light dark:text-text-dark">
                      JavaScript Basics
                    </h4>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      Add interactivity with JavaScript.
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute" style={{ top: 140, left: 175 }}>
                <div className="skill-node">
                  <div className="w-6 h-6 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div className="tooltip absolute top-full mt-2 w-48 bg-surface-light dark:bg-surface-dark p-3 rounded-lg shadow-lg z-10 text-sm">
                    <h4 className="font-bold text-text-light dark:text-text-dark">
                      Version Control/Git
                    </h4>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      Track changes and collaborate with Git.
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute" style={{ top: 140, left: 380 }}>
                <div className="skill-node">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                  </div>
                  <div className="tooltip absolute top-full mt-2 w-48 bg-surface-light dark:bg-surface-dark p-3 rounded-lg shadow-lg z-10 text-sm">
                    <h4 className="font-bold text-text-light dark:text-text-dark">
                      Package Managers
                    </h4>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      Manage project dependencies with NPM/Yarn.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ top: "-200px" }}
              >
                <div className="main-node">Frontend</div>
              </div>
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ left: "-150px" }}
              >
                <div className="main-node">Soft Skills</div>
              </div>
              <div className="absolute" style={{ top: 220, left: 90 }}>
                <div className="skill-node">
                  <div className="w-6 h-6 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div className="tooltip absolute left-full ml-2 w-48 bg-surface-light dark:bg-surface-dark p-3 rounded-lg shadow-lg z-10 text-sm">
                    <h4 className="font-bold text-text-light dark:text-text-dark">
                      Communication
                    </h4>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      Effectively convey ideas to your team.
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute" style={{ top: 220, left: 40 }}>
                <div className="skill-node">
                  <div className="w-6 h-6 rounded-full bg-surface-light dark:bg-surface-dark border-2 border-border-light dark:border-border-dark flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500" />
                  </div>
                  <div className="tooltip absolute right-full mr-2 w-48 bg-surface-light dark:bg-surface-dark p-3 rounded-lg shadow-lg z-10 text-sm">
                    <h4 className="font-bold text-text-light dark:text-text-dark">
                      Teamwork
                    </h4>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      Collaborate effectively with others.
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute" style={{ top: 270, left: 40 }}>
                <div className="skill-node">
                  <div className="w-6 h-6 rounded-full bg-surface-light dark:bg-surface-dark border-2 border-border-light dark:border-border-dark flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500" />
                  </div>
                  <div className="tooltip absolute right-full mr-2 w-48 bg-surface-light dark:bg-surface-dark p-3 rounded-lg shadow-lg z-10 text-sm">
                    <h4 className="font-bold text-text-light dark:text-text-dark">
                      Problem Solving
                    </h4>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      Develop analytical thinking skills.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ top: 0, left: 150 }}
              >
                <div className="main-node">Backend</div>
              </div>
              <div className="absolute" style={{ top: 220, left: 460 }}>
                <div className="skill-node">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                  </div>
                  <div className="tooltip absolute right-full mr-2 w-48 bg-surface-light dark:bg-surface-dark p-3 rounded-lg shadow-lg z-10 text-sm">
                    <h4 className="font-bold text-text-light dark:text-text-dark">
                      Node.js
                    </h4>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      Build server-side applications with JavaScript.
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute" style={{ top: 220, left: 560 }}>
                <div className="skill-node">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                  </div>
                  <div className="tooltip absolute left-full ml-2 w-48 bg-surface-light dark:bg-surface-dark p-3 rounded-lg shadow-lg z-10 text-sm">
                    <h4 className="font-bold text-text-light dark:text-text-dark">
                      Databases
                    </h4>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      Learn about SQL and NoSQL databases.
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute" style={{ top: 270, left: 560 }}>
                <div className="skill-node">
                  <div className="w-6 h-6 rounded-full bg-surface-light dark:bg-surface-dark border-2 border-border-light dark:border-border-dark flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500" />
                  </div>
                  <div className="tooltip absolute left-full ml-2 w-48 bg-surface-light dark:bg-surface-dark p-3 rounded-lg shadow-lg z-10 text-sm">
                    <h4 className="font-bold text-text-light dark:text-text-dark">
                      APIs
                    </h4>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      Design and build RESTful APIs.
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute" style={{ top: 40, left: 400 }}>
                <div className="skill-node">
                  <div className="w-6 h-6 rounded-full bg-surface-light dark:bg-surface-dark border-2 border-border-light dark:border-border-dark flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500" />
                  </div>
                  <div className="tooltip absolute bottom-full mb-2 w-48 bg-surface-light dark:bg-surface-dark p-3 rounded-lg shadow-lg z-10 text-sm">
                    <h4 className="font-bold text-text-light dark:text-text-dark">
                      Pick a Framework
                    </h4>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      Choose between React, Vue, or Angular.
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute" style={{ top: 90, left: 450 }}>
                <div className="skill-node">
                  <div className="w-6 h-6 rounded-full bg-surface-light dark:bg-surface-dark border-2 border-border-light dark:border-border-dark flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500" />
                  </div>
                  <div className="tooltip absolute bottom-full mb-2 w-48 bg-surface-light dark:bg-surface-dark p-3 rounded-lg shadow-lg z-10 text-sm">
                    <h4 className="font-bold text-text-light dark:text-text-dark">
                      Build Tools
                    </h4>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      Learn about Webpack, Vite, etc.
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute" style={{ top: 90, left: 350 }}>
                <div className="skill-node">
                  <div className="w-6 h-6 rounded-full bg-surface-light dark:bg-surface-dark border-2 border-border-light dark:border-border-dark flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500" />
                  </div>
                  <div className="tooltip absolute bottom-full mb-2 w-48 bg-surface-light dark:bg-surface-dark p-3 rounded-lg shadow-lg z-10 text-sm">
                    <h4 className="font-bold text-text-light dark:text-text-dark">
                      CSS Preprocessors
                    </h4>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      Use Sass or Less for more powerful CSS.
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col items-center space-y-4">
                  <img
                    alt="Ryan Torres's profile picture"
                    className="w-20 h-20 rounded-lg border-4 border-surface-light dark:border-surface-dark shadow-lg"
                    src="images/new bu.png"
                  />
                  <div className="text-center w-28">
                    <h3 className="font-bold text-lg text-text-light dark:text-text-dark">
                      BunnyK
                    </h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                      Jr. Developer
                    </p>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">
                      Climbing towards
                    </p>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">
                      Mid Developer
                    </p>
                  </div>
                  <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-1.5">
                    <div
                      className="bg-green-500 h-1.5 rounded-full"
                      style={{ width: "60%" }}
                    />
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
        className="fixed w-8 h-8 rounded-full border-2 border-white pointer-events-none z-50 opacity-0 shadow-lg"
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
