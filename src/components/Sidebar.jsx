import { motion } from "framer-motion";

export default function Sidebar({
  articles,
  currentArticle,
  currentHeading,
  expandedArticleId,
  headingsByArticle,
  onArticleSelect,
  onHeadingSelect,
}) {
  return (
    <aside className="hidden lg:block lg:w-[280px] lg:shrink-0">
      <div className="sticky top-24 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <p className="mb-5 text-sm uppercase tracking-widest text-zinc-500">
          文章總覽
        </p>

        <div className="space-y-2">
          {articles.map((article) => {
            const isActive = currentArticle === article.id;
            const isExpanded = expandedArticleId === article.id;
            const headings = headingsByArticle[article.id] ?? [];

            return (
              <div
                key={article.id}
                className="rounded-2xl border border-white/5 bg-black/20"
              >
                <button
                  onClick={() => onArticleSelect(article.id)}
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition ${isActive ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`}
                >
                  <span className="text-sm font-medium">{article.title}</span>
                  <span
                    className={`text-xs ${isActive ? "text-white" : "text-zinc-500"}`}
                  >
                    {headings.length > 0 ? `${headings.length}` : "•"}
                  </span>
                </button>

                {isExpanded && (
                  <motion.div
                    initial={false}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-white/10 px-3 py-3">
                      {headings.map((heading) => {
                        const isHeadingActive = currentHeading === heading.id;
                        return (
                          <button
                            key={heading.id}
                            onClick={() =>
                              onHeadingSelect(article.id, heading.id)
                            }
                            className={`mb-2 flex w-full items-start rounded-xl px-3 py-2 text-left text-sm transition ${isHeadingActive ? "bg-white/15 text-white" : "text-zinc-400 hover:bg-white/10 hover:text-white"}`}
                          >
                            <span
                              className={`mr-2 mt-1 h-2 w-2 shrink-0 rounded-full ${isHeadingActive ? "bg-white" : "bg-zinc-600"}`}
                            />
                            <span className="leading-6">{heading.text}</span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
