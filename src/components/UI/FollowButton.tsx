import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { followProfile, unfollowProfile } from '../../app/slices/profileSlice'
import { useAuthRequire } from '../../hooks/useAuthRequire'
import { ResponseStatus } from '../../types/api'
import { IResponseError } from '../../types/error'
import { IProfile } from '../../types/profile'
import ErrorList from '../Error/ErrorList'
import Button from './Button'
import Spinner from './Spinner/Spinner'

interface FollowButtonProps {
  profile: IProfile
}

const FollowButton: React.FC<FollowButtonProps> = ({ profile }) => {
  const [status, setStatus] = React.useState<ResponseStatus>('idle')
  const [error, setError] = React.useState<IResponseError | null>(null)

  const { username, following } = profile
  const isFollowing = following || false
  const icon = isFollowing ? 'ion-minus-round' : 'ion-plus-round'
  const canFollow = status === 'idle'

  const { auth, from } = useAuthRequire()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onFollowClicked = async () => {
    if (!auth) {
      navigate('/login', { state: from, replace: true })
      return
    }
    if (!canFollow) return
    try {
      setError(null)
      setStatus('loading')
      isFollowing
        ? await dispatch(unfollowProfile(username)).unwrap()
        : await dispatch(followProfile(username)).unwrap()
      setStatus('successed')
    } catch (error) {
      setError(error as IResponseError)
    } finally {
      setStatus('idle')
    }
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
      {status === 'loading' && <Spinner />}
      <ErrorList error={error} />
    </Button>
  )
}

export default FollowButton
