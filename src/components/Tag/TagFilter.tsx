import * as React from 'react'
import { useAppDispatch } from '../../app/hooks'
import { getTaggedArticles } from '../../app/slices/articlesSlice'

interface TagFilterProps {
  tag: string
}

const TagFilter: React.FC<TagFilterProps> = ({ tag }) => {
  const dispatch = useAppDispatch()

  return (
    <button
      style={{ outline: 'none', border: 'none' }}
      className="tag-pill tag-default"
      onClick={() => dispatch(getTaggedArticles(tag))}
    >
      {tag}
    </button>
  )
}

export default TagFilter
