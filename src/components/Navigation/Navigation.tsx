import * as React from 'react'
import NavList from './NavList'
import { Link } from 'react-router-dom'

// prettier-ignore
const Navigation: React.FC = () => {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">conduit</Link>
        <NavList />
      </div>
    </nav>
  )
}

export default Navigation
