import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { deleteArticle } from '../../app/slices/articleSlice'
import { selectUsername } from '../../app/slices/userSlice'
import { ResponseStatus } from '../../types/api'
import { IResponseError } from '../../types/error'
import ErrorList from '../Error/ErrorList'
import Button from './Button'
import Spinner from './Spinner/Spinner'

const DeleteArticleButton: React.FC = () => {
  const username = useAppSelector(selectUsername)

  const [status, setStatus] = React.useState<ResponseStatus>('idle')
  const [error, setError] = React.useState<IResponseError | null>(null)

  const { slug } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onDeleteClicked = async () => {
    if (!slug || !username) return
    try {
      setError(null)
      setStatus('loading')
      await dispatch(deleteArticle(slug)).unwrap()
      navigate(`/profile/${username}`)
    } catch (error) {
      setError(error as IResponseError)
    } finally {
      setStatus('idle')
    }
  }

  return (
    <React.Fragment>
      <Button
        className="btn-outline-danger"
        icon="ion-edit"
        onClick={onDeleteClicked}
      >
        Delete Article {status === 'loading' && <Spinner />}
      </Button>
      <ErrorList error={error} />
    </React.Fragment>
  )
}

export default DeleteArticleButton
