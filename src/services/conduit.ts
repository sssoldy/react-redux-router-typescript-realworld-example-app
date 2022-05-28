import axios from 'axios'
import { store } from '../app/store'
import {
  IMultiArticlesRes,
  INewArticleReq,
  ISingleArticleRes,
  IUpdateArticleReq,
} from '../types/articles'
import {
  IMultiCommentsRes,
  INewComment,
  ISingleCommentRes,
} from '../types/comments'
import { IProfileRes } from '../types/profile'
import { ITagsRes } from '../types/tags'
import {
  ILoginReq,
  IRegisterUserReq,
  IUpdateUserReq,
  IUserRes,
} from '../types/user'

axios.defaults.baseURL = 'https://api.realworld.io/api/'

// https://github.com/axios/axios#interceptors
axios.interceptors.request.use(function (config) {
  if (!config.headers) config.headers = {}

  const token = store.getState().user.user?.token

  if (token) config.headers.Authorization = `Token ${token}`

  return config
})

// User and Authentication
export const Auth = {
  login: async (loginUser: ILoginReq) =>
    await axios.post('users/login', loginUser),

  register: async (registerUser: IRegisterUserReq) =>
    await axios.post<IUserRes>('users', registerUser),

  current: async (token: string) =>
    await axios.get<IUserRes>('/user', {
      headers: {
        authorization: `Token ${token}`,
      },
    }),

  update: async (user: IUpdateUserReq) =>
    await axios.put<IUserRes>('user', user),
}

// Profile
export const Profile = {
  get: async (username: string) =>
    await axios.get<IProfileRes>(`profiles/${username}`),

  follow: async (username: string) =>
    await axios.post<IProfileRes>(`profiles/${username}/follow`),

  unfollow: async (username: string) =>
    await axios.delete<IProfileRes>(`profiles/${username}/follow`),
}

// Articles
export const Articles = {
  feed: async () =>
    await axios.get<IMultiArticlesRes>('articles/feed?limit=20&offset=0'),

  all: async () =>
    await axios.get<IMultiArticlesRes>('articles/feed?limit=20&offset=0'),

  single: async (slug: string) =>
    await axios.get<ISingleArticleRes>(`articles/${slug}`),

  add: async (article: INewArticleReq) =>
    await axios.post<ISingleArticleRes>('articles', article),

  update: async (slug: string, article: IUpdateArticleReq) =>
    await axios.put<ISingleArticleRes>(`articles/${slug}`, article),

  del: async (slug: string) => await axios.delete(`articles/${slug}`),
}

// Comments
export const Comments = {
  all: async (slug: string) =>
    await axios.get<IMultiCommentsRes>(`articles/${slug}/comments`),

  add: async (slug: string, comment: INewComment) =>
    await axios.post<ISingleCommentRes>(`articles/${slug}/comments`, comment),

  delete: async (slug: string, id: number) =>
    await axios.delete(`articles/${slug}/comments/${id}`),
}

// Favorites
export const Faforites = {
  add: async (slug: string) =>
    await axios.post<ISingleArticleRes>(`articles/${slug}/favorite`),

  remove: async (slug: string) =>
    await axios.delete(`articles/${slug}/favorite`),
}

// Tags
export const Tags = {
  all: async () => await axios.get<ITagsRes>('tags'),
}
