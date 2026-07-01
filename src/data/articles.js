import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";

import hicksLaw from "../assets/md/hicks-law.md?raw";
import master from "../assets/md/master.md?raw";
import ggj from "../assets/md/ggj.md?raw";
import feedback from "../assets/md/feedback.md?raw";
import tutorial from "../assets/md/tutorial.md?raw";
import { createHeadingId } from "../utils/slugify";

export function extractHeadings(markdown, articleId) {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(markdown);
  const headings = [];
  const slugCounts = new Map();

  visit(tree, "heading", (node) => {
    const text = node.children
      .map((child) => {
        if (child.type === "text") return child.value;
        if (child.type === "inlineCode") return child.value;
        if (child.children) {
          return child.children
            .map((grandChild) => grandChild.value ?? "")
            .join("");
        }
        return "";
      })
      .join("");

    if (node.depth !== 2) {
      return;
    }

    const baseSlug = text.trim().toLowerCase().replace(/\s+/g, "-");
    const occurrence = slugCounts.get(baseSlug) ?? 0;
    slugCounts.set(baseSlug, occurrence + 1);

    headings.push({
      id: createHeadingId(articleId, text, occurrence),
      depth: node.depth,
      text,
    });
  });

  return headings;
}

export const articles = [
  {
    id: "master",
    title: "遊戲輸入判定閾值探討",
    content: master,
  },
  {
    id: "ggj",
    title: "GGJ 2021 作品的設計思路",
    content: ggj,
  },
  {
    id: "hicks-law",
    title: "Hick's Law 如何影響遊戲入門難度",
    content: hicksLaw,
  },
];
