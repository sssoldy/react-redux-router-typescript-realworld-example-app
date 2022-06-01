import * as React from 'react'
import { useAppDispatch } from '../../app/hooks'
import { followProfile, unfollowProfile } from '../../app/slices/profileSlice'
import { ResponseStatus } from '../../types/api'
import { IResError } from '../../types/error'
import { IProfile } from '../../types/profile'
import ErrorList from '../Error/ErrorList'
import Button from './Button'
import Spinner from './Spinner/Spinner'

interface FollowButtonProps {
  profile: IProfile
  [x: string]: any
}

const FollowButton: React.FC<FollowButtonProps> = ({ profile, ...props }) => {
  const [status, setStatus] = React.useState<ResponseStatus>('idle')
  const [error, setError] = React.useState<IResError | null>(null)
  const isFollowing = profile.following || false
  const canFollow = status !== 'loading'
  const { username } = profile

  const dispatch = useAppDispatch()

  const onFollowClicked = async () => {
    if (!canFollow) return
    try {
      setStatus('loading')
      isFollowing
        ? await dispatch(unfollowProfile(username)).unwrap()
        : await dispatch(followProfile(username)).unwrap()
      setStatus('successed')
    } catch (error) {
      setError(error as IResError)
    } finally {
      setStatus('idle')
    }
  }

  const followBtn = (
    <Button
      className="btn-outline-secondary"
      icon="ion-plus-round"
      disabled={!canFollow}
      {...props}
      onClick={onFollowClicked}
    >
      Follow {username} {status === 'loading' && <Spinner />}
    </Button>
  )

  const unFollowBtn = (
    <Button
      className="btn-secondary"
      icon="ion-minus-round"
      disabled={!canFollow}
      {...props}
      onClick={onFollowClicked}
    >
      Unfollow {username} {status === 'loading' && <Spinner />}
    </Button>
  )
  return (
    <React.Fragment>
      {isFollowing ? unFollowBtn : followBtn}
      <ErrorList error={error} />
    </React.Fragment>
  )
}

export default FollowButton
