import * as React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectSessionToken } from '../../app/slices/sessionSlice'
import { IFromState } from '../../types/locationState'

const NoRequireAuth: React.FC = () => {
  const auth = useAppSelector(selectSessionToken)
  const location = useLocation()
  const from: IFromState = { from: location }

  if (auth) {
    return <Navigate to="/" state={from} replace />
  }

  return <Outlet />
}

export default NoRequireAuth
