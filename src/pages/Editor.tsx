import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { addNewArticle, updateArticle } from '../app/slices/articleSlice'
import ErrorList from '../components/Error/ErrorList'
import Spinner from '../components/UI/Spinner/Spinner'
import { useLocationState } from '../hooks/useLocationState'
import { ResponseStatus } from '../types/api'
import { INewArticleReq, IUpdateArticleReq } from '../types/articles'
import { IResError } from '../types/error'
import { IEditArticleState } from '../types/locationState'

const Editor: React.FC = () => {
  const locationState = useLocationState<IEditArticleState>()
  const editArticleSlug = locationState?.slug ?? null
  const articleToEdit = locationState?.article ?? null
  const tagList = articleToEdit?.tagList?.join(', ') ?? ''
  const initialState = {
    title: '',
    description: '',
    body: '',
    ...articleToEdit,
    tagList,
  }

  const [article, setArticle] = React.useState(initialState)
  const [status, setStatus] = React.useState<ResponseStatus>('idle')
  const [error, setError] = React.useState<IResError | null>(null)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onInputChanged = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setArticle(prevarticle => ({
      ...prevarticle,
      [name]: value,
    }))
  }

  const onFormSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const tagList = article.tagList.split(', ')

    try {
      setStatus('loading')
      let data
      if (editArticleSlug) {
        const articleToUpdate: IUpdateArticleReq = {
          slug: editArticleSlug,
          article: { ...article, tagList },
        }
        data = await dispatch(updateArticle(articleToUpdate)).unwrap()
      } else {
        const newArticle: INewArticleReq = { article: { ...article, tagList } }
        data = await dispatch(addNewArticle(newArticle)).unwrap()
      }
      const { slug } = data.article
      navigate(`/article/${slug}`, { replace: true })
    } catch (error) {
      setError(error as IResError)
    } finally {
      setStatus('idle')
    }
  }

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form onSubmit={e => onFormSubmitted(e)}>
              <fieldset disabled={status === 'loading'}>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                    name="title"
                    value={article.title}
                    onChange={e => onInputChanged(e)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                    name="description"
                    value={article.description}
                    onChange={e => onInputChanged(e)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                    name="body"
                    value={article.body}
                    onChange={e => onInputChanged(e)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                    name="tagList"
                    value={article.tagList}
                    onChange={e => onInputChanged(e)}
                  />
                  <div className="tag-list"></div>
                </fieldset>
                <button className="btn btn-lg pull-xs-right btn-primary">
                  {editArticleSlug ? 'Update' : 'Publish'} Article{' '}
                  {status === 'loading' && <Spinner />}
                </button>
              </fieldset>
            </form>
            <ErrorList error={error} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editor
