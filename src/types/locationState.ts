import { IUpdateArticle } from './articles'

export interface IFromState {
  from: {
    pathname: string
  }
}

export interface IEditArticleState {
  slug: string
  article: IUpdateArticle
}
