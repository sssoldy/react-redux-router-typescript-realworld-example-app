import * as React from 'react'
import ArticleList from '../components/Article/ArticleList'
import ArticleFilter from '../components/Article/ArticleFilter'
import PopularTags from '../components/Tag/PopularTags'

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <ArticleFilter />
            <ArticleList />
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <PopularTags />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
