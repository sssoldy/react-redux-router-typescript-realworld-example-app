import * as React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectUsername } from '../../app/slices/userSlice'
import { IArticle } from '../../types/articles'
import DeleteArticleButton from '../UI/DeleteArticleButton'
import EditArticleButton from '../UI/EditArticleButtom'
import FavoriteButton from '../UI/FavoriteButton'
import FollowButton from '../UI/FollowButton'
import UserMeta from '../UI/UserMeta'

interface ArticleMetaProps {
  article: IArticle
}

const ArticleMeta: React.FC<ArticleMetaProps> = ({ article }) => {
  const username = useAppSelector(selectUsername)
  const isUserPost = username === article?.author.username

  return (
    <div className="article-meta">
      <UserMeta article={article} />
      {!isUserPost && (
        <React.Fragment>
          <FollowButton profile={article.author} />
          &nbsp;&nbsp;
          <FavoriteButton article={article}>
            {article.favorited ? 'Unfavorite' : 'Favorite'} Post (
            {article.favoritesCount})
          </FavoriteButton>
        </React.Fragment>
      )}
      {isUserPost && (
        <React.Fragment>
          <EditArticleButton article={article} />
          &nbsp;&nbsp;
          <DeleteArticleButton />
        </React.Fragment>
      )}
    </div>
  )
}

export default ArticleMeta
