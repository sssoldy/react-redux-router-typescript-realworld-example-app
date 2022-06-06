import * as React from 'react'
import ArticleList from '../components/Article/ArticleList'
import PopularTags from '../components/Tag/PopularTags'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectUserToken } from '../app/slices/userSlice'
import {
  getUserFeedArticles,
  getAllArticles,
} from '../app/slices/articlesSlice'
import HomeFilterTabs from '../components/FilterTabs/HomeFilterTabs'

const Home: React.FC = () => {
  const token = useAppSelector(selectUserToken)

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    const promise = token
      ? dispatch(getUserFeedArticles())
      : dispatch(getAllArticles())
    return () => {
      promise.abort()
    }
  }, [dispatch, token])

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
            <HomeFilterTabs />
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
