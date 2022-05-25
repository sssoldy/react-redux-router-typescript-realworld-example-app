import * as React from 'react'

interface MainProps {
  children: React.ReactNode
}

const Main: React.FC<MainProps> = ({ children }) => {
  return <main>{children}</main>
}

export default Main
