import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from '@reduxjs/toolkit'
import { Articles, Faforites } from '../../services/conduit'
import {
  IArticleState,
  INewArticleReq,
  ISingleArticleRes,
  IUpdateArticleReq,
} from '../../types/articles'
import { IResError } from '../../types/error'
import { IProfile } from '../../types/profile'
import { getErrorData } from '../../utils/misc'
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
  } catch (error: any) {
    throw error.response ? rejectWithValue(getErrorData(error)) : error
  }
})

export const favoriteArticleSingle = createAsyncThunk(
  'article/favoriteArticleSingle',
  async (slug: string, { rejectWithValue }) => {
    try {
      const { data } = await Faforites.add(slug)
      return data
    } catch (error: any) {
      throw error.response ? rejectWithValue(getErrorData(error)) : error
    }
  },
)

export const unfavoriteArticleSingle = createAsyncThunk(
  'article/unfavoriteArticleSingle',
  async (slug: string, { rejectWithValue }) => {
    try {
      const { data } = await Faforites.remove(slug)
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
      .addMatcher(
        isPending(getArticle, addNewArticle, updateArticle),
        state => {
          state.status = 'loading'
        },
      )
      .addMatcher(
        isRejected(getArticle, addNewArticle, updateArticle, deleteArticle),
        (state, action) => {
          state.status = 'failed'
          state.error = action.payload as IResError
        },
      )
      .addMatcher(
        isFulfilled(getArticle, addNewArticle, updateArticle),
        (state, action) => {
          state.status = 'successed'
          state.article = action.payload.article
        },
      )
      .addMatcher(
        isFulfilled(favoriteArticleSingle, unfavoriteArticleSingle),
        (state, action) => {
          state.article = action.payload.article
        },
      )
      .addMatcher(isFulfilled(deleteArticle), () => initialState)
  },
})

export const { authorUpdated } = articleSlice.actions

export const selectArticle = (state: RootState) => state.article.article
export const selectActicleStatus = (state: RootState) => state.article.status
export const selectArticleError = (state: RootState) => state.article.error

export default articleSlice.reducer
