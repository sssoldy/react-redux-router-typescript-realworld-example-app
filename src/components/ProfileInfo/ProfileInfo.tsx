import * as React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  selectProfile,
  selectProfileStatus,
  selectProfileError,
  getProfile,
} from '../../app/slices/profileSlice'
import { profileFallbackData } from '../../utils/fallbackData'
import ErrorList from '../ErrorList/ErrorList'
import GenericInfo from './GenericInfo'

interface ProfileInfoProps {
  username: string
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ username }) => {
  let profile = useAppSelector(selectProfile)
  const status = useAppSelector(selectProfileStatus)
  const error = useAppSelector(selectProfileError)

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (username) {
      dispatch(getProfile(username))
    }
  }, [dispatch, username])

  if (status === 'loading') profile = profileFallbackData
  if (status === 'failed') return <ErrorList error={error} />
  if (!profile) return <div>Profile not found</div>

  return <GenericInfo profile={profile} />
}

export default ProfileInfo
