import * as React from 'react'

interface ButtonProps {
  isActive: boolean
  variant: 'primary' | 'secondary' | 'danger'
  icon: string
  className?: string
  [x: string]: any
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  isActive,
  variant,
  icon,
  className,
  children,
  ...props
}) => {
  const btnClassName = [
    'btn btn-sm action-btn',
    `btn${isActive ? '' : '-outline'}-${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={btnClassName} {...props}>
      <i className={icon}></i>
      &nbsp; {children}
    </button>
  )
}

export default Button
