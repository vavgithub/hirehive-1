import { useLayoutEffect, useRef } from 'react'

const StageProgressBar = ({ status }) => {
  const barRef = useRef(null)
  const progress = {
    Cleared: 100,
    Reviewed: 75,
    'Under Review': 50,
    'Call Scheduled': 20,
  }[status] ?? 0

  useLayoutEffect(() => {
    barRef.current?.style.setProperty('width', `${progress}%`)
  }, [progress])

  return (
    <div className="geode-progress" aria-hidden="true">
      <div className="geode-progress-track">
        <div ref={barRef} className="geode-progress-bar" />
      </div>
    </div>
  )
}

export default StageProgressBar
