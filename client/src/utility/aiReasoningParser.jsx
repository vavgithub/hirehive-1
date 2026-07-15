import React from 'react';

/** Full set — kept for regex boundary correctness when splitting sections. */
export const AI_COMMENT_HEADINGS = [
  'Role-fit summary:',
  'Strengths:',
  'Gaps:',
  'To reach next level:',
];

export function parseAiReasoningSection(text, heading) {
  if (!text) return '';
  const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match =
    heading === 'To reach next level:'
      ? text.match(new RegExp(`${escapeRe(heading)}([\\s\\S]*)$`))
      : text.match(
          new RegExp(
            `${escapeRe(heading)}([\\s\\S]*?)(?=Strengths:|Gaps:|To reach next level:|Based on|$)`
          )
        );
  let content = match?.[1]?.trim() ?? '';
  if (heading === 'To reach next level:') {
    content = content.replace(/\(Based on[^)]*\)/g, '').trim();
  }
  return content;
}

/** Renders Strengths/Gaps only — Role-fit and To reach next level are excluded at the UI layer. */
export const AiCommentsContent = ({ aiReasoning, showTitle = true }) => (
  <div>
    {showTitle && <p className="typography-small-p text-font-gray mb-2">AI Comments</p>}
    {['Strengths:', 'Gaps:'].map((heading) => {
      const content = parseAiReasoningSection(aiReasoning ?? '', heading);
      return content ? (
        <div key={heading} className="mb-2">
          <p className="typography-small-p text-font-gray">{heading}</p>
          {content
            .split(';')
            .filter((s) => s.trim())
            .map((point, i) => (
              <p key={i} className="typography-small-p text-font-main">
                • {point.trim()}
              </p>
            ))}
        </div>
      ) : null;
    })}
  </div>
);
