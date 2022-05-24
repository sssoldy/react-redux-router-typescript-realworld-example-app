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
  title?: string
  description?: string
  body?: string
}

export interface IUpdateArticleReq {
  article: IUpdateArticle
}
