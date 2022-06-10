import avatarPlaceholder from '../assets/avatar-placeholder.svg'
import { IUser } from '../types/user'
import { IProfile } from '../types/profile'
import { IArticle } from '../types/articles'

export const userFallback: IUser = {
  email: 'Loading...',
  token: 'Loading...',
  username: 'Loading...',
  bio: 'Loading...',
  image: avatarPlaceholder,
}

export const profileFallback: IProfile = {
  username: 'Loading...',
  bio: 'Loading...',
  image: avatarPlaceholder,
  following: false,
}

export const tagFallbackList = Array.from({ length: 7 }, () => 'loading')

export const articleFallback: IArticle = {
  slug: 'Loading...',
  title: 'Loading...',
  description: 'Loading...',
  body: 'Loading...',
  tagList: ['loading'],
  createdAt: '2022-01-01T12:00:00',
  updatedAt: '2022-01-01T12:00:00',
  favorited: false,
  favoritesCount: 0,
  author: profileFallback,
}

export const articleFallbackList = Array.from({ length: 10 }, (_, index) => ({
  ...articleFallback,
  slug: `${index}`,
}))

const cammentFallback = {
  createdAt: '2022-01-01T12:00:00',
  updatedAt: '2022-01-01T12:00:00',
  body: 'Loading...',
  author: profileFallback,
}

export const commentFallbackList = Array.from({ length: 3 }, (_, index) => ({
  id: index,
  ...cammentFallback,
}))
