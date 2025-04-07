import DOMPurify from "dompurify";

export const truncatedText = (content, length) => {
  if (!content) return "";

  // Sanitize but allow specific tags
  const cleanHtml = DOMPurify.sanitize(content, { 
    ALLOWED_TAGS: ["ul", "li", "b", "i", "strong", "em", "p", "br"] 
  });

  // Convert to a temporary div
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = cleanHtml;

  // Preserve line breaks for block elements
  tempDiv.querySelectorAll("p, div").forEach((el) => {
    el.innerHTML += "\n"; // Add newline after block elements
  });

  let text = tempDiv.innerHTML; // ✅ Keep HTML structure with newlines

  // Truncate while keeping HTML
  if (text.length > length) {
    text = text.slice(0, length) + "...."; // Truncate safely
  }

  return text;
};

export const isTruncationNeeded = (content, length) => {
  if (!content) return false;

  // Sanitize but allow specific tags
  const cleanHtml = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ["ul", "li", "b", "i", "strong", "em", "p", "br"],
  });

  // Convert to a temporary div
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = cleanHtml;

  // Preserve line breaks for block elements
  tempDiv.querySelectorAll("p, div").forEach((el) => {
    el.innerHTML += "\n";
  });

  const text = tempDiv.innerHTML;

  return text.length > length;
};