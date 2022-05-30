import * as React from 'react'

interface ButtonProps {
  className?: string
  icon: string
  [x: string]: any
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  icon,
  className,
  children,
  ...props
}) => {
  return (
    <button className={`btn btn-sm action-btn ${className}`} {...props}>
      <i className={icon}></i>
      &nbsp; {children}
    </button>
  )
}

export default Button
