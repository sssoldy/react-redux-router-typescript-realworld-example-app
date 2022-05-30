import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  selectProfile,
  selectProfileStatus,
  selectProfileError,
  getProfile,
  followProfile,
  unfollowProfile,
} from '../../app/slices/profileSlice'
import { selectUser } from '../../app/slices/userSlice'
import { profileFallbackData } from '../../utils/fallbackData'
import ErrorList from '../Error/ErrorList'

const ProfileInfo: React.FC = () => {
  let profile = useAppSelector(selectProfile)
  const status = useAppSelector(selectProfileStatus)
  const error = useAppSelector(selectProfileError)
  const user = useAppSelector(selectUser)
  const isUser = profile?.username === user?.username
  const isFollowing = profile?.following
  const followClass = isFollowing ? 'btn-secondary' : 'btn-outline-secondary'

  const { username } = useParams()

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (username) {
      dispatch(getProfile(username))
    }
  }, [dispatch, username])

  const onFollowClicked = () => {
    if (!profile) return
    isFollowing
      ? dispatch(unfollowProfile(profile.username))
      : dispatch(followProfile(profile.username))
  }

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
              className="user-pic"
              width={128}
              height={128}
              alt={profile.username}
            />
            <h4>{profile.username}</h4>
            <p>{profile.bio}</p>
            {isUser ? (
              <Link to="/settings">
                <button className="btn btn-sm btn-outline-secondary action-btn">
                  <i className="ion-gear-a"></i>
                  &nbsp; Edit Profile Settings
                </button>
              </Link>
            ) : (
              <button
                className={`btn btn-sm action-btn ${followClass}`}
                onClick={onFollowClicked}
              >
                {isFollowing ? (
                  <i className="ion-minus-round"></i>
                ) : (
                  <i className="ion-plus-round"></i>
                )}
                {isFollowing ? ' Unfollow ' : ' Follow '}
                {profile.username}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo
