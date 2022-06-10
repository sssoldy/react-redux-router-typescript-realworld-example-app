import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { deleteComment } from '../../app/slices/commentsSlice'
import { selectUsername } from '../../app/slices/userSlice'
import { useAsyncThunk } from '../../hooks/useAsyncThunk'
import { IComment } from '../../types/comments'
import { fallbackHandler, formatDateComment } from '../../utils/misc'
import ErrorList from '../UI/Error/ErrorList'
import Spinner from '../UI/Spinner/Spinner'

interface CommentItemContentProps {
  comment: IComment
  isFallback?: boolean
}

const CommentItemContent: React.FC<CommentItemContentProps> = ({
  comment,
  isFallback = false,
}) => {
  const username = useAppSelector(selectUsername)
  const isUserComment = comment?.author.username === username

  const { isIdle, isLoading, error, run } = useAsyncThunk()
  const canDelete = isIdle

  const { slug } = useParams()

  const onDeleteClicked = async () => {
    if (!slug || !canDelete) return
    await run(deleteComment({ slug, id: comment.id }))
  }

  const { rootClassName, onRootClicked } = fallbackHandler(isFallback)

  return (
    <>
      <div className={`card ${rootClassName}`} onClickCapture={onRootClicked}>
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
          {isUserComment && !isFallback && (
            <span className="mod-options" onClick={onDeleteClicked}>
              {isLoading && <Spinner />}
              <i className="ion-trash-a"></i>
            </span>
          )}
        </div>
      </div>
      <ErrorList error={error} />
    </>
  )
}

export default CommentItemContent
