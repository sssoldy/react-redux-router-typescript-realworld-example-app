import * as React from 'react'
import { articleFallbackList } from '../../utils/fallbackData'
import ArticleItemContent from './ArticleItemContent'

const ArticleFallbackList: React.FC = () => {
  return (
    <>
      {articleFallbackList.map(article => (
        <ArticleItemContent key={article.slug} article={article} isFallback />
      ))}
    </>
  )
}

export default ArticleFallbackList
