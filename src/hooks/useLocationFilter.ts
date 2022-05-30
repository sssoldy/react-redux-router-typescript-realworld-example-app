import { useLocation, useParams } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectArticlesFilter } from '../app/slices/articlesSlice'
import { selectUser } from '../app/slices/userSlice'

export const useLocationFilter = () => {
  const { username } = useParams()
  const { pathname } = useLocation()
  const user = useAppSelector(selectUser)
  const filter = useAppSelector(selectArticlesFilter)
  const isHome = pathname === '/'
  const isUser = username === user?.username

  return {
    username,
    user,
    filter,
    isHome,
    isUser,
  }
}
