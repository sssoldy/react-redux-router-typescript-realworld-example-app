import * as React from 'react'
import { Link } from 'react-router-dom'
import { IArticle } from '../../types/articles'
import { formatDate } from '../../utils/misc'

interface ProfileMetaProps {
  article: IArticle
}

const ProfileMeta: React.FC<ProfileMetaProps> = ({ article }) => {
  const { author } = article

  return (
    <>
      <Link to={`/profile/${author.username}`}>
        <img src={author.image} alt={author.username} />
      </Link>
      <div className="info">
        <Link to={`/profile/${author.username}`} className="author">
          {author.username}
        </Link>
        <span className="date">{formatDate(article.createdAt)}</span>
      </div>
    </>
  )
}

export default ProfileMeta
