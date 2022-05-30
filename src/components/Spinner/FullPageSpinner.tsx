import * as React from 'react'
import Spinner from './Spinner'
import './Spinner.css'

const FullPageSpinner: React.FC = () => {
  return (
    <div className="fps">
      <Spinner />
    </div>
  )
}

export default FullPageSpinner
