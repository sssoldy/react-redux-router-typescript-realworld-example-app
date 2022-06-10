import * as React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectUser } from '../../app/slices/userSlice'
import ErrorList from '../UI/Error/ErrorList'
import EditProfileButton from '../UI/EditProfileButton'
import FollowButton from '../UI/FollowButton'
import {
  selectProfile,
  selectProfileError,
  selectProfileStatus,
} from '../../app/slices/profileSlice'
import { profileFallback } from '../../utils/fallbackData'
import { fallbackHandler } from '../../utils/misc'

const ProfileInfo: React.FC = () => {
  let profile = useAppSelector(selectProfile)
  const status = useAppSelector(selectProfileStatus)
  const error = useAppSelector(selectProfileError)
  const user = useAppSelector(selectUser)
  const isUser = profile?.username === user?.username
  let isFallback = false

  if (status === 'loading') {
    profile = profileFallback
    isFallback = true
  }
  if (status === 'failed') return <ErrorList error={error} />
  if (!profile) return <div>Profile not found</div>

  const { rootClassName, onRootClicked } = fallbackHandler(isFallback)

  return (
    <div
      className={`user-info ${rootClassName}`}
      onClickCapture={onRootClicked}
    >
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <img
              src={profile.image}
              className="user-img"
              alt={profile.username}
            />
            <h4>{profile.username}</h4>
            <p>{profile.bio}</p>
            {isUser ? (
              <EditProfileButton />
            ) : (
              <FollowButton profile={profile} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo
