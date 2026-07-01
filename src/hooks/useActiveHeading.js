import { useEffect, useState } from "react";

const HEADING_OFFSET = 120;

export default function useActiveHeading(articleId, isProgrammaticScrolling) {
  const [currentHeading, setCurrentHeading] = useState(null);

  useEffect(() => {
    if (!articleId) {
      setCurrentHeading(null);
      return undefined;
    }

    const root = document.getElementById(articleId);
    const headings = root
      ? Array.from(root.querySelectorAll("[data-heading='true']"))
      : [];

    if (!headings.length) {
      setCurrentHeading(null);
      return undefined;
    }

    const updateActiveHeading = () => {
      if (isProgrammaticScrolling) {
        return;
      }

      const rankedHeadings = headings
        .map((heading) => ({
          id: heading.id,
          top: heading.getBoundingClientRect().top,
        }))
        .filter(({ top }) => top <= HEADING_OFFSET + 8)
        .sort((a, b) => b.top - a.top);

      const nextHeading = rankedHeadings[0] ?? null;
      setCurrentHeading((previous) =>
        previous === nextHeading?.id ? previous : (nextHeading?.id ?? null),
      );
    };

    updateActiveHeading();

    let frameId = null;
    const handleScroll = () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
      frameId = window.requestAnimationFrame(updateActiveHeading);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [articleId, isProgrammaticScrolling]);

  return currentHeading;
}
