import * as React from 'react'
import CommentList from './CommentList'
import CommentForm from './CommentForm'
import { useAppSelector } from '../../app/hooks'
import { selectUser } from '../../app/slices/userSlice'

const Comments: React.FC = () => {
  const user = useAppSelector(selectUser)

  return (
    <>
      {user && <CommentForm user={user} />}
      <CommentList />
    </>
  )
}

export default React.memo(Comments)
