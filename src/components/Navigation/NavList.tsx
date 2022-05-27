import * as React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectSessionToken } from '../../app/slices/sessionSlice'
import { selectUser, selectUserStatus } from '../../app/slices/userSlice'
import { userFallbackData } from '../../utils/fallbackData'
import NavItem from './NavItem'

// prettier-ignore
const NavList: React.FC = () => {
  let user = useAppSelector(selectUser)
  const status = useAppSelector(selectUserStatus)
  const token = useAppSelector(selectSessionToken)

  // TODO: Refactor it
  if (status !== 'successed' && token) {
    user = userFallbackData
  }

  const loggenInItems = user && (
    <React.Fragment>
      <NavItem to="/editor" icon="ion-compose">&nbsp;New Article</NavItem>
      <NavItem to="/settings" icon="ion-gear-a">&nbsp;Settings</NavItem>
      <NavItem to="/profile" user={user}>{user.username}</NavItem>
    </React.Fragment>
  )

  const registerItems = (
    <React.Fragment>
      <NavItem to="/login">Sign in</NavItem>
      <NavItem to="/register">Sign up</NavItem>
    </React.Fragment>
  )

  return (
    <ul className="nav navbar-nav pull-xs-right">
      <NavItem to="/">Home</NavItem>
      {user ? loggenInItems : registerItems}
    </ul>
  )
}

export default NavList
