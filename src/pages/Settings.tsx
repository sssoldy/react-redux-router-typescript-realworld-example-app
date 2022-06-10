import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { loggedOut, selectUser, updateUser } from '../app/slices/userSlice'
import ErrorList from '../components/UI/Error/ErrorList'
import Spinner from '../components/UI/Spinner/Spinner'
import { useAsyncThunk } from '../hooks/useAsyncThunk'
import { IUpdateUser, IUser } from '../types/user'

// TODO: something wrong with API. Have to research dependencies
const Settings: React.FC = () => {
  const user = useAppSelector(selectUser) as IUser
  const [userData, setUserData] = React.useState<IUpdateUser>(user)
  const { email, username, bio, image, password } = userData

  const { isIdle, isLoading, error, run } = useAsyncThunk()
  const canUpdate =
    [email, username, bio, image, password].some(Boolean) && isIdle

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onFormChanged = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = e.target
    setUserData(prevUserData => ({
      ...prevUserData,
      [name]: value,
    }))
  }

  const onFormSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!canUpdate) return

    await run(updateUser(userData))
    navigate(`/profile/${user.username}`, { replace: true })
  }

  const onLogoutClicked = () => {
    dispatch(loggedOut())
    navigate('/', { replace: true })
  }

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <ErrorList error={error} />

            <form onSubmit={e => onFormSubmitted(e)}>
              <fieldset disabled={isLoading}>
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
                <button
                  disabled={!canUpdate}
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  Update Settings {isLoading && <Spinner />}
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
