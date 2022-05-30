import * as React from 'react'
import Button from './Button'

interface FavoriteButtonProps {
  isFavorite: boolean
  className?: string
  [x: string]: any
  children: React.ReactNode
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  className,
  children,
  ...props
}) => {
  const favoriteBtn = (
    <Button className={`btn-primary ${className}`} icon="ion-heart" {...props}>
      {children}
    </Button>
  )
  const unFavoriteBtn = (
    <Button
      className={`btn-outline-primary ${className}`}
      icon="ion-heart"
      {...props}
    >
      {children}
    </Button>
  )
  return isFavorite ? favoriteBtn : unFavoriteBtn
}

export default FavoriteButton
