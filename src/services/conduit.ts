import axios from 'axios'
import { store } from '../app/store'
import { IAxiosArticlesConfig } from '../types/api'
import {
  IMultiArticlesRes,
  INewArticleReq,
  ISingleArticleRes,
  IUpdateArticleReq,
} from '../types/articles'
import {
  IDelCommentReq,
  IMultiCommentsRes,
  INewCommentReq,
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
  query: async (config: IAxiosArticlesConfig) =>
    await axios.request<IMultiArticlesRes>({
      method: 'get',
      ...config,
    } as IAxiosArticlesConfig),

  feed: async () =>
    await axios.request<IMultiArticlesRes>({
      method: 'get',
      url: 'articles/feed',
      params: { limit: 3, offset: 0 },
    } as IAxiosArticlesConfig),

  profile: async (username: string) =>
    await axios.request<IMultiArticlesRes>({
      method: 'get',
      url: 'articles',
      params: { limit: 3, offset: 0, author: username },
    } as IAxiosArticlesConfig),

  favorited: async (username: string) =>
    await axios.request<IMultiArticlesRes>({
      method: 'get',
      url: 'articles',
      params: { limit: 3, offset: 0, favorited: username },
    } as IAxiosArticlesConfig),

  tag: async (tag: string) =>
    await axios.request<IMultiArticlesRes>({
      method: 'get',
      url: 'articles',
      params: { limit: 3, offset: 0, tag: tag },
    } as IAxiosArticlesConfig),

  all: async () =>
    await axios.request<IMultiArticlesRes>({
      method: 'get',
      url: 'articles',
      params: { limit: 3, offset: 0 },
    } as IAxiosArticlesConfig),

  single: async (slug: string) =>
    await axios.get<ISingleArticleRes>(`articles/${slug}`),

  add: async (article: INewArticleReq) =>
    await axios.post<ISingleArticleRes>('articles', article),

  update: async (articleReqData: IUpdateArticleReq) =>
    await axios.put<ISingleArticleRes>(`articles/${articleReqData.slug}`, {
      article: articleReqData.article,
    }),

  del: async (slug: string) => await axios.delete(`articles/${slug}`),
}

// Comments
export const Comments = {
  all: async (postSlug: string) =>
    await axios.get<IMultiCommentsRes>(`articles/${postSlug}/comments`),

  add: async (newCommentData: INewCommentReq) =>
    await axios.post<ISingleCommentRes>(
      `articles/${newCommentData.slug}/comments`,
      { comment: newCommentData.comment },
    ),

  delete: async (deleteCommentData: IDelCommentReq) => {
    const { slug, id } = deleteCommentData
    return await axios.delete(`articles/${slug}/comments/${id}`)
  },
}

// Favorites
export const Faforites = {
  add: async (slug: string) =>
    await axios.post<ISingleArticleRes>(`articles/${slug}/favorite`),

  remove: async (slug: string) =>
    await axios.delete<ISingleArticleRes>(`articles/${slug}/favorite`),
}

// Tags
export const Tags = {
  all: async () => await axios.get<ITagsRes>('tags'),
}
