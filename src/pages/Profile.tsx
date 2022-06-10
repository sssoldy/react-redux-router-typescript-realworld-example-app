import * as React from 'react'
import ArticleList from '../components/ArticleList/ArticleList'
import ProfileInfo from '../components/Profile/ProfileInfo'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { getProfileArticles } from '../app/slices/articlesSlice'
import { getProfile, selectProfileStatus } from '../app/slices/profileSlice'
import ProfileFilterTabs from '../components/FilterTabs/ProfileFilterTabs'
import NotFound from './NotFound'

const Profile: React.FC = () => {
  const { username } = useParams()
  const status = useAppSelector(selectProfileStatus)

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (username) {
      const articlesPromise = dispatch(getProfileArticles(username))
      const profilePromise = dispatch(getProfile(username))
      return () => {
        articlesPromise.abort()
        profilePromise.abort()
      }
    }
  }, [dispatch, username])

  if (status === 'failed') return <NotFound />

  return (
    <div className="profile-page">
      <ProfileInfo />
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <ProfileFilterTabs />
            <ArticleList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
