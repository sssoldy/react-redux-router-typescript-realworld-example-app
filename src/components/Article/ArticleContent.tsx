import * as React from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getArticle, selectArticleState } from '../../app/slices/articleSlice'
import ErrorList from '../Error/ErrorList'
import TagList from '../Tag/TagList'
import FullPageSpinner from '../UI/Spinner/FullPageSpinner'
import ArticleMeta from './ArticleMeta'

const ArticleContent: React.FC = () => {
  const { article, status, error } = useAppSelector(selectArticleState)
  const { slug } = useParams()
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (!slug) return
    dispatch(getArticle(slug))
  }, [dispatch, slug])

  if (status === 'loading') return <FullPageSpinner />
  if (status === 'failed') return <ErrorList error={error} />
  if (!article) return <div>No article is here... yet.</div>

  return (
    <React.Fragment>
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <ArticleMeta article={article} />
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{article.body}</p>
          </div>
        </div>

        <TagList tags={article.tagList} />

        <hr />

        <div className="article-actions">
          <ArticleMeta article={article} />
        </div>
      </div>
    </React.Fragment>
  )
}

export default ArticleContent
