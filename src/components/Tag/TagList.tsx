import * as React from 'react'
import { useAppDispatch } from '../../app/hooks'
import { getTaggedArticles } from '../../app/slices/articlesSlice'

interface TagListProps {
  tags: Array<string>
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
  const dispatch = useAppDispatch()

  return (
    <div className="tag-list">
      {tags.map(tag => (
        <button
          key={tag}
          style={{ outline: 'none', border: 'none' }}
          className="tag-pill tag-default"
          onClick={() => dispatch(getTaggedArticles(tag))}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}

export default TagList
