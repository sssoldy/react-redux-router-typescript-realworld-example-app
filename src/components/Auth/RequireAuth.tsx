import * as React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectUserToken } from '../../app/slices/userSlice'
import { IFromState } from '../../types/locationState'

const RequireAuth: React.FC = () => {
  const auth = useAppSelector(selectUserToken)
  const location = useLocation()
  const from: IFromState = { from: location }
  console.log('Auth:' + Boolean(auth))

  if (!auth) {
    return <Navigate to="/login" state={from} replace />
  }

  return <Outlet />
}

export default RequireAuth
