import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  addNewArticle,
  selectActicleStatus,
  selectArticle,
  selectArticleError,
  updateArticle,
} from '../app/slices/articleSlice'
import ErrorList from '../components/Error/ErrorList'
import { useLocationState } from '../hooks/useLocationState'
import { INewArticleReq, IUpdateArticleReq } from '../types/articles'
import { IEditArticleState } from '../types/locationState'

const Editor: React.FC = () => {
  const locationState = useLocationState<IEditArticleState>()
  const editArticleSlug = locationState?.slug ?? null
  const articleToEdit = locationState?.article ?? null

  const article = useAppSelector(selectArticle)
  const status = useAppSelector(selectActicleStatus)
  const error = useAppSelector(selectArticleError)

  const [articleFormData, setArticleFormData] = React.useState({
    title: articleToEdit ? articleToEdit.title : '',
    description: articleToEdit ? articleToEdit.description : '',
    body: articleToEdit ? articleToEdit.body : '',
    tags: articleToEdit ? articleToEdit.tagList?.join(', ') : '',
  })
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onInputChanged = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setIsSubmitted(false)
    setArticleFormData(prevArticleFormData => ({
      ...prevArticleFormData,
      [name]: value,
    }))
  }

  const onFormSubmitted = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitted(true)

    const { title, description, body } = articleFormData
    const tagList = articleFormData.tags?.split(',').map(t => t.trim())
    const articleToReq = { title, description, body, tagList }

    if (editArticleSlug) {
      const articleToUpdate: IUpdateArticleReq = {
        slug: editArticleSlug,
        article: { ...articleToReq },
      }
      dispatch(updateArticle(articleToUpdate))
    } else {
      const newArticle: INewArticleReq = { article: { ...articleToReq } }
      dispatch(addNewArticle(newArticle))
    }
  }

  React.useEffect(() => {
    if (status === 'successed' && article && isSubmitted) {
      navigate(`/article/${article.slug}`, { replace: true })
    }
  }, [article, isSubmitted, navigate, status])

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ErrorList error={error} />

            <form onSubmit={e => onFormSubmitted(e)}>
              <fieldset disabled={status === 'loading'}>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                    name="title"
                    value={articleFormData.title}
                    onChange={e => onInputChanged(e)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                    name="description"
                    value={articleFormData.description}
                    onChange={e => onInputChanged(e)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                    name="body"
                    value={articleFormData.body}
                    onChange={e => onInputChanged(e)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                    name="tags"
                    value={articleFormData.tags}
                    onChange={e => onInputChanged(e)}
                  />
                  <div className="tag-list"></div>
                </fieldset>
                <button className="btn btn-lg pull-xs-right btn-primary">
                  {editArticleSlug ? 'Update' : 'Publish'} Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editor
