import * as React from 'react'
import { useAppDispatch } from '../../app/hooks'
import {
  favoriteArticleSingle,
  unfavoriteArticleSingle,
} from '../../app/slices/articleSlice'
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
  const canFavorite = status !== 'loading'

  const dispatch = useAppDispatch()

  const onFavoriteClicked = async () => {
    if (!canFavorite) return
    try {
      setStatus('loading')
      isFavorited
        ? await dispatch(unfavoriteArticleSingle(article.slug)).unwrap()
        : await dispatch(favoriteArticleSingle(article.slug)).unwrap()
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
