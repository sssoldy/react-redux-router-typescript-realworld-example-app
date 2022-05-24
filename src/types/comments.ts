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
  comment: INewComment
}
