import * as React from 'react'
import { Link } from 'react-router-dom'
import { IProfile } from '../../types/profile'
import { IUser } from '../../types/user'

interface GenericInfoProps {
  profile: IUser | IProfile
}

const GenericInfo: React.FC<GenericInfoProps> = ({ profile }) => {
  const isUser = (profile as IUser).token !== undefined

  return (
    <div className="user-info">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <img
              src={profile.image}
              className="user-pic"
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
              <button className="btn btn-sm btn-outline-secondary action-btn">
                <i className="ion-plus-round"></i>
                &nbsp; Follow {profile.username}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GenericInfo
