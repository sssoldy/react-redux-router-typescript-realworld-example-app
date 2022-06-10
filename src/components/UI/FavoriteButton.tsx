import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  favoriteArticle,
  unfavoriteArticle,
} from '../../app/slices/articleSlice'
import { useAsyncThunk } from '../../hooks/useAsyncThunk'
import { useAuthRequire } from '../../hooks/useAuthRequire'
import { IArticle } from '../../types/articles'
import ErrorAlert from './Error/ErrorAlert'
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
  const { isIdle, isLoading, error, reset, run } = useAsyncThunk()
  const isFavorited = article.favorited || false
  const canFavorite = isIdle

  const { auth, from } = useAuthRequire()

  const navigate = useNavigate()

  const onFavoriteClicked = async () => {
    if (!auth) {
      navigate('/login', { state: from, replace: true })
      return
    }
    if (!canFavorite) return

    isFavorited
      ? await run(unfavoriteArticle(article.slug))
      : await run(favoriteArticle(article.slug))
  }

  return (
    <>
      <Button
        isActive={isFavorited}
        variant="primary"
        icon="ion-heart"
        className={className}
        disabled={!canFavorite}
        onClick={onFavoriteClicked}
      >
        {children} {isLoading && <Spinner />}
      </Button>
      {error && <ErrorAlert error={error} hideError={reset} />}
    </>
  )
}

export default FavoriteButton
