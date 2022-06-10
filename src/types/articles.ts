import { IAxiosArticlesConfig, IResponseFilter, ResponseStatus } from './api'
import { IResponseError } from './error'
import { IProfile } from './profile'

export interface IArticle {
  slug: string
  title: string
  description: string
  body: string
  tagList: Array<string>
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: IProfile
}

export interface ISingleArticleRes {
  article: IArticle
}

export interface IMultiArticlesRes {
  articles: Array<IArticle>
  articlesCount: number
}

export interface INewArticle {
  title: string
  description: string
  body: string
  tagList?: Array<string>
}

export interface INewArticleReq {
  article: INewArticle
}

export interface IUpdateArticle {
  title: string
  description: string
  body: string
  tagList?: Array<string>
}

export interface IUpdateArticleReq {
  slug: string
  article: IUpdateArticle
}

export interface IArticlesState {
  status: ResponseStatus
  error: IResponseError | null
  articlesCount: number | null
  limit: number
  config: IAxiosArticlesConfig | null
  filter: IResponseFilter | null
}

export interface IArticleState {
  article: IArticle | null
  status: ResponseStatus
  error: IResponseError | null
}
