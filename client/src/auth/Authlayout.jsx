import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const Authlayout = () => {
  useEffect(() => {
    document.documentElement.dataset.geodeSkin = 'on'
    return () => {
      delete document.documentElement.dataset.geodeSkin
    }
  }, [])

  return (
    <div className="geode min-h-screen">
      <Outlet />
    </div>
  )
}

export default Authlayout