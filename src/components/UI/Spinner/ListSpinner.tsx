import * as React from 'react'
import Spinner from './Spinner'

const ListSpinner: React.FC = () => {
  return (
    <div style={{ fontSize: '2rem', color: '#5cb85c', textAlign: 'center' }}>
      <Spinner />
    </div>
  )
}

export default ListSpinner
