export function slugifyHeading(value) {
  return String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u00C0-\u024f\u4e00-\u9fff\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function createHeadingId(articleId, headingText, occurrence = 0) {
  const slug = slugifyHeading(headingText) || "section";
  const suffix = occurrence > 0 ? `-${occurrence}` : "";
  return `${articleId}__${slug}${suffix}`;
}
