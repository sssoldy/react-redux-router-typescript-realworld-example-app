import * as React from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  getFavoritedArticles,
  getProfileArticles,
} from '../../app/slices/articlesSlice'
import { selectUser } from '../../app/slices/userSlice'
import FilterTab from './FilterTab'

const ProfileFilterTabs: React.FC = () => {
  const { username } = useParams()
  const user = useAppSelector(selectUser)
  const isUser = username === user?.username

  const dispatch = useAppDispatch()

  if (!username) return null

  return (
    <ul className="nav nav-pills outline-active">
      <FilterTab
        filterType="author"
        onClick={() => dispatch(getProfileArticles(username))}
      >
        {isUser ? 'My' : `${username}'s`} Article
      </FilterTab>
      <FilterTab
        filterType="favorited"
        onClick={() => dispatch(getFavoritedArticles(username))}
      >
        Favorite Article
      </FilterTab>
    </ul>
  )
}

export default ProfileFilterTabs
