import { IUser } from '../types/user'
import avatar from '../assets/avatar.jpg'

export const userFallbackData: IUser = {
  email: 'Loading email...',
  token: 'Loading token...',
  username: 'Loading username...',
  bio: 'Loading bio...',
  image: avatar,
}
