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

export interface INewUser {
  username: string
  email: string
  password: string
}

export interface IRegisterUserReq {
  user: INewUser
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
}

export interface IUpdateUserReq {
  user: IUpdateUser
}
