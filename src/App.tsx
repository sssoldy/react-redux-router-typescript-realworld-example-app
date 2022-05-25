import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAppDispatch } from './app/hooks'
import { tokenAdded } from './app/slices/sessionSlice'
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
  token && dispatch(tokenAdded(token))

  return (
    <React.Fragment>
      <Header />
      <Main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="editor/:slug" element={<Editor />} />
          <Route path="editor" element={<Editor />} />
          <Route path="article/:slug" element={<Article />} />
          <Route path="settings" element={<Settings />} />
          <Route path="@:username" element={<Profile />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Main>
      <Footer />
    </React.Fragment>
  )
}

export default App
