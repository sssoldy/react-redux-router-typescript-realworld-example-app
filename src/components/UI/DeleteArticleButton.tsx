import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { deleteArticle } from '../../app/slices/articleSlice'
import { selectUsername } from '../../app/slices/userSlice'
import { useAsyncThunk } from '../../hooks/useAsyncThunk'
import ErrorList from './Error/ErrorList'
import Button from './Button'
import Spinner from './Spinner/Spinner'

const DeleteArticleButton: React.FC = () => {
  const username = useAppSelector(selectUsername)
  const { isIdle, isLoading, error, run } = useAsyncThunk()
  const canDelete = isIdle

  const { slug } = useParams()
  const navigate = useNavigate()

  const onDeleteClicked = async () => {
    if (!slug || !username || !canDelete) return
    await run(deleteArticle(slug))
    navigate(`/profile/${username}`)
  }

  return (
    <Button
      isActive={false}
      variant="danger"
      icon="ion-edit"
      disabled={!canDelete}
      onClick={onDeleteClicked}
    >
      Delete Article {isLoading && <Spinner />}
      <ErrorList error={error} />
    </Button>
  )
}

export default DeleteArticleButton
