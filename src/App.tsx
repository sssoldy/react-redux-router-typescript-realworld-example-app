import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAppDispatch } from './app/hooks'
import { tokenAdded } from './app/slices/sessionSlice'

const App: React.FC = () => {
  const dispatch = useAppDispatch()

  const token = localStorage.getItem('jwt')
  token && dispatch(tokenAdded(token))

  return (
    <div>
      <Routes>
        <Route index element={<h1>...</h1>} />
        <Route
          path="*"
          element={<h1>There's nothing here! Router no match</h1>}
        />
      </Routes>
    </div>
  )
}

export default App
