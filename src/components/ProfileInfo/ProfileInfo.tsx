import * as React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectUser } from '../../app/slices/userSlice'
import ErrorList from '../Error/ErrorList'
import Button from '../UI/Button'
import FollowButton from '../UI/FollowButton'
import Spinner from '../UI/Spinner/Spinner'

const ProfileInfo: React.FC = () => {
  const { profile, status, error } = useAppSelector(state => state.profile)
  const user = useAppSelector(selectUser)
  const isUser = profile?.username === user?.username

  if (status === 'loading') return <Spinner />
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
