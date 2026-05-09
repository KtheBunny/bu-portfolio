import { createContext, useContext, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const TransitionContext = createContext();

export function TransitionProvider({ children }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetPath, setTargetPath] = useState(null);
  const [phase, setPhase] = useState("idle"); // "idle" | "enter" | "exit"

  const enterResolveRef = useRef(null);
  const exitResolveRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const playTransition = async (path) => {
    if (location.pathname === path) return;

    if (phase !== "idle") return;

    setTargetPath(path);
    setPhase("enter");

    // 等 enter 完
    await new Promise((resolve) => {
      enterResolveRef.current = resolve;
    });

    navigate(path);

    setPhase("exit");

    // 等 exit 完
    await new Promise((resolve) => {
      exitResolveRef.current = resolve;
    });

    setPhase("idle");
  };

  const completeEnter = () => {
    enterResolveRef.current?.();
    enterResolveRef.current = null;
  };

  const completeExit = () => {
    exitResolveRef.current?.();
    exitResolveRef.current = null;
  };

  return (
    <TransitionContext.Provider
      value={{
        phase,
        playTransition,
        completeEnter,
        completeExit,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

export function usePageTransition() {
  return useContext(TransitionContext);
}
