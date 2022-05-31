import * as React from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addNewComment } from '../../app/slices/commentsSlice'
import { selectUser } from '../../app/slices/userSlice'
import { INewComment, INewCommentReq } from '../../types/comments'

interface NewCommentFormProps {}

const NewCommentForm: React.FC<NewCommentFormProps> = () => {
  const [formData, setFormData] = React.useState<INewComment>({
    body: '',
  })
  const user = useAppSelector(selectUser)
  const { slug } = useParams()

  const dispatch = useAppDispatch()

  const onTextAreaChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const onFormSubmitted = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (slug) {
      const newCommentReq: INewCommentReq = {
        slug,
        comment: { body: formData.body },
      }
      dispatch(addNewComment(newCommentReq))
    }
  }

  if (!user) return null

  return (
    <form className="card comment-form" onSubmit={e => onFormSubmitted(e)}>
      <div className="card-block">
        <textarea
          className="form-control"
          placeholder="Write a comment..."
          rows={3}
          name="body"
          value={formData.body}
          onChange={e => onTextAreaChanged(e)}
        ></textarea>
      </div>
      <div className="card-footer">
        <img
          src={user.image}
          className="comment-author-img"
          alt={user.username}
        />
        <button className="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>
  )
}

export default NewCommentForm
