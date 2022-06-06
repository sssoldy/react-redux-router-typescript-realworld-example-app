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
  const canDelete = status === 'idle'

  const { slug } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onDeleteClicked = async () => {
    if (!slug || !username || !canDelete) return
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
    <Button
      isActive={false}
      variant="danger"
      icon="ion-edit"
      disabled={!canDelete}
      onClick={onDeleteClicked}
    >
      Delete Article {status === 'loading' && <Spinner />}
      <ErrorList error={error} />
    </Button>
  )
}

export default DeleteArticleButton
