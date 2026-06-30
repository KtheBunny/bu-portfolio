import { useEffect, useState } from "react";

const ARTICLE_OFFSET = 160;

export default function useActiveArticle(articleIds, isProgrammaticScrolling) {
  const [currentArticle, setCurrentArticle] = useState(articleIds[0] ?? null);

  useEffect(() => {
    if (!articleIds.length) {
      setCurrentArticle(null);
      return undefined;
    }

    const elements = articleIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) {
      setCurrentArticle(articleIds[0] ?? null);
      return undefined;
    }

    const updateActiveArticle = () => {
      if (isProgrammaticScrolling) {
        return;
      }

      const rankedArticles = elements
        .map((element) => ({
          id: element.id,
          top: element.getBoundingClientRect().top,
        }))
        .filter(({ top }) => top <= ARTICLE_OFFSET + 8)
        .sort((a, b) => b.top - a.top);

      const nextArticle = rankedArticles[0] ?? null;
      setCurrentArticle((previous) =>
        previous === nextArticle?.id
          ? previous
          : (nextArticle?.id ?? articleIds[0]),
      );
    };

    updateActiveArticle();

    let frameId = null;
    const handleScroll = () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
      frameId = window.requestAnimationFrame(updateActiveArticle);
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
  }, [articleIds, isProgrammaticScrolling]);

  return currentArticle;
}
