import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/UI/Button'

const NotFound: React.FC = () => {
  const navigate = useNavigate()

  const onBackClicked = () => {
    navigate('/', { replace: true })
  }

  return (
    <>
      <div className="banner">
        <div className="container">
          <h1>Lost your way?</h1>
          <p>Sorry, we can't find that page.</p>
          <Button
            isActive={false}
            variant="primary"
            icon="ion-arrow-left-c"
            onClick={onBackClicked}
          >
            Back To Home
          </Button>
        </div>
      </div>
    </>
  )
}

export default NotFound
