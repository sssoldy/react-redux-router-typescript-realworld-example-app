import { ResponseStatus } from './api'
import { IResError } from './error'

export interface IUser {
  email: string
  token: string
  username: string
  bio: string
  image: string
}

export interface ILoginUser {
  email: string
  password: string
}

export interface ILoginReq {
  user: ILoginUser
}

export interface IRegisterUser {
  username: string
  email: string
  password: string
}

export interface IRegisterUserReq {
  user: IRegisterUser
}

export interface IUserRes {
  user: IUser
}

export interface IUpdateUser {
  email?: string
  token?: string
  username?: string
  bio?: string
  image?: string
  password?: string
}

export interface IUpdateUserReq {
  user: IUpdateUser
}

export interface IUserState {
  user: IUser | null
  initStatus: ResponseStatus
  currentStatus: ResponseStatus
  initError: IResError | null
  currentError: IResError | null
}
