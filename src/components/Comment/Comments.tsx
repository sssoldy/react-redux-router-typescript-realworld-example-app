import * as React from 'react'
import CommentList from './CommentList'
import CommentForm from './CommentForm'
import { useAppSelector } from '../../app/hooks'
import { selectUser } from '../../app/slices/userSlice'

const Comments: React.FC = () => {
  const user = useAppSelector(selectUser)

  return (
    <React.Fragment>
      {user && <CommentForm user={user} />}
      <CommentList />
    </React.Fragment>
  )
}

export default Comments
