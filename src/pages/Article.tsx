import * as React from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import {
  selectArticle,
  selectActicleStatus,
  getArticle,
} from '../app/slices/articleSlice'
import ArticleContent from '../components/ArticleContent/ArticleContent'
import Comments from '../components/Comment/Comments'
import { articleFallback } from '../utils/fallbackData'
import { fallbackHandler } from '../utils/misc'
import NotFound from './NotFound'

const Article: React.FC = () => {
  let article = useAppSelector(selectArticle)
  const status = useAppSelector(selectActicleStatus)
  const { slug } = useParams()
  const dispatch = useAppDispatch()
  let isFallback = false

  React.useEffect(() => {
    if (slug) {
      const article = dispatch(getArticle(slug))
      return () => {
        article.abort()
      }
    }
  }, [dispatch, slug])

  if (status === 'loading') {
    article = articleFallback
    isFallback = true
  }
  if (status === 'failed') return <NotFound />
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
