import * as React from 'react'
import { AsyncThunkAction } from '@reduxjs/toolkit'
import { useReducer } from 'react'
import { ResponseStatus } from '../types/api'
import { IResponseError } from '../types/error'
import { store } from '../app/store'

interface State<T> {
  data: T | null
  status: ResponseStatus
  error: IResponseError | null
}

type Action<T> =
  | { type: 'idle' }
  | { type: 'pending' }
  | { type: 'rejected'; error: IResponseError }
  | { type: 'fulfilled'; data: T }
  | { type: 'reset' }

const reducer = <T>(state: State<T>, action: Action<T>): State<T> => {
  switch (action.type) {
    case 'idle':
      return { ...state, status: 'idle' }
    case 'pending':
      return { ...state, status: 'loading', error: null }
    case 'rejected':
      return { ...state, status: 'failed', error: action.error }
    case 'fulfilled':
      return { data: action.data, status: 'successed', error: null }
    case 'reset':
      return { data: null, status: 'idle', error: null }
    default:
      throw new Error()
  }
}

const appDispatch = store.dispatch

const useAsyncThunk = <T>() => {
  const [state, dispatch] = useReducer<React.Reducer<State<T>, Action<T>>>(
    reducer,
    {
      data: null,
      status: 'idle',
      error: null,
    },
  )
  const { data, status, error } = state

  const reset = React.useCallback(() => dispatch({ type: 'reset' }), [])

  const run = React.useCallback(
    async (thunkAction: AsyncThunkAction<T, any, {}>) => {
      try {
        dispatch({ type: 'pending' })
        const data = await appDispatch(thunkAction).unwrap()
        dispatch({ type: 'fulfilled', data: data })
        return data
      } catch (error) {
        dispatch({ type: 'rejected', error: error as IResponseError })
        return Promise.reject(error)
      } finally {
        dispatch({ type: 'idle' })
      }
    },
    [],
  )

  return {
    isIdle: status === 'idle',
    isLoading: status === 'loading',
    isError: status === 'failed',
    isSuccess: status === 'successed',

    data,
    error,
    status,
    reset,
    run,
  }
}

export { useAsyncThunk }
