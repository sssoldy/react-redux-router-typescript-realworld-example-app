import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../app/slices/userSlice'
import ErrorList from '../components/UI/Error/ErrorList'
import Spinner from '../components/UI/Spinner/Spinner'
import { useAsyncThunk } from '../hooks/useAsyncThunk'
import { useLocationState } from '../hooks/useLocationState'
import { IFromState } from '../types/locationState'
import { IRegisterUser } from '../types/user'

const Register: React.FC = () => {
  const [user, setUser] = React.useState<IRegisterUser>({
    username: '',
    email: '',
    password: '',
  })
  const { username, email, password } = user

  const { isIdle, isLoading, error, run } = useAsyncThunk()
  const canRegister = [username, email, password].every(Boolean) && isIdle

  const locationState = useLocationState<IFromState>()
  const from = locationState?.from?.pathname || '/'

  const navigate = useNavigate()

  const onInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }))
  }

  const onFormSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!canRegister) return

    await run(registerUser({ user: user }))
    navigate(from, { replace: true })
  }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link to="/login">Have an account?</Link>
            </p>

            <form onSubmit={e => onFormSubmitted(e)}>
              <fieldset disabled={isLoading}>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    name="username"
                    value={username}
                    onChange={e => onInputChanged(e)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={e => onInputChanged(e)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={e => onInputChanged(e)}
                  />
                </fieldset>
                <button
                  disabled={!canRegister}
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  Sign up {isLoading && <Spinner />}
                </button>
              </fieldset>
            </form>
            <ErrorList error={error} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
