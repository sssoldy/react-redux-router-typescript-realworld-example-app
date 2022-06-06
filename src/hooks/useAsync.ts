import { AxiosResponse } from 'axios'
import * as React from 'react'
import { ResponseStatus } from '../types/api'
import { IResponseError } from '../types/error'
import { getErrorData } from '../utils/misc'

type InitialState<D> = {
  data?: D | null
  status?: ResponseStatus
  error?: IResponseError | null
}

type DefaultState<D> = {
  data: D | null
  status: ResponseStatus
  error: IResponseError | null
}

function useAsync<T>(initialState?: InitialState<T>) {
  const [state, dispatch] = React.useReducer(
    (s: typeof initialState, a: DefaultState<T>) => ({ ...s, ...a }),
    {
      data: null,
      status: 'idle',
      error: null,
      ...initialState,
    } as DefaultState<T>,
  )

  const { data, error, status } = state

  const setData = React.useCallback(
    (data: T) => dispatch({ data, status: 'successed', error: null }),
    [dispatch],
  )
  const setError = React.useCallback(
    (error: IResponseError | null) =>
      dispatch({ data: null, status: 'failed', error }),
    [dispatch],
  )

  const run = React.useCallback(
    (promise: Promise<AxiosResponse<T, any>>) => {
      dispatch({ data: null, status: 'loading', error: null })

      return promise.then(
        (response: AxiosResponse<T, any>) => {
          setData(response.data)
          return response.data
        },
        (error: IResponseError | null) => {
          setError(getErrorData(error))
          return Promise.reject(error)
        },
      )
    },
    [dispatch, setData, setError],
  )

  return {
    isIdle: status === 'idle',
    isLoading: status === 'loading',
    isError: status === 'failed',
    isSuccess: status === 'successed',

    error,
    status,
    data,
    run,
  }
}

export { useAsync }
