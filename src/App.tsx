import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAppDispatch } from './app/hooks'
import { getCurrentUser } from './app/slices/userSlice'
import RequireAuth from './components/Auth/RequireAuth'
import FullPageError from './components/Error/FullPageError'
import FullPageSpinner from './components/UI/Spinner/FullPageSpinner'
import Footer from './layouts/Footer'
import Header from './layouts/Header'
import Main from './layouts/Main'
import Article from './pages/Article'
import Editor from './pages/Editor'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Settings from './pages/Settings'
import { ResponseStatus } from './types/api'
import { IResError } from './types/error'

const App: React.FC = () => {
  const [status, setStatus] = React.useState<ResponseStatus>('idle')
  const [error, setError] = React.useState<IResError | null>(null)
  const token = localStorage.getItem('jwt')

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (token && status === 'idle') {
      ;(async () => {
        try {
          setStatus('loading')
          await dispatch(getCurrentUser(token)).unwrap()
          setStatus('successed')
        } catch (error) {
          setStatus('failed')
          setError(error as IResError)
        }
      })()
    }
  }, [dispatch, status, token])

  if (token && (status === 'idle' || status === 'loading'))
    return <FullPageSpinner />
  if (token && status === 'failed') return <FullPageError error={error} />

  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/" element={<Home />} />
          <Route path="article/:slug" element={<Article />} />
          <Route path="profile/:username" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route element={<RequireAuth />}>
            <Route path="editor" element={<Editor />} />
            <Route path="editor/:slug" element={<Editor />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
      <Footer />
    </React.Fragment>
  )
}

export default App
