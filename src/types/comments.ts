import { ResponseStatus } from './api'
import { IResponseError } from './error'
import { IProfile } from './profile'

export interface IComment {
  id: number
  createdAt: string
  updatedAt: string
  body: string
  author: IProfile
}

export interface ISingleCommentRes {
  comment: IComment
}

export interface IMultiCommentsRes {
  comments: Array<IComment>
}

export interface INewComment {
  body: string
}

export interface INewCommentReq {
  slug: string
  comment: INewComment
}

export interface IDelCommentReq {
  slug: string
  id: number
}

export interface ICommentsState {
  status: ResponseStatus
  error: IResponseError | null
}
