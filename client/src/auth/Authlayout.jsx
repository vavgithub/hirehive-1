import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth';

const Authlayout = () => {
  // const token = localStorage.getItem('accessToken');
  // if (token) {
  //   return <Navigate to="/" />
  // }
  const { auth } = useAuth();
  return (
    <div>  
      <Outlet />
    </div>
  )
}

export default Authlayout