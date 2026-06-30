import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion } from "framer-motion";
import { useMemo, useRef } from "react";
import { createHeadingId } from "../utils/slugify";

export default function MarkdownArticle({ article, headings = [] }) {
  const content = article.content;
  const headingIndexRef = useRef(0);

  const markdownComponents = useMemo(() => {
    headingIndexRef.current = 0;

    const createHeadingRenderer = (level, className, shouldTrack = false) => {
      return ({ children, ...props }) => {
        const text = String(children)
          .replace(/<[^>]*>/g, "")
          .trim();
        const heading = shouldTrack ? headings[headingIndexRef.current] : null;
        const resolvedId = heading?.id ?? createHeadingId(article.id, text);

        if (shouldTrack && heading) {
          headingIndexRef.current += 1;
        }

        const Tag = `h${level}`;
        return (
          <Tag
            id={resolvedId}
            className={className}
            data-heading={shouldTrack ? "true" : undefined}
            {...props}
          >
            {children}
          </Tag>
        );
      };
    };

    return {
      h1: createHeadingRenderer(
        1,
        "mb-8 mt-12 scroll-mt-24 text-4xl font-semibold tracking-tight text-white sm:text-5xl",
      ),
      h2: createHeadingRenderer(
        2,
        "mb-6 mt-12 scroll-mt-24 border-l-2 border-white/30 pl-5 text-2xl font-semibold text-white",
        true,
      ),
      h3: createHeadingRenderer(
        3,
        "mb-4 mt-8 scroll-mt-24 text-xl font-semibold text-white",
      ),
      p: ({ children, ...props }) => (
        <p className="mb-6 text-base leading-8 text-zinc-300" {...props}>
          {children}
        </p>
      ),
      ul: ({ children, ...props }) => (
        <ul className="mb-6 list-disc space-y-2 pl-6 text-zinc-300" {...props}>
          {children}
        </ul>
      ),
      ol: ({ children, ...props }) => (
        <ol
          className="mb-6 list-decimal space-y-2 pl-6 text-zinc-300"
          {...props}
        >
          {children}
        </ol>
      ),
      blockquote: ({ children, ...props }) => (
        <blockquote
          className="my-8 border-l-2 border-white/20 bg-white/5 px-5 py-4 italic text-zinc-300"
          {...props}
        >
          {children}
        </blockquote>
      ),
      code: ({ inline, className, children, ...props }) => {
        const match = /language-(\w+)/.exec(className || "");
        return !inline && match ? (
          <SyntaxHighlighter
            style={oneDark}
            language={match[1]}
            PreTag="div"
            className="mb-6 overflow-hidden rounded-2xl border border-white/10"
            {...props}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        ) : (
          <code
            className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm text-zinc-100"
            {...props}
          >
            {children}
          </code>
        );
      },
      img: ({ ...props }) => (
        <img
          className="my-8 w-full rounded-2xl border border-white/10 object-cover shadow-2xl shadow-black/30"
          {...props}
        />
      ),
      table: ({ children, ...props }) => (
        <div className="mb-8 overflow-hidden rounded-2xl border border-white/10">
          <table
            className="min-w-full divide-y divide-white/10 text-sm text-zinc-300"
            {...props}
          >
            {children}
          </table>
        </div>
      ),
      thead: ({ children, ...props }) => (
        <thead className="bg-white/10" {...props}>
          {children}
        </thead>
      ),
      th: ({ children, ...props }) => (
        <th className="px-4 py-3 text-left font-semibold text-white" {...props}>
          {children}
        </th>
      ),
      td: ({ children, ...props }) => (
        <td className="border-t border-white/10 px-4 py-3" {...props}>
          {children}
        </td>
      ),
      a: ({ children, href, ...props }) => (
        <a
          href={href}
          className="text-cyan-400 underline-offset-4 hover:underline"
          {...props}
        >
          {children}
        </a>
      ),
    };
  }, [article.id, headings]);

  return (
    <motion.article
      id={article.id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-3xl rounded-[2rem] border border-white bg-[#111111]/90 p-8 shadow-2xl shadow-black/20 sm:p-10 lg:p-12"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
        skipHtml
      >
        {content}
      </ReactMarkdown>
    </motion.article>
  );
}
