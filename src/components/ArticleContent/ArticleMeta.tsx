import * as React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectUsername } from '../../app/slices/userSlice'
import { IArticle } from '../../types/articles'
import DeleteArticleButton from '../UI/DeleteArticleButton'
import EditArticleButton from '../UI/EditArticleButtom'
import FavoriteButton from '../UI/FavoriteButton'
import FollowButton from '../UI/FollowButton'
import ProfileMeta from '../Profile/ProfileMeta'

interface ArticleMetaProps {
  article: IArticle
}

const ArticleMeta: React.FC<ArticleMetaProps> = ({ article }) => {
  const username = useAppSelector(selectUsername)
  const isUserPost = username === article?.author.username

  return (
    <div className="article-meta">
      <ProfileMeta article={article} />
      {!isUserPost && (
        <>
          <FollowButton profile={article.author} />
          &nbsp;&nbsp;
          <FavoriteButton article={article}>
            {article.favorited ? 'Unfavorite' : 'Favorite'} Post (
            {article.favoritesCount})
          </FavoriteButton>
        </>
      )}
      {isUserPost && (
        <>
          <EditArticleButton article={article} />
          &nbsp;&nbsp;
          <DeleteArticleButton />
        </>
      )}
    </div>
  )
}

export default ArticleMeta
