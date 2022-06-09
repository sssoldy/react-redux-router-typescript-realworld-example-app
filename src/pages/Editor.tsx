import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { addNewArticle, updateArticle } from '../app/slices/articleSlice'
import ErrorList from '../components/Error/ErrorList'
import Spinner from '../components/UI/Spinner/Spinner'
import { useAsyncThunk } from '../hooks/useAsyncThunk'
import { useLocationState } from '../hooks/useLocationState'
import { INewArticleReq, IUpdateArticleReq } from '../types/articles'
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
  const { isLoading, error, run } = useAsyncThunk()

  const navigate = useNavigate()

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

    // FIXME: add types
    let data
    if (editArticleSlug) {
      const articleToUpdate: IUpdateArticleReq = {
        slug: editArticleSlug,
        article: { ...article, tagList },
      }
      data = await run(updateArticle(articleToUpdate))
    } else {
      const newArticle: INewArticleReq = { article: { ...article, tagList } }
      data = await run(addNewArticle(newArticle))
    }
    const { slug } = data.article
    navigate(`/article/${slug}`, { replace: true })
  }

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form onSubmit={e => onFormSubmitted(e)}>
              <fieldset disabled={isLoading}>
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
                  {isLoading && <Spinner />}
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
