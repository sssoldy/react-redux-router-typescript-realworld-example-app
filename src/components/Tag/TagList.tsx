import * as React from 'react'
import Tag from './Tag'
import TagFilter from './TagFilter'

interface TagListProps {
  isFilter?: boolean
  tags: Array<string>
}

const TagList: React.FC<TagListProps> = ({ isFilter, tags }) => {
  return (
    <ul className="tag-list">
      {tags.map(tag => {
        return isFilter ? (
          <li key={tag}>
            <TagFilter tag={tag} />
          </li>
        ) : (
          <Tag key={tag} tag={tag} />
        )
      })}
    </ul>
  )
}

export default TagList
