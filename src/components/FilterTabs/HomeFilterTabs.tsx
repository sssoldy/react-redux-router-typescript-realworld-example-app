import * as React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  getAllArticles,
  getTaggedArticles,
  getUserFeedArticles,
  selectArticlesFilter,
} from '../../app/slices/articlesSlice'
import { selectUser } from '../../app/slices/userSlice'
import FilterTab from './FilterTab'

const HomeFilterTabs: React.FC = () => {
  const user = useAppSelector(selectUser)
  const filter = useAppSelector(selectArticlesFilter)
  const type = filter?.type ?? null
  const arg = filter?.arg ?? null

  const dispatch = useAppDispatch()

  return (
    <ul className="nav nav-pills outline-active">
      {user && (
        <FilterTab
          filterType="feed"
          onClick={() => dispatch(getUserFeedArticles())}
        >
          Your Feed
        </FilterTab>
      )}
      <FilterTab filterType="global" onClick={() => dispatch(getAllArticles())}>
        Global Feed
      </FilterTab>
      {type === 'tag' && arg && (
        <FilterTab
          filterType="tag"
          onClick={() => dispatch(getTaggedArticles(arg))}
        >
          #{arg}
        </FilterTab>
      )}
    </ul>
  )
}

export default HomeFilterTabs
