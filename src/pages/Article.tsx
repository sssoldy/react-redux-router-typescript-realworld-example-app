import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  deleteArticle,
  getArticle,
  selectActicleStatus,
  selectArticle,
  selectArticleError,
} from '../app/slices/articleSlice'
import { selectUsername } from '../app/slices/userSlice'
import CommentList from '../components/Comment/CommentList'
import NewCommentForm from '../components/Comment/NewCommentForm'
import ErrorList from '../components/Error/ErrorList'
import TagList from '../components/Tag/TagList'
import Button from '../components/UI/Button'
import FavoriteButton from '../components/UI/FavoriteButton'
import FollowButton from '../components/UI/FollowButton'
import FullPageSpinner from '../components/UI/Spinner/FullPageSpinner'
import UserMeta from '../components/UI/UserMeta'
import { IEditArticleState } from '../types/locationState'

const Article: React.FC = () => {
  const article = useAppSelector(selectArticle)
  const status = useAppSelector(selectActicleStatus)
  const error = useAppSelector(selectArticleError)

  const username = useAppSelector(selectUsername)
  const isUserPost = username === article?.author.username

  const { slug } = useParams()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (!slug) return
    dispatch(getArticle(slug))
  }, [dispatch, slug])

  const onEditClicked = () => {
    if (!article) return
    const { slug, title, description, body, tagList } = article
    const state: IEditArticleState = {
      slug,
      article: { title, description, body, tagList },
    }
    navigate('/editor', { state })
  }

  const onDeleteClicked = async () => {
    if (!slug || !username) return
    try {
      await dispatch(deleteArticle(slug)).unwrap()
      navigate(`/profile/${username}`)
    } catch (error) {
      // FIXME:
      console.log(error)
    }
  }

  if (status === 'loading') return <FullPageSpinner />
  if (status === 'failed') return <ErrorList error={error} />
  if (!article) return <div>No article is here... yet.</div>

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>

          <div className="article-meta">
            <UserMeta article={article} />
            {!isUserPost && (
              <React.Fragment>
                <FollowButton profile={article.author} />
                &nbsp;&nbsp;
                <FavoriteButton article={article}>
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
                <Button
                  className="btn-outline-danger"
                  icon="ion-edit"
                  onClick={onDeleteClicked}
                >
                  Delete Article
                </Button>
              </React.Fragment>
            )}
          </div>
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
          <div className="article-meta">
            <UserMeta article={article} />
            {!isUserPost && <FollowButton profile={article.author} />}
            &nbsp;&nbsp;
            <FavoriteButton article={article}>
              Favorite Post ({article.favoritesCount})
            </FavoriteButton>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <NewCommentForm />
            <CommentList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Article
