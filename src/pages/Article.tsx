import * as React from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import {
  selectArticle,
  selectActicleStatus,
  selectArticleError,
  getArticle,
} from '../app/slices/articleSlice'
import ArticleContent from '../components/ArticleContent/ArticleContent'
import Comments from '../components/Comment/Comments'
import ErrorList from '../components/UI/Error/ErrorList'
import { articleFallback } from '../utils/fallbackData'
import { fallbackHandler } from '../utils/misc'

const Article: React.FC = () => {
  let article = useAppSelector(selectArticle)
  const status = useAppSelector(selectActicleStatus)
  const error = useAppSelector(selectArticleError)
  const { slug } = useParams()
  const dispatch = useAppDispatch()
  let isFallback = false

  React.useEffect(() => {
    if (!slug) return
    dispatch(getArticle(slug))
  }, [dispatch, slug])

  if (status === 'loading') {
    article = articleFallback
    isFallback = true
  }
  if (status === 'failed') return <ErrorList error={error} />
  if (!article) return null

  const { rootClassName, onRootClicked } = fallbackHandler(isFallback)

  return (
    <div
      className={`article-page ${rootClassName}`}
      onClickCapture={onRootClicked}
    >
      <ArticleContent article={article} />
      <div className="container page">
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <Comments />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Article
