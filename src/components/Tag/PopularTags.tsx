import * as React from 'react'
import { useAsync } from '../../hooks/useAsync'
import { Tags } from '../../services/conduit'
import { ITagsRes } from '../../types/tags'
import ErrorList from '../UI/Error/ErrorList'
import TagFallbackList from './TagFallbackList'
import TagList from './TagList'

const PopularTags: React.FC = () => {
  const { data, error, run, isLoading, isError } = useAsync<ITagsRes>()

  React.useEffect(() => {
    run(Tags.all())
  }, [run])

  if (isLoading) return <TagFallbackList />
  if (isError) return <ErrorList error={error} />
  if (!data || !data.tags.length) return <div>No tags are here... yet.</div>

  return <TagList isFilter={true} tags={data.tags} />
}

export default PopularTags
