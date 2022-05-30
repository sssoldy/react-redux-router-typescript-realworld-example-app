import * as React from 'react'
import ArticleList from '../components/Article/ArticleList'
import ProfileInfo from '../components/ProfileInfo/ProfileInfo'
import ArticleFilter from '../components/Article/ArticleFilter'

const Profile: React.FC = () => {
  return (
    <div className="profile-page">
      <ProfileInfo />
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <ArticleFilter />
            <ArticleList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
