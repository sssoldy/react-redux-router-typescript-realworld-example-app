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
import { IResError } from '../../types/error'
import ErrorList from '../Error/ErrorList'
import Button from './Button'
import Spinner from './Spinner/Spinner'

interface FavoriteButtonProps {
  article: IArticle
  className?: string
  [x: string]: any
  children: React.ReactNode
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  article,
  className = '',
  children,
  ...props
}) => {
  const [status, setStatus] = React.useState<ResponseStatus>('idle')
  const [error, setError] = React.useState<IResError | null>(null)
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
      setError(error as IResError)
    } finally {
      setStatus('idle')
    }
  }

  const favoriteBtn = (
    <Button
      className={`btn-primary ${className}`}
      icon="ion-heart"
      disabled={!canFavorite}
      {...props}
      onClick={onFavoriteClicked}
    >
      {children} {status === 'loading' && <Spinner />}
    </Button>
  )
  const unFavoriteBtn = (
    <Button
      className={`btn-outline-primary ${className}`}
      icon="ion-heart"
      disabled={!canFavorite}
      {...props}
      onClick={onFavoriteClicked}
    >
      {children} {status === 'loading' && <Spinner />}
    </Button>
  )
  return (
    <React.Fragment>
      {isFavorited ? favoriteBtn : unFavoriteBtn}
      <ErrorList error={error} />
    </React.Fragment>
  )
}

export default FavoriteButton
