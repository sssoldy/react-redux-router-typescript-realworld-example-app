import * as React from 'react'
import { EntityId } from '@reduxjs/toolkit'
import { Link, useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import {
  deleteComment,
  selectCommentById,
} from '../../app/slices/commentsSlice'
import { selectUsername } from '../../app/slices/userSlice'
import { formatDateComment } from '../../utils/misc'
import ErrorList from '../Error/ErrorList'
import Spinner from '../UI/Spinner/Spinner'
import { useAsyncThunk } from '../../hooks/useAsyncThunk'

interface CommentItemProps {
  commentId: EntityId
}

const CommentItem: React.FC<CommentItemProps> = ({ commentId }) => {
  const comment = useAppSelector(state => selectCommentById(state, commentId))
  const username = useAppSelector(selectUsername)
  const isUserComment = comment?.author.username === username

  const { isIdle, isLoading, error, run } = useAsyncThunk()
  const canDelete = isIdle

  const { slug } = useParams()

  if (!comment) return null

  const onDeleteClicked = async () => {
    if (!slug || !canDelete) return
    await run(deleteComment({ slug, id: comment.id }))
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
          <span className="date-posted">
            {formatDateComment(comment.createdAt)}
          </span>
          {isUserComment && (
            <span className="mod-options" onClick={onDeleteClicked}>
              {isLoading && <Spinner />}
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
