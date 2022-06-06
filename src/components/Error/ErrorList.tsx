import * as React from 'react'
import {
  IGenericResError,
  IResponseError,
  IUnexpectedResError,
} from '../../types/error'

interface ErrorListProps {
  error: IResponseError | null
}

const ErrorList: React.FC<ErrorListProps> = ({ error }) => {
  if (!error) return null

  const { status, message, data } = error
  const unErrData = data as IUnexpectedResError
  const genErrData = data as IGenericResError

  let content
  switch (status) {
    case 401:
      content = <pre>{unErrData.message}</pre>
      break
    case 403:
    case 422:
      content = Object.entries(genErrData.errors).map(([type, messages]) => {
        return (
          <pre style={{ color: '#ef5350' }} key={type}>
            {type} {messages}
          </pre>
        )
      })
      break

    default:
      content = `${status} ${message}`
      break
  }

  return (
    <div style={{ color: '#ef5350' }}>
      <span style={{ color: '#ef5350' }}>There was an error: </span>
      {content}
    </div>
  )
}

export default ErrorList
