import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit'
import { Articles, Faforites } from '../../services/conduit'
import { IArticleState } from '../../types/articles'
import { IResError } from '../../types/error'
import { getErrorConfig } from '../../utils/misc'
import { RootState } from '../store'

export const getArticle = createAsyncThunk(
  'article/getArticle',
  async (slug: string, { rejectWithValue }) => {
    try {
      const { data } = await Articles.single(slug)
      return data
    } catch (error) {
      const resError = getErrorConfig(error)
      if (!resError) throw error
      throw rejectWithValue(resError)
    }
  },
)

export const favoriteArticleSingle = createAsyncThunk(
  'article/favoriteArticleSingle',
  async (slug: string) => {
    const { data } = await Faforites.add(slug)
    return data
  },
)

export const unfavoriteArticleSingle = createAsyncThunk(
  'article/unfavoriteArticleSingle',
  async (slug: string) => {
    const { data } = await Faforites.remove(slug)
    return data
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
      .addMatcher(isPending(getArticle), state => {
        state.status = 'loading'
      })
      .addMatcher(
        isRejected(getArticle, favoriteArticleSingle, unfavoriteArticleSingle),
        (state, action) => {
          state.status = 'failed'
          state.error = action.payload as IResError
        },
      )
      .addMatcher(
        isFulfilled(getArticle, favoriteArticleSingle, unfavoriteArticleSingle),
        (state, action) => {
          state.status = 'successed'
          state.article = action.payload.article
        },
      )
  },
})

export const selectArticle = (state: RootState) => state.article.article
export const selectActicleStatus = (state: RootState) => state.article.status
export const selectArticleError = (state: RootState) => state.article.error

export default articleSlice.reducer
