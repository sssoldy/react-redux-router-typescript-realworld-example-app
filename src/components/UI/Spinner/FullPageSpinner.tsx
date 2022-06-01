import * as React from 'react'
import Spinner from './Spinner'

const FullPageSpinner: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: '300px',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2rem',
        color: '#5cb85c',
      }}
    >
      <Spinner />
    </div>
  )
}

export default FullPageSpinner
