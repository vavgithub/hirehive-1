import React from 'react'

/**
 * Figma shortlist sparkle:
 * - Equal-sized plus marks (top-right / bottom-left)
 * - Bottom-right sparkle curve is cut open; outlined 5-point star sits in the gap with padding
 */
const ShortlistSparkleIcon = ({
  size = 24,
  color = 'currentColor',
  strokeWidth = 1.5,
  className,
  ...props
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
    {...props}
  >
    {/*
      Sparkle split so the bottom-right connecting curve (Lucide's A2 join from
      right lobe → bottom lobe) is omitted. Open ends leave a padded pocket for the star.
    */}
    {/* Left + top + right lobes — stop further back from the bottom-right join */}
    <path d='M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L17.35 12.55' />

    {/* Bottom lobe — starts further back from the cut for wider left/right padding */}
    <path d='M12.55 17.35l-0.069 4.285a.5.5 0 0 1-.963 0L9.937 15.5' />

    {/* Top-right plus */}
    <path d='M20 3v4' />
    <path d='M22 5h-4' />

    {/* Bottom-left plus — same arm length as top-right */}
    <path d='M4 16v4' />
    <path d='M6 18H2' />

    {/* 5-point star nestled in the wider cut, padded from both open curve ends */}
    <path d='M16.2 14.55L16.65 15.75L17.95 15.85L16.95 16.7L17.25 18L16.2 17.25L15.15 18L15.45 16.7L14.45 15.85L15.75 15.75Z' />
  </svg>
)

export default ShortlistSparkleIcon
