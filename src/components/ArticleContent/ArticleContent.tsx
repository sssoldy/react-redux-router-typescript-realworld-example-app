import * as React from 'react'
import TagList from '../Tag/TagList'
import ArticleMeta from './ArticleMeta'
import { IArticle } from '../../types/articles'

interface ArticleContentProps {
  article: IArticle
}

const ArticleContent: React.FC<ArticleContentProps> = ({ article }) => {
  return (
    <>
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
    </>
  )
}

export default ArticleContent
