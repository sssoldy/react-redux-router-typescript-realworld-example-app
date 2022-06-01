import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectUsername } from '../../app/slices/userSlice'
import { IArticle } from '../../types/articles'
import { IEditArticleState } from '../../types/locationState'
import Button from '../UI/Button'
import DeleteArticleButton from '../UI/DeleteArticleBytton'
import FavoriteButton from '../UI/FavoriteButton'
import FollowButton from '../UI/FollowButton'
import UserMeta from '../UI/UserMeta'

interface ArticleMetaProps {
  article: IArticle
}

const ArticleMeta: React.FC<ArticleMetaProps> = ({ article }) => {
  const username = useAppSelector(selectUsername)
  const isUserPost = username === article?.author.username

  const navigate = useNavigate()

  const onEditClicked = () => {
    const { slug, title, description, body, tagList } = article
    const state: IEditArticleState = {
      slug,
      article: { title, description, body, tagList },
    }
    navigate('/editor', { state })
  }

  return (
    <div className="article-meta">
      <UserMeta article={article} />
      {!isUserPost && (
        <React.Fragment>
          <FollowButton profile={article.author} />
          &nbsp;&nbsp;
          <FavoriteButton article={article}>
            {/* FIXME: Favorite/UnFavorite */}
            Favorite Post ({article.favoritesCount})
          </FavoriteButton>
        </React.Fragment>
      )}
      {isUserPost && (
        <React.Fragment>
          <Button
            className="btn-outline-secondary"
            icon="ion-edit"
            onClick={onEditClicked}
          >
            Edit Article
          </Button>
          &nbsp;&nbsp;
          <DeleteArticleButton />
        </React.Fragment>
      )}
    </div>
  )
}

export default ArticleMeta
