import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  selectProfile,
  selectProfileStatus,
  selectProfileError,
  getProfile,
} from '../../app/slices/profileSlice'
import { selectUser } from '../../app/slices/userSlice'
import { profileFallbackData } from '../../utils/fallbackData'
import ErrorList from '../Error/ErrorList'
import Button from '../UI/Button'
import FollowButton from '../UI/FollowButton'

const ProfileInfo: React.FC = () => {
  let profile = useAppSelector(selectProfile)
  const status = useAppSelector(selectProfileStatus)
  const error = useAppSelector(selectProfileError)
  const user = useAppSelector(selectUser)
  const isUser = profile?.username === user?.username

  const { username } = useParams()

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (username) {
      dispatch(getProfile(username))
    }
  }, [dispatch, username])

  if (status === 'loading') profile = profileFallbackData
  if (status === 'failed') return <ErrorList error={error} />
  if (!profile) return <div>Profile not found</div>

  return (
    <div className="user-info">
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
              <Link to="/settings">
                <Button className="btn-outline-secondary" icon="ion-gear-a">
                  Edit Profile Settings
                </Button>
              </Link>
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
