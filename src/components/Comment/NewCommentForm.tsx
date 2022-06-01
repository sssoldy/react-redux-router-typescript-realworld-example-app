import * as React from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addComment } from '../../app/slices/commentsSlice'
import { selectUser } from '../../app/slices/userSlice'
import { ResponseStatus } from '../../types/api'
import { INewComment } from '../../types/comments'
import { IResError } from '../../types/error'
import ErrorList from '../Error/ErrorList'
import Spinner from '../UI/Spinner/Spinner'

const NewCommentForm: React.FC = () => {
  const [comment, setComment] = React.useState<INewComment>({ body: '' })
  const [status, setStatus] = React.useState<ResponseStatus>('idle')
  const [error, setError] = React.useState<IResError | null>(null)
  const canPost = Boolean(comment.body) && status !== 'loading'

  const user = useAppSelector(selectUser)
  const { slug } = useParams()

  const dispatch = useAppDispatch()

  const onTextAreaChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setComment(prevComment => ({ ...prevComment, [name]: value }))
  }

  const onFormSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!slug || !canPost) return
    try {
      setStatus('loading')
      setError(null)
      await dispatch(addComment({ slug, comment })).unwrap()
      setStatus('successed')
      setComment({ body: '' })
    } catch (error) {
      setError(error as IResError)
    } finally {
      setStatus('idle')
    }
  }

  if (!user) return null

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
            {status === 'loading' && <Spinner />} Post Comment
          </button>
        </div>
      </form>
      <ErrorList error={error} />
    </React.Fragment>
  )
}

export default NewCommentForm
