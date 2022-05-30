import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { IUser } from '../../types/user'

interface NavItemProps {
  to: string
  icon?: string
  user?: IUser
  children: React.ReactNode
}

const NavItem: React.FC<NavItemProps> = ({ to, user, icon, children }) => {
  const userImg = user && (
    <img src={user.image} className="user-pic" alt={user.username} />
  )

  return (
    <li className="nav-item">
      <NavLink to={to} className="nav-link">
        {icon && <i className={icon}></i>}
        {user && userImg}
        {children}
      </NavLink>
    </li>
  )
}

export default NavItem
