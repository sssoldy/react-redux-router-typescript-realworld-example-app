export interface IGenericResError {
  errors: {
    body: Array<string>
  }
}

export interface IUnexpectedResError {
  status: string
  message: string
}
export interface IResError {
  name: string
  status: number
  message: string
  data: IGenericResError | IUnexpectedResError
}
