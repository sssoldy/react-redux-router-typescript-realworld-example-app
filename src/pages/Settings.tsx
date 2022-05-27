import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { tokenAdded, tokenRemoved } from '../app/slices/sessionSlice'
import {
  loggedOut,
  resetUpdateStatus,
  selectUser,
  selectUserUpdateError,
  selectUserUpdateStatus,
  updateUser,
} from '../app/slices/userSlice'
import { IUpdateUser, IUser } from '../types/user'

const Settings: React.FC = () => {
  // FIXME:
  const user = useAppSelector(selectUser) as IUser
  const status = useAppSelector(selectUserUpdateStatus)
  const error = useAppSelector(selectUserUpdateError)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [userData, setUserData] = React.useState<IUpdateUser>({
    email: user.email,
    username: user.username,
    bio: user.bio,
    image: user.image,
  })

  const onFormChanged = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = e.target
    setUserData(prevUserData => ({
      ...prevUserData,
      [name]: value,
    }))
  }

  const onFormSubmitted = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(updateUser(userData))
  }

  const onLogoutClicked = () => {
    dispatch(tokenRemoved())
    dispatch(loggedOut())
    navigate('/', { replace: true })
  }

  React.useEffect(() => {
    if (status === 'successed') {
      dispatch(resetUpdateStatus())
      dispatch(tokenAdded(user.token))
      navigate(`/profile/${user.username}`, { replace: true })
    }
  }, [dispatch, navigate, status, user.token, user.username])

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            {error && (
              <ul className="error-messages">
                <li>{error}</li>
              </ul>
            )}

            <form onSubmit={e => onFormSubmitted(e)}>
              <fieldset disabled={status === 'loading'}>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="URL of profile picture"
                    name="image"
                    value={userData.image}
                    onChange={e => onFormChanged(e)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    name="username"
                    value={userData.username}
                    onChange={e => onFormChanged(e)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows={8}
                    placeholder="Short bio about you"
                    name="bio"
                    value={userData.bio}
                    onChange={e => onFormChanged(e)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={userData.email}
                    onChange={e => onFormChanged(e)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="New Password"
                    name="password"
                    value={userData.password}
                    onChange={e => onFormChanged(e)}
                  />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right">
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button
              onClick={onLogoutClicked}
              className="btn btn-outline-danger"
            >
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
