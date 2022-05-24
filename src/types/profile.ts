export interface IProfile {
  username: string
  bio: string
  image: string
  following: boolean
}

export interface IProfileRes {
  profile: IProfile
}
