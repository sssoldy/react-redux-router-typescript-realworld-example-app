import * as React from 'react'
import TagFilter from './TagFilter'

interface TagListProps {
  isFilter?: boolean
  tags: Array<string>
}

const TagList: React.FC<TagListProps> = ({ isFilter, tags }) => {
  return (
    <ul className="tag-list">
      {tags.map(tag => {
        if (isFilter) {
          return (
            <li key={tag}>
              <TagFilter tag={tag} />
            </li>
          )
        }
        return (
          <li key={tag} className="tag-default tag-pill tag-outline">
            {tag}
          </li>
        )
      })}
    </ul>
  )
}

export default TagList
