import * as React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

const EditProfileButton: React.FC = () => {
  return (
    <Link to="/settings">
      <Button isActive={false} icon="ion-gear-a" variant="secondary">
        Edit Profile Settings
      </Button>
    </Link>
  )
}

export default EditProfileButton
