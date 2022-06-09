import { EntityId } from '@reduxjs/toolkit'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectArticleById } from '../../app/slices/articlesSlice'
import { IProfile } from '../../types/profile'
import TagList from '../Tag/TagList'
import FavoriteButton from '../UI/FavoriteButton'
import UserMeta from '../UI/UserMeta'

interface ArticlePreviewProps {
  id: EntityId
}

const ArticlePreview: React.FC<ArticlePreviewProps> = ({ id }) => {
  const article = useAppSelector(state => selectArticleById(state, id))

  if (!article) return null

  return (
    <div className="article-preview">
      <div className="article-meta">
        <UserMeta article={article} />
        <FavoriteButton className="pull-xs-right" article={article}>
          {article.favoritesCount}
        </FavoriteButton>
      </div>
      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <TagList tags={article.tagList} />
      </Link>
    </div>
  )
}

export default React.memo(ArticlePreview)
