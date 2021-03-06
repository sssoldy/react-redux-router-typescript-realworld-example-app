import * as React from 'react'
import { useAppSelector } from '../../app/hooks'
import {
  selectArticlesConfig,
  getArticlesByQuery,
  selectArticlesLimit,
  selectArticlesCount,
} from '../../app/slices/articlesSlice'
import { useAsyncThunk } from '../../hooks/useAsyncThunk'
import { IMultiArticlesRes } from '../../types/articles'
import ErrorList from '../UI/Error/ErrorList'
import ListSpinner from '../UI/Spinner/ListSpinner'

const InfinityScroll: React.FC = () => {
  const config = useAppSelector(selectArticlesConfig)
  const { isIdle, isLoading, error, run } = useAsyncThunk<IMultiArticlesRes>()

  const articlesCount = useAppSelector(selectArticlesCount)
  const limit = useAppSelector(selectArticlesLimit)
  const canLoad = Boolean(articlesCount && articlesCount === limit)

  const scrollRef = React.useRef<HTMLDivElement | null>(null)
  const observer = React.useRef<IntersectionObserver | null>(null)

  React.useEffect(() => {
    if (isLoading || !config) return
    if (observer.current) observer.current.disconnect()

    const request = async () => {
      const newOffset = config.params.offset + config.params.limit
      const newConfig = {
        ...config,
        params: { ...config.params, offset: newOffset },
      }
      await run(getArticlesByQuery(newConfig))
    }

    observer.current = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting && canLoad && !error) {
        request()
      }
    })

    if (!scrollRef.current) return
    observer.current.observe(scrollRef.current)
  }, [canLoad, config, error, isLoading, run])

  return (
    <>
      <div ref={scrollRef} />
      {error && <ErrorList error={error} />}
      {!isIdle && <ListSpinner />}
    </>
  )
}

export default InfinityScroll
