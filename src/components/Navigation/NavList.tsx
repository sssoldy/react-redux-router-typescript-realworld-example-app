import * as React from 'react'
import NavItem from './NavItem'

// prettier-ignore
const NavList: React.FC = () => {
  return (
    <ul className="nav navbar-nav pull-xs-right">
      <NavItem to="/">Home</NavItem>
      <NavItem to="/editor" icon="ion-compose">&nbsp;New Article</NavItem>
      <NavItem to="/settings" icon="ion-gear-a">&nbsp;Settings</NavItem>
      <NavItem to="/login">Sign in</NavItem>
      <NavItem to="/register">Sign up</NavItem>
      <NavItem to="/profile" user>User Name</NavItem>
    </ul>
  )
}

export default NavList
