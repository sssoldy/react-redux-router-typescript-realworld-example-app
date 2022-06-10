import * as React from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  getComments,
  selectCommentsError,
  selectCommentsIds,
  selectCommentsStatus,
} from '../../app/slices/commentsSlice'
import ErrorList from '../UI/Error/ErrorList'
import CommentFallbackList from './CommentFallbackList'
import CommentItem from './CommentItem'

const CommentList: React.FC = () => {
  const commentIds = useAppSelector(selectCommentsIds)
  const status = useAppSelector(selectCommentsStatus)
  const error = useAppSelector(selectCommentsError)

  const { slug } = useParams()

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (slug) {
      dispatch(getComments(slug))
    }
  }, [dispatch, slug])

  if (status === 'loading') return <CommentFallbackList />
  if (status === 'failed') return <ErrorList error={error} />
  if (!commentIds.length) return <div>No comments are here... yet.</div>

  return (
    <>
      {commentIds.map(commentId => (
        <CommentItem key={commentId} commentId={commentId} />
      ))}
    </>
  )
}

export default CommentList
