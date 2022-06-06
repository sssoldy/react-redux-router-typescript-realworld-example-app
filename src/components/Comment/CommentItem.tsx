import * as React from 'react'
import { EntityId } from '@reduxjs/toolkit'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  deleteComment,
  selectCommentById,
} from '../../app/slices/commentsSlice'
import { selectUsername } from '../../app/slices/userSlice'
import { ResponseStatus } from '../../types/api'
import { IResponseError } from '../../types/error'
import { formatDate } from '../../utils/misc'
import ErrorList from '../Error/ErrorList'
import Spinner from '../UI/Spinner/Spinner'

interface CommentItemProps {
  commentId: EntityId
}

const CommentItem: React.FC<CommentItemProps> = ({ commentId }) => {
  const comment = useAppSelector(state => selectCommentById(state, commentId))
  const username = useAppSelector(selectUsername)
  const isUserComment = comment?.author.username === username

  const [status, setStatus] = React.useState<ResponseStatus>('idle')
  const [error, setError] = React.useState<IResponseError | null>(null)
  const canDelete = status !== 'loading'

  const { slug } = useParams()

  const dispatch = useAppDispatch()

  if (!comment) return null

  const onDeleteClicked = async () => {
    if (!slug || !canDelete) return
    try {
      setStatus('loading')
      setError(null)
      await dispatch(deleteComment({ slug, id: comment.id })).unwrap()
      setStatus('successed')
    } catch (error) {
      setError(error as IResponseError)
    } finally {
      setStatus('idle')
    }
  }

  return (
    <React.Fragment>
      <div className="card">
        <div className="card-block">
          <p className="card-text">{comment.body}</p>
        </div>
        <div className="card-footer">
          <Link to={`/profile/${comment.author}`} className="comment-author">
            <img
              src={comment.author.image}
              className="comment-author-img"
              alt={comment.author.username}
            />
          </Link>
          &nbsp;
          <Link
            to={`/profile/${comment.author.username}`}
            className="comment-author"
          >
            {comment.author.username}
          </Link>
          <span className="date-posted">{formatDate(comment.createdAt)}</span>
          {isUserComment && (
            <span className="mod-options" onClick={onDeleteClicked}>
              {status === 'loading' && <Spinner />}
              <i className="ion-trash-a"></i>
            </span>
          )}
        </div>
      </div>
      <ErrorList error={error} />
    </React.Fragment>
  )
}

export default CommentItem
