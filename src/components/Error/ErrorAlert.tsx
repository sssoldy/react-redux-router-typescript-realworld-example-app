import * as React from 'react'
import { IResponseError } from '../../types/error'
import ErrorList from './ErrorList'

interface ErrorAlertProps {
  error: IResponseError
  hideError: () => void
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, hideError }) => {
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    intervalRef.current = setInterval(() => {
      hideError()
    }, 3000)

    return () => {
      console.log('clearInterval')
      return clearInterval(intervalRef.current as NodeJS.Timeout)
    }
  }, [hideError])

  return (
    <div
      style={{
        position: 'fixed',
        right: '0',
        bottom: '250px',
        width: '300px',
        backgroundColor: '#e2e3e5',
        borderColor: '#d6d8db',
        padding: '0.75rem 1.25rem',
      }}
    >
      <ErrorList error={error} />
    </div>
  )
}

export default ErrorAlert
