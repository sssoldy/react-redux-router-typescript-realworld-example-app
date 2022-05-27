import * as React from 'react'
import { Outlet } from 'react-router-dom'

const Main: React.FC = () => {
  return (
    <main>
      <Outlet />
    </main>
  )
}

export default Main
