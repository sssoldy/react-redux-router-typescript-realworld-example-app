import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { loginUser } from '../app/slices/userSlice'
import ErrorList from '../components/Error/ErrorList'
import Spinner from '../components/UI/Spinner/Spinner'
import { useLocationState } from '../hooks/useLocationState'
import { ResponseStatus } from '../types/api'
import { IResError } from '../types/error'
import { IFromState } from '../types/locationState'
import { ILoginUser } from '../types/user'

const Login: React.FC = () => {
  const [user, setUser] = React.useState<ILoginUser>({
    email: '',
    password: '',
  })
  const { email, password } = user

  const [status, setStatus] = React.useState<ResponseStatus>('idle')
  const [error, setError] = React.useState<IResError | null>(null)
  const canLogin = [email, password].every(Boolean) && status === 'idle'

  const locationState = useLocationState<IFromState>()
  const from = locationState?.from?.pathname || '/'

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }))
  }

  const onFormSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!canLogin) return
    try {
      setError(null)
      setStatus('loading')
      await dispatch(loginUser({ user: user })).unwrap()
      navigate(from, { replace: true })
    } catch (error) {
      setError(error as IResError)
    } finally {
      setStatus('idle')
    }
  }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link to="/register">Need an account?</Link>
            </p>

            <form onSubmit={e => onFormSubmitted(e)}>
              <fieldset disabled={status === 'loading'}>
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
                  disabled={!canLogin}
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  Sign in {status === 'loading' && <Spinner />}
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

export default Login
