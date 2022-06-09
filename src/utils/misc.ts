import { AxiosResponse } from 'axios'
import { format, parseISO } from 'date-fns'
import { IAxiosArticleConfigMeta, IAxiosArticlesConfig } from '../types/api'
import { IResponseError } from '../types/error'

export const formatDate = (date: string) =>
  format(parseISO(date), 'MMMM d, yyyy') // November 24, 2021

export const formatDateComment = (date: string) =>
  format(parseISO(date), 'MMM do') // Nov 24th

export const getErrorData = (error: any): IResponseError => {
  return {
    name: error.name,
    status: error.response.status,
    message: error.message,
    data: error.response.data,
  }
}

export const getConfigData = (
  response: AxiosResponse,
): IAxiosArticleConfigMeta => {
  const { url, params } = response.config as IAxiosArticlesConfig
  return {
    config: {
      url,
      params,
    },
  }
}
