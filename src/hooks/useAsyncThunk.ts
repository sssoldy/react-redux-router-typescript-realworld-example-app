import * as React from 'react'
import { AsyncThunkAction } from '@reduxjs/toolkit'
import { useReducer } from 'react'
import { ResponseStatus } from '../types/api'
import { IResponseError } from '../types/error'
import { store } from '../app/store'

interface State {
  status: ResponseStatus
  error: IResponseError | null
}

type Action =
  | { type: 'idle' }
  | { type: 'pending' }
  | { type: 'rejected'; error: IResponseError }
  | { type: 'fulfilled' }
  | { type: 'reset' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'idle':
      return { ...state, status: 'idle' }
    case 'pending':
      return { status: 'loading', error: null }
    case 'rejected':
      return { status: 'failed', error: action.error }
    case 'fulfilled':
      return { status: 'successed', error: null }
    case 'reset':
      return { status: 'idle', error: null }
    default:
      throw new Error()
  }
}

const appDispatch = store.dispatch

const useAsyncThunk = () => {
  const [state, dispatch] = useReducer(reducer, {
    status: 'idle',
    error: null,
  })
  const { status, error } = state

  const reset = React.useCallback(() => dispatch({ type: 'reset' }), [])

  const run = React.useCallback(
    async (thunkAction: AsyncThunkAction<any, any, {}>) => {
      try {
        dispatch({ type: 'pending' })
        const data = await appDispatch(thunkAction).unwrap()
        dispatch({ type: 'fulfilled' })
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

    error,
    status,
    reset,
    run,
  }
}

export { useAsyncThunk }
