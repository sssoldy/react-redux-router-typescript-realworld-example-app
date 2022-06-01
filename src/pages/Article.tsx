import * as React from 'react'
import ArticleContent from '../components/Article/ArticleContent'
import Comments from '../components/Comment/Comments'

const Article: React.FC = () => {
  return (
    <div className="article-page">
      <ArticleContent />
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
