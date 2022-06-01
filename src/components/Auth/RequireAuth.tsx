import * as React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthRequire } from '../../hooks/useAuthRequire'

const RequireAuth: React.FC = () => {
  const { auth, from } = useAuthRequire()

  if (!auth) {
    return <Navigate to="/login" state={from} replace />
  }

  return <Outlet />
}

export default RequireAuth
