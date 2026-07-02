import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { articles, extractHeadings } from "../data/articles";
import HeroNav from "../components/HeroNav";
import Sidebar from "../components/Sidebar";
import MarkdownArticle from "../components/MarkdownArticle";
import Footer from "../components/Footer";
import useActiveArticle from "../hooks/useActiveArticle";
import useActiveHeading from "../hooks/useActiveHeading";

const scrollToElement = (targetId) => {
  const target = document.getElementById(targetId);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

export default function Articles() {
  const [expandedArticleId, setExpandedArticleId] = useState(
    articles[0]?.id ?? null,
  );
  const [isProgrammaticScrolling, setIsProgrammaticScrolling] = useState(false);
  const scrollTimerRef = useRef(null);

  const articleIds = useMemo(() => articles.map((article) => article.id), []);
  const headingsByArticle = useMemo(
    () =>
      articles.reduce((result, article) => {
        result[article.id] = extractHeadings(article.content, article.id);
        return result;
      }, {}),
    [],
  );

  const currentArticle = useActiveArticle(articleIds, isProgrammaticScrolling);
  const currentHeading = useActiveHeading(
    currentArticle,
    isProgrammaticScrolling,
  );

  useEffect(() => {
    if (currentArticle) {
      setExpandedArticleId(currentArticle);
    }
  }, [currentArticle]);

  const handleSelectArticle = useCallback((articleId) => {
    setExpandedArticleId(articleId);
    setIsProgrammaticScrolling(true);
    scrollToElement(articleId);

    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
    }

    scrollTimerRef.current = window.setTimeout(() => {
      setIsProgrammaticScrolling(false);
    }, 900);
  }, []);

  const handleSelectHeading = useCallback((articleId, headingId) => {
    setExpandedArticleId(articleId);
    setIsProgrammaticScrolling(true);
    const headingElement = document.getElementById(headingId);
    if (headingElement) {
      headingElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
    }

    scrollTimerRef.current = window.setTimeout(() => {
      setIsProgrammaticScrolling(false);
    }, 900);
  }, []);

  const handleScrollDown = useCallback(() => {
    setIsProgrammaticScrolling(true);
    scrollToElement(articles[0]?.id ?? "");

    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
    }

    scrollTimerRef.current = window.setTimeout(() => {
      setIsProgrammaticScrolling(false);
    }, 900);
  }, []);

  useEffect(() => {
    return () => {
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, []);

  return (
    <main className="ml-14 min-h-screen bg-[#0f0f0f] text-white">
      <HeroNav
        articles={articles}
        onSelectArticle={handleSelectArticle}
        onScrollDown={handleScrollDown}
      />

      <section className="mx-auto flex max-w-7xl gap-10 px-6 pb-24 pt-10 lg:px-10">
        <Sidebar
          articles={articles}
          currentArticle={currentArticle}
          currentHeading={currentHeading}
          expandedArticleId={expandedArticleId}
          headingsByArticle={headingsByArticle}
          onArticleSelect={handleSelectArticle}
          onHeadingSelect={handleSelectHeading}
        />

        <div className="min-w-0 flex-1 space-y-8">
          {articles.map((article) => (
            <div key={article.id}>
              <MarkdownArticle
                article={article}
                headings={headingsByArticle[article.id] ?? []}
              />
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-10 pb-24 text-center"><div className="border-b max-w-6xl border-white" /></section>
      
      <Footer/>
    </main>
  );
}
