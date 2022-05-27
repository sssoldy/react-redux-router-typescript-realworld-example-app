import * as React from 'react'
import { IGenericResError } from '../../types/error'

interface ErrorListProps {
  errors: IGenericResError | null
}

const ErrorList: React.FC<ErrorListProps> = ({ errors }) => {
  if (!errors) return null

  return (
    <ul className="error-messages">
      {Object.entries(errors.errors).map(([type, messages]) => {
        return (
          <li key={type}>
            {type} {messages}
          </li>
        )
      })}
    </ul>
  )
}

export default ErrorList
