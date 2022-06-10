import * as React from 'react'
import { useAppSelector } from '../../app/hooks'
import {
  selectArticlesIds,
  selectArticlesStatus,
  selectArticlesError,
} from '../../app/slices/articlesSlice'
import ErrorList from '../UI/Error/ErrorList'
import ArticleItem from './ArticleItem'
import InfinityScroll from '../InfinityScroll/InfinityScroll'
import ArticleFallbackList from './ArticleFallbackList'

const ArticleList: React.FC = () => {
  const articleIds = useAppSelector(selectArticlesIds)
  const status = useAppSelector(selectArticlesStatus)
  const error = useAppSelector(selectArticlesError)

  if (status === 'loading') return <ArticleFallbackList />
  if (status === 'failed') return <ErrorList error={error} />
  if (!articleIds.length) return <div>No articles are here... yet.</div>

  return (
    <>
      {articleIds.map(id => (
        <ArticleItem key={id} id={id} />
      ))}
      <InfinityScroll />
    </>
  )
}

export default ArticleList
