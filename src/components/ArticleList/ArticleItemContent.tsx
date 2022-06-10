import * as React from 'react'
import { Link } from 'react-router-dom'
import { IArticle } from '../../types/articles'
import { fallbackHandler } from '../../utils/misc'
import ProfileMeta from '../Profile/ProfileMeta'
import TagList from '../Tag/TagList'
import FavoriteButton from '../UI/FavoriteButton'

interface ArticleItemContentProps {
  article: IArticle
  isFallback?: boolean
}

const ArticleItemContent: React.FC<ArticleItemContentProps> = ({
  article,
  isFallback = false,
}) => {
  const { rootClassName, onRootClicked } = fallbackHandler(isFallback)

  return (
    <div
      className={`article-preview ${rootClassName}`}
      onClickCapture={onRootClicked}
    >
      <div className="article-meta">
        <ProfileMeta article={article} />
        <FavoriteButton className="pull-xs-right" article={article}>
          {article.favoritesCount}
        </FavoriteButton>
      </div>
      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <TagList tags={article.tagList} />
      </Link>
    </div>
  )
}

export default ArticleItemContent
