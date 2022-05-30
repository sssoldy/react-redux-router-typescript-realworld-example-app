import * as React from 'react'
import {
  IGenericResError,
  IResError,
  IUnexpectedResError,
} from '../../types/error'

interface ErrorListProps {
  error: IResError | null
}

const ErrorList: React.FC<ErrorListProps> = ({ error }) => {
  if (!error) return null

  const { status, message, data } = error
  const unErrData = data as IUnexpectedResError
  const genErrData = data as IGenericResError

  let content
  switch (status) {
    case 401:
      content = <p>{unErrData.message}</p>
      break
    case 403:
    case 422:
      content = Object.entries(genErrData.errors).map(([type, messages]) => {
        return (
          <li key={type}>
            {type} {messages}
          </li>
        )
      })
      break

    default:
      content = ''
      break
  }

  return (
    <ul className="error-messages">
      <p>Status code: {status}</p>
      <p>Message: {message}</p>
      {content}
    </ul>
  )
}

export default ErrorList
