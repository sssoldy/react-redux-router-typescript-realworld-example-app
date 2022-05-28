import * as React from 'react'

interface ArticleFiltersProps {}

const ArticleFilters: React.FC<ArticleFiltersProps> = () => {
  return (
    <div className="articles-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <a className="nav-link active" href="/">
            My Articles
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">
            Favorited Articles
          </a>
        </li>
      </ul>
    </div>
  )
}

export default ArticleFilters
