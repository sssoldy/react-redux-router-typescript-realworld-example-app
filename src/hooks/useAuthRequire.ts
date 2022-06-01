import { useLocation } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectUserToken } from '../app/slices/userSlice'
import { IFromState } from '../types/locationState'

export const useAuthRequire = () => {
  const auth = useAppSelector(selectUserToken)
  const location = useLocation()
  const from: IFromState = { from: location }

  return {
    auth,
    from,
  }
}
