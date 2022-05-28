import axios, { AxiosError } from 'axios'
import { IResError } from '../types/error'

export const getErrorConfig = (error: any | AxiosError): IResError | null => {
  if (axios.isAxiosError(error) && error.response) {
    return {
      name: error.name,
      status: error.response.status,
      message: error.message,
      data: error.response.data,
    } as IResError
  }
  return null
}
