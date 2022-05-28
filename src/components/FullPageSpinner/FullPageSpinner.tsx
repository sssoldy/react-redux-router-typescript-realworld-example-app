import * as React from 'react'
import './FullPageSpinner.css'

const FullPageSpinner: React.FC = () => {
  return (
    <div className="fps">
      <div className="fps-grid">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default FullPageSpinner
