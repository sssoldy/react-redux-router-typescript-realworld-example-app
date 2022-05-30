import * as React from 'react'
import { useAsync } from '../../hooks/useAsync'
import { Tags } from '../../services/conduit'
import { ITagsRes } from '../../types/tags'
import ErrorList from '../Error/ErrorList'
import Spinner from '../Spinner/Spinner'
import TagList from './TagList'

interface PopularTagsProps {}

const PopularTags: React.FC<PopularTagsProps> = () => {
  const { data, error, run, isLoading, isError } = useAsync<ITagsRes>()

  React.useEffect(() => {
    run(Tags.all())
  }, [run])

  if (isLoading) return <Spinner />
  if (isError) return <ErrorList error={error} />
  if (!data || !data.tags.length) return <div>No tags are here... yet.</div>

  return <TagList tags={data.tags} />
}

export default PopularTags
