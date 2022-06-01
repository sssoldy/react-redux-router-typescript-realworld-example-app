import * as React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  selectArticlesIds,
  selectArticlesStatus,
  selectArticlesError,
  getProfileArticles,
  getUserFeedArticles,
  getAllArticles,
} from '../../app/slices/articlesSlice'
import { useLocationFilter } from '../../hooks/useLocationFilter'
import ErrorList from '../Error/ErrorList'
import ListSpinner from '../UI/Spinner/ListSpinner'
import ArticlePreview from './ArticlePreview'

const ArticleList: React.FC = () => {
  const articleIds = useAppSelector(selectArticlesIds)
  const status = useAppSelector(selectArticlesStatus)
  const error = useAppSelector(selectArticlesError)
  const { username, user, isHome } = useLocationFilter()

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (user && isHome) {
      dispatch(getUserFeedArticles())
      return
    }
    if (isHome) {
      dispatch(getAllArticles())
      return
    }
    if (username) {
      dispatch(getProfileArticles(username))
      return
    }
  }, [dispatch, isHome, user, username])

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
