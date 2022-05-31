import * as React from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  favoriteArticleSingle,
  getArticle,
  selectActicleStatus,
  selectArticle,
  selectArticleError,
  unfavoriteArticleSingle,
} from '../app/slices/articleSlice'
import ErrorList from '../components/Error/ErrorList'
import Spinner from '../components/Spinner/Spinner'
import TagList from '../components/Tag/TagList'
import FavoriteButton from '../components/UI/FavoriteButton'
import FollowButton from '../components/UI/FollowButton'
import UserMeta from '../components/UI/UserMeta'

const Article: React.FC = () => {
  const article = useAppSelector(selectArticle)
  const status = useAppSelector(selectActicleStatus)
  const error = useAppSelector(selectArticleError)
  const isFollowing = article?.author.following || false
  const isFavorited = article?.favorited || false
  const { slug } = useParams()

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (!slug) return
    dispatch(getArticle(slug))
  }, [dispatch, slug])

  const onFollowClicked = () => {
    if (!article) return
    isFollowing
      ? console.log(article.author.following)
      : console.log(article.author.following)
  }

  const onFavoriteClicked = () => {
    if (!article) return
    isFavorited
      ? dispatch(unfavoriteArticleSingle(article.slug))
      : dispatch(favoriteArticleSingle(article.slug))
  }

  if (status === 'loading') return <Spinner />
  if (status === 'failed') return <ErrorList error={error} />
  if (!article) return <div>No article is here... yet.</div>

  const { author } = article

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>

          <div className="article-meta">
            <UserMeta article={article} />
            <FollowButton isFollowing={isFollowing} onClick={onFollowClicked}>
              {author.username}
            </FollowButton>
            &nbsp;&nbsp;
            <FavoriteButton
              isFavorite={isFavorited}
              onClick={onFavoriteClicked}
            >
              Favorite Post ({article.favoritesCount})
            </FavoriteButton>
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
            <FollowButton onClick={onFollowClicked} isFollowing={isFollowing}>
              {author.username}
            </FollowButton>
            &nbsp;&nbsp;
            <FavoriteButton
              isFavorite={isFavorited}
              onClick={onFavoriteClicked}
            >
              Favorite Post ({article.favoritesCount})
            </FavoriteButton>
          </div>
        </div>

        {/* <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <form className="card comment-form">
              <div className="card-block">
                <textarea
                  className="form-control"
                  placeholder="Write a comment..."
                  rows={3}
                ></textarea>
              </div>
              <div className="card-footer">
                <img
                  src="http://i.imgur.com/Qr71crq.jpg"
                  className="comment-author-img"
                  alt="placeholder"
                />
                <button className="btn btn-sm btn-primary">Post Comment</button>
              </div>
            </form>

            <div className="card">
              <div className="card-block">
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
              <div className="card-footer">
                <a href="/" className="comment-author">
                  <img
                    src="http://i.imgur.com/Qr71crq.jpg"
                    className="comment-author-img"
                    alt="placeholder"
                  />
                </a>
                &nbsp;
                <a href="/" className="comment-author">
                  Jacob Schmidt
                </a>
                <span className="date-posted">Dec 29th</span>
              </div>
            </div>

            <div className="card">
              <div className="card-block">
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
              <div className="card-footer">
                <a href="/" className="comment-author">
                  <img
                    src="http://i.imgur.com/Qr71crq.jpg"
                    className="comment-author-img"
                    alt="placeholder"
                  />
                </a>
                &nbsp;
                <a href="/" className="comment-author">
                  Jacob Schmidt
                </a>
                <span className="date-posted">Dec 29th</span>
                <span className="mod-options">
                  <i className="ion-edit"></i>
                  <i className="ion-trash-a"></i>
                </span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default Article
