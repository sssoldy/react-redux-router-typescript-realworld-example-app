import * as React from 'react'
import { IResponseError } from '../../types/error'
import ErrorList from './ErrorList'
import './FullPageError.css'

interface FullPageErrorProps {
  error: IResponseError | null
}

const FullPageError: React.FC<FullPageErrorProps> = ({ error }) => {
  return (
    <div role="alert" className="fpe">
      <ErrorList error={error} />
    </div>
  )
}

export default FullPageError
