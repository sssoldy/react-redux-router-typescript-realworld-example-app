import * as React from 'react'
import { useAppSelector } from '../../app/hooks'
import {
  selectArticlesIds,
  selectArticlesStatus,
  selectArticlesError,
} from '../../app/slices/articlesSlice'
import ErrorList from '../Error/ErrorList'
import ListSpinner from '../UI/Spinner/ListSpinner'
import ArticlePreview from './ArticlePreview'

const ArticleList: React.FC = () => {
  const articleIds = useAppSelector(selectArticlesIds)
  const status = useAppSelector(selectArticlesStatus)
  const error = useAppSelector(selectArticlesError)

  if (status === 'loading') return <ListSpinner />
  if (status === 'failed') return <ErrorList error={error} />
  if (!articleIds.length) return <div>No articles are here... yet.</div>

  return (
    <React.Fragment>
      {articleIds.map(id => (
        <ArticlePreview key={id} id={id} />
      ))}
    </React.Fragment>
  )
}

export default ArticleList
