import { AxiosRequestConfig } from 'axios'

export type ResponseStatus = 'idle' | 'loading' | 'failed' | 'successed'

export type ResponseType = 'feed' | 'global' | 'author' | 'favorited' | 'tag'

export interface IResponseFilter {
  type: ResponseType
  arg: string | null
}

export interface IResponseFilterMeta {
  filter: IResponseFilter
}

export interface IAxiosArticlesParams {
  limit: number
  offset: number
  author?: string
  favorited?: string
  tag?: string
}

export interface IAxiosArticlesConfig extends AxiosRequestConfig {
  url: 'articles' | 'articles/feed'
  params: IAxiosArticlesParams
}

export interface IAxiosArticleConfigMeta {
  config: IAxiosArticlesConfig
}
