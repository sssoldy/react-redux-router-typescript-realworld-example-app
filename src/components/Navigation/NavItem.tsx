import * as React from 'react'
import { NavLink } from 'react-router-dom'

interface NavItemProps {
  to: string
  icon?: string
  user?: boolean // TODO: update with real data
  children: React.ReactNode
}

const NavItem: React.FC<NavItemProps> = ({ to, user, icon, children }) => {
  const active = `nav-link ${(isActive: boolean) => (isActive ? 'active' : '')}`
  const userImg = (
    <img
      src="https://static.productionready.io/images/smiley-cyrus.jpg"
      className="user-pic"
      alt="mwu04496@jeoce.com"
    />
  )

  return (
    <li className="nav-item">
      <NavLink to={to} className={`nav-link ${active}`}>
        {icon && <i className={icon}></i>}
        {user && userImg}
        {children}
      </NavLink>
    </li>
  )
}

export default NavItem
