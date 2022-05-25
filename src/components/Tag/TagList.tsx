import * as React from 'react'

interface TagListProps {}

const TagList: React.FC<TagListProps> = () => {
  return (
    <div className="tag-list">
      <a href="/" className="tag-pill tag-default">
        programming
      </a>
      <a href="/" className="tag-pill tag-default">
        javascript
      </a>
      <a href="/" className="tag-pill tag-default">
        emberjs
      </a>
      <a href="/" className="tag-pill tag-default">
        angularjs
      </a>
      <a href="/" className="tag-pill tag-default">
        react
      </a>
      <a href="/" className="tag-pill tag-default">
        mean
      </a>
      <a href="/" className="tag-pill tag-default">
        node
      </a>
      <a href="/" className="tag-pill tag-default">
        rails
      </a>
    </div>
  )
}

export default TagList
