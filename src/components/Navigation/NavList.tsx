import * as React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectUser } from '../../app/slices/userSlice'
import NavItem from './NavItem'

// prettier-ignore
const NavList: React.FC = () => {
  const user = useAppSelector(selectUser)

  const loggenInItems = user && (
    <>
      <NavItem to="/editor" icon="ion-compose">&nbsp;New Article</NavItem>
      <NavItem to="/settings" icon="ion-gear-a">&nbsp;Settings</NavItem>
      <NavItem to={`/profile/${user.username}`} user={user}>{user.username}</NavItem>
    </>
  )

  const registerItems = (
    <>
      <NavItem to="/login">Sign in</NavItem>
      <NavItem to="/register">Sign up</NavItem>
    </>
  )

  return (
    <ul className="nav navbar-nav pull-xs-right">
      <NavItem to="/">Home</NavItem>
      {user ? loggenInItems : registerItems}
    </ul>
  )
}

export default NavList
