import * as React from 'react'
import { tagFallbackList } from '../../utils/fallbackData'
import Tag from './Tag'

const TagFallbackList: React.FC = () => {
  return (
    <>
      {tagFallbackList.map((tag, i) => (
        <Tag key={i} tag={tag} />
      ))}
    </>
  )
}

export default TagFallbackList
