import * as React from 'react'
import { commentFallbackList } from '../../utils/fallbackData'
import CommentItemContent from './CommentItemContent'

const CommentFallbackList: React.FC = () => {
  return (
    <>
      {commentFallbackList.map(comment => (
        <CommentItemContent
          key={comment.id}
          comment={comment}
          isFallback={true}
        />
      ))}
    </>
  )
}

export default CommentFallbackList
