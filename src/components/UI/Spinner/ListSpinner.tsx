import * as React from 'react'
import Spinner from './Spinner'

interface ListSpinnerProps {}

const ListSpinner: React.FC<ListSpinnerProps> = () => {
  return (
    <div style={{ fontSize: '2rem', color: '#5cb85c', textAlign: 'center' }}>
      <Spinner />
    </div>
  )
}

export default ListSpinner
