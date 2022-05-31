import { EntityId } from '@reduxjs/toolkit'
import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  deleteComment,
  selectCommentById,
} from '../../app/slices/commentsSlice'
import { selectUsername } from '../../app/slices/userSlice'
import { formatDate } from '../../utils/misc'

interface CommentProps {
  commentId: EntityId
}

const Comment: React.FC<CommentProps> = ({ commentId }) => {
  const comment = useAppSelector(state => selectCommentById(state, commentId))
  const username = useAppSelector(selectUsername)
  const isUserComment = comment?.author.username === username
  const { slug } = useParams()

  const dispatch = useAppDispatch()

  if (!comment) return null

  const onDeleteClicked = () => {
    if (slug) {
      dispatch(deleteComment({ slug, id: comment.id }))
    }
  }

  return (
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
            <i className="ion-trash-a"></i>
          </span>
        )}
      </div>
    </div>
  )
}

export default Comment
