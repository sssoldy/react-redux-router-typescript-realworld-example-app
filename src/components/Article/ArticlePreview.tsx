import { EntityId } from '@reduxjs/toolkit'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectArticleById } from '../../app/slices/articlesSlice'
import { formatDate } from '../../utils/misc'

interface ArticlePreviewProps {
  id: EntityId
}

const ArticlePreview: React.FC<ArticlePreviewProps> = ({ id }) => {
  const article = useAppSelector(state => selectArticleById(state, id))

  if (!article) return null

  const { author } = article

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
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
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
