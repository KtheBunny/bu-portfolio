import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function HeroNav({ articles, onSelectArticle, onScrollDown }) {
  return (
    <section className="relative flex h-1/2 flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-20 text-center sm:px-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl"
      >
        <h1 className="font-gugi text-5xl leading-tight text-white">
          Game Design Notes
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-zinc-400 sm:text-xl">
          分享遊戲設計、遊戲開發、UX、認知心理學等相關筆記
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {articles.map((article, index) => (
            <motion.button
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index + 0.3, duration: 0.5 }}
              onClick={() => onSelectArticle(article.id)}
              className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium tracking-[0.18em] text-zinc-200 backdrop-blur-sm transition-colors hover:border-white/35 hover:bg-white/10"
            >
              {article.title}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
