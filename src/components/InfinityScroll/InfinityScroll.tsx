import * as React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  selectArticlesConfig,
  getArticlesByQuery,
} from '../../app/slices/articlesSlice'
import { ResponseStatus } from '../../types/api'
import { IResponseError } from '../../types/error'
import ListSpinner from '../UI/Spinner/ListSpinner'

interface InfinityScrollProps {}

const InfinityScroll: React.FC<InfinityScrollProps> = () => {
  const config = useAppSelector(selectArticlesConfig)
  const [status, setStatus] = React.useState<ResponseStatus>('idle')
  const [error, setError] = React.useState<IResponseError | null>(null)
  const isIdle = status === 'idle'

  const scrollRef = React.useRef<HTMLDivElement | null>(null)
  const observer = React.useRef<IntersectionObserver | null>(null)

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (!isIdle || !config) return
    if (observer.current) observer.current.disconnect()

    const request = async () => {
      const newOffset = config.params.offset + config.params.limit
      const newConfig = {
        ...config,
        params: { ...config.params, offset: newOffset },
      }
      try {
        setError(null)
        setStatus('loading')
        const articles = await dispatch(getArticlesByQuery(newConfig)).unwrap()
        if (!articles.length) {
          setError({
            name: 'IntersectionObserver',
            status: -1,
            message: 'Articles list is empty',
            data: {
              status: '-1',
              message: 'Articles list is empty',
            },
          })
        }
      } catch (error) {
        setError(error as IResponseError)
      } finally {
        setStatus('idle')
      }
    }

    observer.current = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting && !error) {
        console.log(error)
        request()
      }
    })

    if (!scrollRef.current) return
    observer.current.observe(scrollRef.current)
  }, [config, dispatch, error, isIdle])

  return <div ref={scrollRef}>{!isIdle && <ListSpinner />}</div>
}

export default InfinityScroll
