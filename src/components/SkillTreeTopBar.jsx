import icon from "../assets/icon.jpg";
import {
  FloatingOverlay,
  FloatingPortal,
  offset,
  useFloating,
  useClick,
  useDismiss,
  useInteractions,
  autoUpdate,
} from "@floating-ui/react";
import { useEffect, useState } from "react";

// localStorage key 給第一次查看的使用者，之後就不再顯示提示
const WORK_BRANCH_HINT_KEY = "work-branch-hint-dismissed";

export default function SkillTreeTopBar({ applySelection }) {
  //
  // 首次查看提示
  //
  const [showHint, setShowHint] = useState(false);
  const [referenceRect, setReferenceRect] = useState(null);

  const { refs, floatingStyles } = useFloating({
    placement: "bottom",
    middleware: [offset(12)],
    whileElementsMounted: autoUpdate,
  });

  useEffect(() => {
    const dismissed = localStorage.getItem(WORK_BRANCH_HINT_KEY);

    if (!dismissed) {
      setShowHint(true);
    }
  }, []);

  useEffect(() => {
    if (!showHint) return;

    const referenceEl = refs.reference.current;

    if (!referenceEl) return;

    const updateRect = () => {
      setReferenceRect(referenceEl.getBoundingClientRect());
    };

    updateRect();

    return autoUpdate(referenceEl, referenceEl, updateRect);
  }, [showHint, refs.reference]);

  const handleDismiss = () => {
    localStorage.setItem(WORK_BRANCH_HINT_KEY, "true");
    setShowHint(false);
  };

  //
  // 學歷說明 popup
  //
  const [eduOpen, setEduOpen] = useState(false);

  const {
    refs: eduRefs,
    floatingStyles: eduStyles,
    context: eduContext,
  } = useFloating({
    open: eduOpen,
    onOpenChange: setEduOpen,
    placement: "bottom",
    middleware: [offset(8)],
    whileElementsMounted: autoUpdate,
  });

  const eduClick = useClick(eduContext);
  const eduDismiss = useDismiss(eduContext);
  const {
    getReferenceProps: getEduReferenceProps,
    getFloatingProps: getEduFloatingProps,
  } = useInteractions([eduClick, eduDismiss]);

  //
  // 預設技能組合 popup
  //
  const [branchOpen, setBranchOpen] = useState(false);

  const {
    refs: branchRefs,
    floatingStyles: branchStyles,
    context: branchContext,
  } = useFloating({
    open: branchOpen,
    onOpenChange: setBranchOpen,
    placement: "bottom",
    middleware: [offset(8)],
    whileElementsMounted: autoUpdate,
  });

  const branchClick = useClick(branchContext);
  const branchDismiss = useDismiss(branchContext);
  const {
    getReferenceProps: getBranchReferenceProps,
    getFloatingProps: getBranchFloatingProps,
  } = useInteractions([branchClick, branchDismiss]);

  return (
    <>
      <header className="fixed left-0 top-0 z-40 flex w-screen items-center justify-between p-4 pl-20">
        <div>
          <span className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">
            © Ian Keefe / Unsplash
          </span>
        </div>

        <div className="flex items-center space-x-4">
          {/* 學歷 */}
          <div
            ref={eduRefs.setReference}
            {...getEduReferenceProps()}
            className={`flex h-12 w-fit cursor-pointer items-center justify-center rounded-[4px] border border-[rgba(255,255,255,0.25)] p-4 text-center text-text-secondary-light shadow-lg backdrop-blur-[1.5px] transition duration-200 hover:border-white hover:bg-white/10 hover:text-white dark:text-text-secondary-dark ${
              eduOpen ? "border-white bg-white/10 text-white" : ""
            } `}
          >
            <span className="material-symbols-outlined mr-1">star</span>
            <span className="font-semibold">學歷 - 研究生</span>
          </div>

          {/* 工作分支按鈕 */}
          <div
            ref={(node) => {
              refs.setReference(node);
              branchRefs.setReference(node);
            }}
            {...getBranchReferenceProps()}
            className={`flex h-12 w-fit cursor-pointer items-center justify-center rounded-[4px] border border-[rgba(255,255,255,0.25)] p-4 text-center text-text-secondary-light shadow-lg backdrop-blur-[1.5px] transition duration-200 hover:border-white hover:bg-white/10 hover:text-white dark:text-text-secondary-dark ${
              branchOpen ? "border-white bg-white/10 text-white" : ""
            } `}
          >
            <span className="material-symbols-outlined mr-1">layers</span>
            <span className="cursor-pointer font-semibold">工作分支選擇</span>
          </div>

          <img
            alt="User avatar"
            className="h-12 w-12 rounded-[4px] shadow-lg"
            src={icon}
          />
        </div>
      </header>

      {/* Onboarding Hint */}
      {showHint && referenceRect && (
        <FloatingPortal>
          <FloatingOverlay lockScroll className="z-50 bg-black/50" />

          {/* 高亮 */}
          <div
            style={{
              position: "fixed",
              left: referenceRect.left,
              top: referenceRect.top,
              width: referenceRect.width,
              height: referenceRect.height,
            }}
            className="z-[70]"
          >
            <div className="flex h-full w-full items-center justify-center rounded-[4px] border border-white/40 bg-white/10 shadow-[0_0_25px_rgba(255,255,255,0.25)] backdrop-blur-[2px]">
              <span className="material-symbols-outlined mr-1">layers</span>

              <span className="font-semibold">工作分支選擇</span>
            </div>
          </div>

          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className="fixed z-[60] w-[200px] rounded-xl bg-white p-4 shadow-2xl drop-shadow-lg lg:w-[280px] dark:bg-zinc-900/70"
          >
            <div className="mb-4 text-sm text-zinc-700 dark:text-zinc-200">
              點擊這裡可以查看根據職業種類預設的技能組合。
            </div>

            <button
              onClick={handleDismiss}
              className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              我知道了
            </button>
          </div>
        </FloatingPortal>
      )}

      {eduOpen && (
        <FloatingPortal>
          <div
            ref={eduRefs.setFloating}
            style={eduStyles}
            {...getEduFloatingProps()}
          >
            <div className="flex flex-col items-center justify-center gap-2 rounded-[4px] border-[1px] border-solid border-[rgba(255,255,255,0.5)] p-4 shadow-[0_6px_14px_rgba(0,0,0,0.35)] backdrop-blur-[2px]">
              國立臺北教育大學 數位科技設計學系玩具與遊戲設計碩士班 | 碩士畢業
            </div>
          </div>
        </FloatingPortal>
      )}

      {branchOpen && (
        <FloatingPortal>
          <div
            ref={branchRefs.setFloating}
            style={branchStyles}
            {...getBranchFloatingProps()}
          >
            <div className="flex flex-col items-center justify-center gap-2 rounded-[4px] border-[1px] border-solid border-[rgba(255,255,255,0.5)] p-1 shadow-[0_6px_14px_rgba(0,0,0,0.35)] backdrop-blur-[2px]">
              <button
                className="w-full px-4 py-2 text-center hover:bg-zinc-100/10"
                onClick={() => {
                  applySelection([]);
                  setBranchOpen(false);
                }}
              >
                （無）
              </button>
              <button
                className="w-full px-4 py-2 text-center hover:bg-zinc-100/10"
                onClick={() => {
                  // 前端工程師預設：[21,27,28,30,31,32,33]
                  applySelection([21, 27, 28, 30, 31, 32, 33]);
                  setBranchOpen(false);
                }}
              >
                前端工程師
              </button>
              <button
                className="w-full px-4 py-2 text-center hover:bg-zinc-100/10"
                onClick={() => {}}
              >
                遊戲工程師
              </button>
              <button
                className="w-full px-4 py-2 text-center hover:bg-zinc-100/10"
                onClick={() => {}}
              >
                遊戲美術
              </button>
              <button
                className="w-full px-4 py-2 text-center hover:bg-zinc-100/10"
                onClick={() => {}}
              >
                技術美術
              </button>
              <button
                className="w-full px-4 py-2 text-center hover:bg-zinc-100/10"
                onClick={() => {}}
              >
                UI 設計師
              </button>
            </div>
          </div>
        </FloatingPortal>
      )}
    </>
  );
}
