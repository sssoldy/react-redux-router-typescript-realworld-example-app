import * as React from 'react'
import { Route, Routes } from 'react-router-dom'

const App: React.FC = () => {
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
