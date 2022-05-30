import { EntityId } from '@reduxjs/toolkit'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

import {
  favoriteArticle,
  selectArticleById,
  unfavoriteArticle,
} from '../../app/slices/articlesSlice'
import { formatDate } from '../../utils/misc'

interface ArticlePreviewProps {
  id: EntityId
}

const ArticlePreview: React.FC<ArticlePreviewProps> = ({ id }) => {
  const article = useAppSelector(state => selectArticleById(state, id))

  const dispatch = useAppDispatch()

  if (!article) return null

  const { author } = article
  const isFavorited = article.favorited
  const favoriteClass = isFavorited ? 'btn-primary' : 'btn-outline-primary'

  const onFavoriteClicked = () => {
    isFavorited
      ? dispatch(unfavoriteArticle(article.slug))
      : dispatch(favoriteArticle(article.slug))
  }

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/profile/${author.username}`}>
          <img src={author.image} alt={author.username} />
        </Link>
        <div className="info">
          <Link to={`/profile/${author.username}`} className="author">
            {author.username}
          </Link>
          <span className="date">{formatDate(article.createdAt)}</span>
        </div>
        <button
          className={`btn btn-sm pull-xs-right ${favoriteClass}`}
          onClick={onFavoriteClicked}
        >
          <i className="ion-heart"></i> {article.favoritesCount}
        </button>
      </div>
      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  )
}

export default ArticlePreview
