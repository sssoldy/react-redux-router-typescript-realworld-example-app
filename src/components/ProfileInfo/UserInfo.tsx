import * as React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectUser } from '../../app/slices/userSlice'
import GenericInfo from './GenericInfo'

interface UserInfoProps {}

const UserInfo: React.FC<UserInfoProps> = () => {
  const user = useAppSelector(selectUser)

  if (!user) return <div>USER NULL</div>

  return <GenericInfo profile={user} />
}

export default UserInfo
