import { IUser } from '../types/user'
import avatar from '../assets/avatar.jpg'
import { IProfile } from '../types/profile'

export const userFallbackData: IUser = {
  email: 'Loading email...',
  token: 'Loading token...',
  username: 'Loading username...',
  bio: 'Loading bio...',
  image: avatar,
}

export const profileFallbackData: IProfile = {
  username: 'Loading username...',
  bio: 'Loading bio...',
  image: avatar,
  following: false,
}
