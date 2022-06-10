import { EntityId } from '@reduxjs/toolkit'
import * as React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectArticleById } from '../../app/slices/articlesSlice'
import ArticleItemContent from './ArticleItemContent'

interface ArticleItemProps {
  id: EntityId
}

const ArticleItem: React.FC<ArticleItemProps> = ({ id }) => {
  const article = useAppSelector(state => selectArticleById(state, id))

  if (!article) return null

  return <ArticleItemContent article={article} />
}

export default React.memo(ArticleItem)
