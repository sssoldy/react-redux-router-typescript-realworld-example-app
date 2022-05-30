import * as React from 'react'
import { Link } from 'react-router-dom'
import { IArticle } from '../../types/articles'
import { formatDate } from '../../utils/misc'

interface UserMetaProps {
  article: IArticle
}

const UserMeta: React.FC<UserMetaProps> = ({ article }) => {
  const { author } = article

  return (
    <React.Fragment>
      <Link to={`/profile/${author.username}`}>
        <img src={author.image} alt={author.username} />
      </Link>
      <div className="info">
        <Link to={`/profile/${author.username}`} className="author">
          {author.username}
        </Link>
        <span className="date">{formatDate(article.createdAt)}</span>
      </div>
    </React.Fragment>
  )
}

export default UserMeta
