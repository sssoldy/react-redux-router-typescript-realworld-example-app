import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { IArticle } from '../../types/articles'
import { IEditArticleState } from '../../types/locationState'
import Button from './Button'

interface EditArticleButtonProps {
  article: IArticle
}

const EditArticleButton: React.FC<EditArticleButtonProps> = ({ article }) => {
  const navigate = useNavigate()

  const onEditClicked = () => {
    const { slug, title, description, body, tagList } = article
    const state: IEditArticleState = {
      slug,
      article: { title, description, body, tagList },
    }
    navigate('/editor', { state })
  }

  return (
    <Button
      isActive={false}
      variant="secondary"
      icon="ion-edit"
      onClick={onEditClicked}
    >
      Edit Article
    </Button>
  )
}

export default EditArticleButton
