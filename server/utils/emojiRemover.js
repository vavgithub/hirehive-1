import emojiRegex from 'emoji-regex';

export function removeEmojis(html) {
  const regex = emojiRegex();
  return html.replace(regex, '');
}
