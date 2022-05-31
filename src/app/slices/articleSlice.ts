import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit'
import { Articles, Faforites } from '../../services/conduit'
import {
  IArticleState,
  INewArticleReq,
  ISingleArticleRes,
  IUpdateArticleReq,
} from '../../types/articles'
import { IResError } from '../../types/error'
import { getErrorConfig } from '../../utils/misc'
import { RootState } from '../store'
import { selectArticleById } from './articlesSlice'

export const getArticle = createAsyncThunk<
  ISingleArticleRes,
  string,
  { state: RootState; rejectValue: IResError }
>('article/getArticle', async (slug: string, { getState, rejectWithValue }) => {
  const article = selectArticleById(getState(), slug)
  if (article) return { article }

  try {
    const { data } = await Articles.single(slug)
    return data
  } catch (error) {
    const resError = getErrorConfig(error)
    if (!resError) throw error
    throw rejectWithValue(resError)
  }
})

export const favoriteArticleSingle = createAsyncThunk(
  'article/favoriteArticleSingle',
  async (slug: string, { rejectWithValue }) => {
    try {
      const { data } = await Faforites.add(slug)
      return data
    } catch (error) {
      const resError = getErrorConfig(error)
      if (!resError) throw error
      throw rejectWithValue(resError)
    }
  },
)

export const unfavoriteArticleSingle = createAsyncThunk(
  'article/unfavoriteArticleSingle',
  async (slug: string, { rejectWithValue }) => {
    try {
      const { data } = await Faforites.remove(slug)
      return data
    } catch (error) {
      const resError = getErrorConfig(error)
      if (!resError) throw error
      throw rejectWithValue(resError)
    }
  },
)

export const addNewArticle = createAsyncThunk(
  'article/addNewArticle',
  async (articleData: INewArticleReq, { rejectWithValue }) => {
    try {
      const { data } = await Articles.add(articleData)
      return data
    } catch (error) {
      const resError = getErrorConfig(error)
      if (!resError) throw error
      throw rejectWithValue(resError)
    }
  },
)

export const updateArticle = createAsyncThunk(
  'article/updateArticle',
  async (articleData: IUpdateArticleReq, { rejectWithValue }) => {
    try {
      const { data } = await Articles.update(articleData)
      return data
    } catch (error) {
      const resError = getErrorConfig(error)
      if (!resError) throw error
      throw rejectWithValue(resError)
    }
  },
)

export const deleteArticle = createAsyncThunk(
  'article/deleteArticle',
  async (slug: string, { rejectWithValue }) => {
    try {
      const { data } = await Articles.del(slug)
      return data
    } catch (error) {
      const resError = getErrorConfig(error)
      if (!resError) throw error
      throw rejectWithValue(resError)
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
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        isPending(getArticle, addNewArticle, updateArticle),
        state => {
          state.status = 'loading'
        },
      )
      .addMatcher(
        isRejected(
          getArticle,
          favoriteArticleSingle,
          unfavoriteArticleSingle,
          addNewArticle,
          updateArticle,
          deleteArticle,
        ),
        (state, action) => {
          state.status = 'failed'
          state.error = action.payload as IResError
        },
      )
      .addMatcher(
        isFulfilled(
          getArticle,
          favoriteArticleSingle,
          unfavoriteArticleSingle,
          addNewArticle,
          updateArticle,
        ),
        (state, action) => {
          state.status = 'successed'
          state.article = action.payload.article
        },
      )
      .addMatcher(isFulfilled(deleteArticle), () => initialState)
  },
})

export const selectArticle = (state: RootState) => state.article.article
export const selectActicleStatus = (state: RootState) => state.article.status
export const selectArticleError = (state: RootState) => state.article.error

export default articleSlice.reducer
