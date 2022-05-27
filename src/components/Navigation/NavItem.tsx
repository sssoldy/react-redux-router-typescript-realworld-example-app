import * as React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { IFromState } from '../../types/locationState'
import { IUser } from '../../types/user'

interface NavItemProps {
  to: string
  icon?: string
  user?: IUser
  children: React.ReactNode
}

const NavItem: React.FC<NavItemProps> = ({ to, user, icon, children }) => {
  const location = useLocation()
  const from: IFromState = { from: location }

  const active = `nav-link ${(isActive: boolean) => (isActive ? 'active' : '')}`

  const userImg = user && (
    <img src={user.image} className="user-pic" alt={user.username} />
  )

  return (
    <li className="nav-item">
      <NavLink to={to} state={from} className={`nav-link ${active}`}>
        {icon && <i className={icon}></i>}
        {user && userImg}
        {children}
      </NavLink>
    </li>
  )
}

export default NavItem
