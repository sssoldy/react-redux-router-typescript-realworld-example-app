import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import {
  favoriteArticle,
  unfavoriteArticle,
} from '../../app/slices/articleSlice'
import { useAuthRequire } from '../../hooks/useAuthRequire'
import { ResponseStatus } from '../../types/api'
import { IArticle } from '../../types/articles'
import { IResponseError } from '../../types/error'
import ErrorList from '../Error/ErrorList'
import Button from './Button'
import Spinner from './Spinner/Spinner'

interface FavoriteButtonProps {
  article: IArticle
  className?: string
  children: React.ReactNode
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  article,
  className = '',
  children,
}) => {
  const [status, setStatus] = React.useState<ResponseStatus>('idle')
  const [error, setError] = React.useState<IResponseError | null>(null)

  const isFavorited = article.favorited || false
  const canFavorite = status === 'idle'

  const { auth, from } = useAuthRequire()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onFavoriteClicked = async () => {
    if (!auth) {
      navigate('/login', { state: from, replace: true })
      return
    }
    if (!canFavorite) return

    try {
      setError(null)
      setStatus('loading')
      isFavorited
        ? await dispatch(unfavoriteArticle(article.slug)).unwrap()
        : await dispatch(favoriteArticle(article.slug)).unwrap()
      setStatus('successed')
    } catch (error) {
      setError(error as IResponseError)
    } finally {
      setStatus('idle')
    }
  }

  return (
    <Button
      isActive={isFavorited}
      variant="primary"
      icon="ion-heart"
      className={className}
      disabled={!canFavorite}
      onClick={onFavoriteClicked}
    >
      {children} {status === 'loading' && <Spinner />}
      <ErrorList error={error} />
    </Button>
  )
}

export default FavoriteButton
