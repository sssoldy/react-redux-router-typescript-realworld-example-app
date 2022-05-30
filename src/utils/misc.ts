import axios, { AxiosError } from 'axios'
import { format, parseISO } from 'date-fns'
import { IResError } from '../types/error'

export const formatDate = (date: string) =>
  format(parseISO(date), 'MMMM d, yyyy') // November 24, 2021

export const formatDateComment = (date: string) =>
  format(parseISO(date), 'MMM do') // Nov 24th

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
