import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  registerUser,
  selectUserErrors,
  selectUserStatus,
} from '../app/slices/userSlice'
import ErrorList from '../components/ErrorList/ErrorList'
import { useLocationState } from '../hooks/useLocationState'
import { IFromState } from '../types/locationState'
import { IRegisterUser } from '../types/user'

// TODO: Add client side validation
const Register: React.FC = () => {
  const [formData, setFormData] = React.useState<IRegisterUser>({
    username: '',
    email: '',
    password: '',
  })
  const { username, email, password } = formData
  const status = useAppSelector(selectUserStatus)
  const errors = useAppSelector(selectUserErrors)
  const locationState = useLocationState<IFromState>()
  const from = locationState?.from?.pathname || '/'

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const onFormSubmitted = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(registerUser({ user: formData }))
  }

  React.useEffect(() => {
    if (status === 'successed') navigate(from, { replace: true })
  }, [from, navigate, status])

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <a href="/">Have an account?</a>
            </p>

            <ErrorList errors={errors} />

            <form onSubmit={e => onFormSubmitted(e)}>
              <fieldset disabled={status === 'loading'}>
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
                <button className="btn btn-lg btn-primary pull-xs-right">
                  Sign up
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
