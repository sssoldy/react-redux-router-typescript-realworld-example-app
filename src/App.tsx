import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAppDispatch } from './app/hooks'
import { tokenAdded } from './app/slices/sessionSlice'
import { getCurrentUser } from './app/slices/userSlice'
import NoRequireAuth from './components/Auth/NoRequireAuth'
import RequireAuth from './components/Auth/RequireAuth'
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

const App: React.FC = () => {
  const dispatch = useAppDispatch()

  const token = localStorage.getItem('jwt')
  if (token) {
    dispatch(tokenAdded(token))
    dispatch(getCurrentUser())
  }

  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="article/:slug" element={<Article />} />
          <Route path="profile/:username" element={<Profile />} />
          <Route element={<NoRequireAuth />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
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
