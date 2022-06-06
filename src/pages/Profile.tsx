import * as React from 'react'
import ArticleList from '../components/Article/ArticleList'
import ProfileInfo from '../components/ProfileInfo/ProfileInfo'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { getProfileArticles } from '../app/slices/articlesSlice'
import { getProfile } from '../app/slices/profileSlice'
import ProfileFilterTabs from '../components/FilterTabs/ProfileFilterTabs'

const Profile: React.FC = () => {
  const { username } = useParams()

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

  return (
    <div className="profile-page">
      <ProfileInfo />
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            {/* <ArticleFilter /> */}
            <ProfileFilterTabs />
            <ArticleList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
