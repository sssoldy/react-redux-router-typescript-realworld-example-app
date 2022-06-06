import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  PayloadAction,
} from '@reduxjs/toolkit'
import { Articles, Faforites } from '../../services/conduit'
import {
  IArticleState,
  INewArticleReq,
  ISingleArticleRes,
  IUpdateArticleReq,
} from '../../types/articles'
import { IResponseError } from '../../types/error'
import { IProfile } from '../../types/profile'
import { getErrorData } from '../../utils/misc'
import { RootState } from '../store'
import { articleFavoriteToggled, selectArticleById } from './articlesSlice'

export const getArticle = createAsyncThunk<
  ISingleArticleRes,
  string,
  { state: RootState; rejectValue: IResponseError }
>('article/getArticle', async (slug: string, { getState, rejectWithValue }) => {
  const article = selectArticleById(getState(), slug)
  if (article) return { article }

  try {
    const { data } = await Articles.single(slug)
    return data
  } catch (error: any) {
    throw error.response ? rejectWithValue(getErrorData(error)) : error
  }
})

export const favoriteArticle = createAsyncThunk<
  ISingleArticleRes,
  string,
  { state: RootState; rejectValue: IResponseError }
>(
  'article/favoriteArticle',
  async (slug: string, { getState, dispatch, rejectWithValue }) => {
    try {
      const { data } = await Faforites.add(slug)
      const isArticles = getState().articles.status === 'successed'
      if (isArticles) dispatch(articleFavoriteToggled(data.article))
      return data
    } catch (error: any) {
      throw error.response ? rejectWithValue(getErrorData(error)) : error
    }
  },
)

export const unfavoriteArticle = createAsyncThunk<
  ISingleArticleRes,
  string,
  { state: RootState; rejectValue: IResponseError }
>(
  'article/unfavoriteArticle',
  async (slug: string, { getState, dispatch, rejectWithValue }) => {
    try {
      const { data } = await Faforites.remove(slug)
      const isArticles = getState().articles.status === 'successed'
      if (isArticles) dispatch(articleFavoriteToggled(data.article))
      return data
    } catch (error: any) {
      throw error.response ? rejectWithValue(getErrorData(error)) : error
    }
  },
)

export const addNewArticle = createAsyncThunk(
  'article/addNewArticle',
  async (articleData: INewArticleReq, { rejectWithValue }) => {
    try {
      const { data } = await Articles.add(articleData)
      return data
    } catch (error: any) {
      throw error.response ? rejectWithValue(getErrorData(error)) : error
    }
  },
)

export const updateArticle = createAsyncThunk(
  'article/updateArticle',
  async (articleData: IUpdateArticleReq, { rejectWithValue }) => {
    try {
      const { data } = await Articles.update(articleData)
      return data
    } catch (error: any) {
      throw error.response ? rejectWithValue(getErrorData(error)) : error
    }
  },
)

export const deleteArticle = createAsyncThunk(
  'article/deleteArticle',
  async (slug: string, { rejectWithValue }) => {
    try {
      const { data } = await Articles.del(slug)
      return data
    } catch (error: any) {
      throw error.response ? rejectWithValue(getErrorData(error)) : error
    }
  },
)

const initialState: IArticleState = {
  article: null,
  status: 'idle',
  error: null,
}

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    authorUpdated: (state, action: PayloadAction<IProfile>) => {
      if (state.article?.author) {
        state.article.author = action.payload
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getArticle.pending, state => {
        state.status = 'loading'
      })
      .addCase(getArticle.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as IResponseError
      })
      .addCase(getArticle.fulfilled, (state, action) => {
        state.status = 'successed'
        state.article = action.payload.article
      })
      .addCase(deleteArticle.fulfilled, () => initialState)
      .addMatcher(
        isFulfilled(addNewArticle, updateArticle),
        (state, action) => {
          state.article = action.payload.article
        },
      )
      .addMatcher(
        isFulfilled(favoriteArticle, unfavoriteArticle),
        (state, action) => {
          state.article = action.payload.article
        },
      )
  },
})

export const { authorUpdated } = articleSlice.actions

export const selectArticle = (state: RootState) => state.article.article
export const selectActicleStatus = (state: RootState) => state.article.status
export const selectArticleError = (state: RootState) => state.article.error

export default articleSlice.reducer
