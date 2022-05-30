export type ResponseStatus = 'idle' | 'loading' | 'failed' | 'successed'

export type ResponseFilter = 'feed' | 'global' | 'author' | 'favorited' | 'tag'
export interface IResFilter {
  by: ResponseFilter | null
  query?: string
}
