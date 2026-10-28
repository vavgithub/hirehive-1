import { clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['geode-h4', 'geode-h6', 'geode-body', 'geode-small', 'geode-display'] }],
      'text-color': [{ text: ['geode-text', 'geode-muted', 'geode-action', 'geode-action-text', 'geode-ink', 'geode-ink-text'] }],
      'font-family': [{ font: ['geode', 'gilroy'] }],
      'font-weight': [{ font: ['geode-heading', 'geode-body'] }],
    },
  },
})

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
