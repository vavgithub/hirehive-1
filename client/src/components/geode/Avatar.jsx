import { useState } from 'react'

const stockPhoto = (src) => !src || /Profile\.png/i.test(src)

export function GeodeAvatar({ src, name = '' }) {
  const [failed, setFailed] = useState(false)
  const initial = name.trim().slice(0, 1).toUpperCase() || '·'

  if (stockPhoto(src) || failed) {
    return (
      <span className="geode-avatar-fallback" aria-hidden="true">
        {initial}
      </span>
    )
  }

  return (
    <img
      src={src}
      alt=""
      className="h-full w-full object-cover"
      onError={() => setFailed(true)}
    />
  )
}
