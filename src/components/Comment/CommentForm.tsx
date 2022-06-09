import * as React from 'react'
import { useParams } from 'react-router-dom'
import { addComment } from '../../app/slices/commentsSlice'
import { useAsyncThunk } from '../../hooks/useAsyncThunk'
import { INewComment } from '../../types/comments'
import { IUser } from '../../types/user'
import ErrorList from '../Error/ErrorList'
import Spinner from '../UI/Spinner/Spinner'

interface CommentFormProps {
  user: IUser
}

const CommentForm: React.FC<CommentFormProps> = ({ user }) => {
  const [comment, setComment] = React.useState<INewComment>({ body: '' })
  const { isIdle, isLoading, error, run } = useAsyncThunk()
  const canPost = Boolean(comment.body) && isIdle

  const { slug } = useParams()

  const onTextAreaChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setComment(prevComment => ({ ...prevComment, [name]: value }))
  }

  const onFormSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!slug || !canPost) return
    await run(addComment({ slug, comment }))
    setComment({ body: '' })
  }

  return (
    <React.Fragment>
      <form className="card comment-form" onSubmit={e => onFormSubmitted(e)}>
        <div className="card-block">
          <textarea
            className="form-control"
            placeholder="Write a comment..."
            rows={3}
            name="body"
            value={comment.body}
            onChange={e => onTextAreaChanged(e)}
          ></textarea>
        </div>
        <div className="card-footer">
          <img
            src={user.image}
            className="comment-author-img"
            alt={user.username}
          />
          <button disabled={!canPost} className="btn btn-sm btn-primary">
            {isLoading && <Spinner />} Post Comment
          </button>
        </div>
      </form>
      <ErrorList error={error} />
    </React.Fragment>
  )
}

export default CommentForm
