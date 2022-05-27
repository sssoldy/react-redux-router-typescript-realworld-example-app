import { useLocation } from 'react-router-dom'

export const useLocationState = <T = unknown>() => {
  const location = useLocation()
  const state = location.state
  return state as Partial<T> | null
}
