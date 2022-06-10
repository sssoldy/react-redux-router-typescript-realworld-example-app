import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { followProfile, unfollowProfile } from '../../app/slices/profileSlice'
import { useAsyncThunk } from '../../hooks/useAsyncThunk'
import { useAuthRequire } from '../../hooks/useAuthRequire'
import { IProfile } from '../../types/profile'
import ErrorList from './Error/ErrorList'
import Button from './Button'
import Spinner from './Spinner/Spinner'

interface FollowButtonProps {
  profile: IProfile
}

const FollowButton: React.FC<FollowButtonProps> = ({ profile }) => {
  const { isIdle, isLoading, error, run } = useAsyncThunk()
  const { username, following } = profile
  const isFollowing = following || false
  const icon = isFollowing ? 'ion-minus-round' : 'ion-plus-round'
  const canFollow = isIdle

  const { auth, from } = useAuthRequire()

  const navigate = useNavigate()

  const onFollowClicked = async () => {
    if (!auth) {
      navigate('/login', { state: from, replace: true })
      return
    }
    if (!canFollow) return

    isFollowing
      ? await run(unfollowProfile(username))
      : await run(followProfile(username))
  }

  return (
    <Button
      isActive={isFollowing}
      variant="secondary"
      icon={icon}
      disabled={!canFollow}
      onClick={onFollowClicked}
    >
      {isFollowing ? 'Unfollow' : 'Follow'} {username}{' '}
      {isLoading && <Spinner />}
      <ErrorList error={error} />
    </Button>
  )
}

export default FollowButton
