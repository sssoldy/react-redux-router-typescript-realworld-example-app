import * as React from 'react'
import { EntityId } from '@reduxjs/toolkit'
import { useAppSelector } from '../../app/hooks'
import { selectCommentById } from '../../app/slices/commentsSlice'
import CommentItemContent from './CommentItemContent'

interface CommentItemProps {
  commentId: EntityId
}

const CommentItem: React.FC<CommentItemProps> = ({ commentId }) => {
  const comment = useAppSelector(state => selectCommentById(state, commentId))

  if (!comment) return null

  return <CommentItemContent comment={comment} />
}

export default CommentItem
