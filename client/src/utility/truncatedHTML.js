import DOMPurify from "dompurify";

export const truncatedText = (content, length) => {
  if (!content) return "";

  // Sanitize but allow specific tags
  const cleanHtml = DOMPurify.sanitize(content, { ALLOWED_TAGS: ["ul", "li", "b", "i", "strong", "em"] });

  // Convert to a temporary div
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = cleanHtml;

  let text = tempDiv.innerHTML; // ✅ Keep HTML structure

  // Truncate while keeping HTML
  if (text.length > length) {
    text = text.slice(0, length) + "...."; // Truncate safely
  }

  return text;
};
