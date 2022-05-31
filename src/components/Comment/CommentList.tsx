import * as React from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  getAllComments,
  selectCommentsError,
  selectCommentsIds,
  selectCommentsStatus,
} from '../../app/slices/commentsSlice'
import ErrorList from '../Error/ErrorList'
import Spinner from '../Spinner/Spinner'
import Comment from './Comment'

const CommentList: React.FC = () => {
  const commentIds = useAppSelector(selectCommentsIds)
  const status = useAppSelector(selectCommentsStatus)
  const error = useAppSelector(selectCommentsError)

  const { slug } = useParams()

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (slug) {
      dispatch(getAllComments(slug))
    }
  }, [dispatch, slug])

  if (status === 'loading') return <Spinner />
  if (status === 'failed') return <ErrorList error={error} />
  if (!commentIds.length) return <div>No comments are here... yet.</div>

  return (
    <React.Fragment>
      {commentIds.map(commentId => (
        <Comment key={commentId} commentId={commentId} />
      ))}
    </React.Fragment>
  )
}

export default CommentList
