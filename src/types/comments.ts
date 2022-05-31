import { ResponseStatus } from './api'
import { IResError } from './error'
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

export interface ICommentsState {
  status: ResponseStatus
  error: IResError | null
}
