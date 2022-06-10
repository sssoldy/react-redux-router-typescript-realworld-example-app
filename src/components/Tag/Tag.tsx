import * as React from 'react'

interface TagProps {
  tag: string
}

const Tag: React.FC<TagProps> = ({ tag }) => {
  return <li className="tag-default tag-pill tag-outline">{tag}</li>
}

export default Tag
