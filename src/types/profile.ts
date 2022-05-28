import { ResponseStatus } from './api'
import { IResError } from './error'

export interface IProfile {
  username: string
  bio: string
  image: string
  following: boolean
}

export interface IProfileRes {
  profile: IProfile
}

export interface IProfileState {
  profile: IProfile | null
  status: ResponseStatus
  error: IResError | null
}
