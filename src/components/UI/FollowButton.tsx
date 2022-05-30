import * as React from 'react'
import Button from './Button'

interface FollowButtonProps {
  isFollowing: boolean
  [x: string]: any
  children: React.ReactNode
}

const FollowButton: React.FC<FollowButtonProps> = ({
  isFollowing,
  children,
  ...props
}) => {
  const followBtn = (
    <Button className="btn-secondary" icon="ion-plus-round" {...props}>
      Follow {children}
    </Button>
  )

  const unFollowBtn = (
    <Button className="btn-outline-secondary" icon="ion-minus-round" {...props}>
      Unfollow {children}
    </Button>
  )
  return isFollowing ? unFollowBtn : followBtn
}

export default FollowButton
