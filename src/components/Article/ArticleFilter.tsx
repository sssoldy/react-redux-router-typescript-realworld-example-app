import * as React from 'react'
import {
  getAllArticles,
  getFavoritedArticles,
  getProfileArticles,
  getTaggedArticles,
  getUserFeedArticles,
} from '../../app/slices/articlesSlice'
import { useLocationFilter } from '../../hooks/useLocationFilter'
import FilterItem from './FilterItem'

const ArticleFilter: React.FC = () => {
  const { username, user, filter, isHome, isUser } = useLocationFilter()
  const query = filter.query ?? null

  const userFeedArticleFilter = user && isHome && (
    <FilterItem
      isActive={filter.by === 'feed'}
      onFilterClick={getUserFeedArticles}
    >
      Your Feed
    </FilterItem>
  )

  const globalArticleFilter = isHome && (
    <FilterItem
      isActive={filter.by === 'global'}
      onFilterClick={getAllArticles}
    >
      Global Feed
    </FilterItem>
  )

  const tagArticleFiltler = filter.by === 'tag' && query && (
    <FilterItem
      isActive={filter.by === 'tag'}
      onFilterClick={() => getTaggedArticles(query)}
    >
      {`#${filter.query}`}
    </FilterItem>
  )

  const profileArticleFilter = username && (
    <FilterItem
      isActive={filter.by === 'author'}
      onFilterClick={() => getProfileArticles(username)}
    >
      {isUser ? 'My' : `${username}'s`} Articles
    </FilterItem>
  )

  const favoriteArticleFiltler = username && (
    <FilterItem
      isActive={filter.by === 'favorited'}
      onFilterClick={() => getFavoritedArticles(username)}
    >
      Favorited Articles
    </FilterItem>
  )

  return (
    <div className="articles-toggle">
      <ul className="nav nav-pills outline-active">
        {userFeedArticleFilter}
        {globalArticleFilter}
        {tagArticleFiltler}
        {profileArticleFilter}
        {favoriteArticleFiltler}
      </ul>
    </div>
  )
}

export default ArticleFilter
