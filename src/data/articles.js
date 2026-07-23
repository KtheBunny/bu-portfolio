import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";

import hicksLaw from "../assets/md/hicks-law.md?raw";
import master from "../assets/md/master.md?raw";
import ggj from "../assets/md/ggj.md?raw";
import eminence from "../assets/md/eminence.md?raw";
import mariokart from "../assets/md/mariokart.md?raw";
import deadcell from "../assets/md/deadcell.md?raw";
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
    id: "hicks-law",
    title: "Hick's Law 如何影響遊戲入門難度",
    content: hicksLaw,
  },
  {
    id: "deadcell",
    title: "分析 Dead Cells 並嘗試在 Minecraft 中重現關卡生成設計",
    content: deadcell,
  },
  {
    id: "mariokart",
    title: "從 Mario Kart 分析如何平衡操作深度與學習曲線",
    content: mariokart,
  },
  {
    id: "ggj",
    title: "GGJ 2021 作品的設計思路",
    content: ggj,
  },
  {
    id: "eminence",
    title: "《Eminence》遊戲設計文件記錄",
    content: eminence,
  },
];
