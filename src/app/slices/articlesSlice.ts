import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit'
import { Articles, Faforites } from '../../services/conduit'
import { IResFilter } from '../../types/api'
import { IArticle, IArticlesState } from '../../types/articles'
import { IResError } from '../../types/error'
import { getErrorConfig } from '../../utils/misc'
import { RootState } from '../store'

export const getAllArticles = createAsyncThunk<
  Array<IArticle>,
  void,
  {
    rejectValue: IResError
    pendingMeta: IResFilter
  }
>(
  'articles/getAllArticles',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Articles.all()
      return data.articles
    } catch (error) {
      const resError = getErrorConfig(error)
      if (!resError) throw error
      throw rejectWithValue(resError)
    }
  },
  {
    getPendingMeta() {
      return { by: 'global' }
    },
  },
)

export const getUserFeedArticles = createAsyncThunk<
  Array<IArticle>,
  void,
  { rejectValue: IResError; pendingMeta: IResFilter }
>(
  'articles/getUserFeedArticles',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Articles.feed()
      return data.articles
    } catch (error) {
      const resError = getErrorConfig(error)
      if (!resError) throw error
      throw rejectWithValue(resError)
    }
  },
  {
    getPendingMeta() {
      return { by: 'feed' }
    },
  },
)

export const getProfileArticles = createAsyncThunk<
  Array<IArticle>,
  string,
  {
    rejectValue: IResError
    pendingMeta: IResFilter
  }
>(
  'articles/getProfileArticles',
  async (username, { rejectWithValue }) => {
    try {
      const { data } = await Articles.profile(username)
      return data.articles
    } catch (error) {
      const resError = getErrorConfig(error)
      if (!resError) throw error
      throw rejectWithValue(resError)
    }
  },
  {
    getPendingMeta() {
      return { by: 'author' }
    },
  },
)

export const getFavoritedArticles = createAsyncThunk<
  Array<IArticle>,
  string,
  {
    rejectValue: IResError
    pendingMeta: IResFilter
  }
>(
  'articles/getFavoritedArticles',
  async (username, { rejectWithValue }) => {
    try {
      const { data } = await Articles.favorited(username)
      return data.articles
    } catch (error) {
      const resError = getErrorConfig(error)
      if (!resError) throw error
      throw rejectWithValue(resError)
    }
  },
  {
    getPendingMeta() {
      return { by: 'favorited' }
    },
  },
)

export const getTaggedArticles = createAsyncThunk<
  Array<IArticle>,
  string,
  {
    rejectValue: IResError
    pendingMeta: IResFilter
  }
>(
  'articles/getTaggedArticles',
  async (tag, { rejectWithValue }) => {
    try {
      const { data } = await Articles.tag(tag)
      return data.articles
    } catch (error) {
      const resError = getErrorConfig(error)
      if (!resError) throw error
      throw rejectWithValue(resError)
    }
  },
  {
    getPendingMeta() {
      return { by: 'tag' }
    },
  },
)

// TODO: add error handler
export const favoriteArticle = createAsyncThunk(
  'articles/favoriteArticle',
  async (slug: string) => {
    const { data } = await Faforites.add(slug)
    return data.article
  },
)

export const unfavoriteArticle = createAsyncThunk(
  'articles/unfavoriteArticle',
  async (slug: string) => {
    const { data } = await Faforites.remove(slug)
    return data.article
  },
)

const articlesAdapter = createEntityAdapter<IArticle>({
  selectId: state => state.slug,
})

const initialState = articlesAdapter.getInitialState<IArticlesState>({
  status: 'idle',
  error: null,
  filter: { by: null },
})

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    articleRemoved: (state, action) => {
      articlesAdapter.removeOne(state, action.payload)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(unfavoriteArticle.fulfilled, (state, action) => {
        if (state.filter.by === 'favorited')
          articlesAdapter.removeOne(state, action.payload.slug)
      })
      .addMatcher(
        isPending(
          getAllArticles,
          getUserFeedArticles,
          getProfileArticles,
          getFavoritedArticles,
          getTaggedArticles,
        ),
        (state, action) => {
          state.status = 'loading'
          state.filter.by = action.meta.by
          state.filter.query = action.meta.arg ?? undefined
        },
      )
      .addMatcher(
        isRejected(
          getAllArticles,
          getUserFeedArticles,
          getProfileArticles,
          getFavoritedArticles,
          getTaggedArticles,
        ),
        (state, action) => {
          state.status = 'failed'
          state.error = action.payload ?? null
        },
      )
      .addMatcher(
        isFulfilled(
          getAllArticles,
          getUserFeedArticles,
          getProfileArticles,
          getFavoritedArticles,
          getTaggedArticles,
        ),
        (state, action) => {
          state.status = 'successed'
          state.error = null
          // FIXME:
          articlesAdapter.setAll(state, action.payload)
        },
      )
      .addMatcher(isRejected(favoriteArticle, unfavoriteArticle), state => {
        state.status = 'failed'
      })
      .addMatcher(
        isFulfilled(favoriteArticle, unfavoriteArticle),
        (state, action) => {
          state.status = 'successed'
          const { slug, favorited, favoritesCount } = action.payload
          const update = {
            id: slug,
            changes: { favorited, favoritesCount },
          }
          articlesAdapter.updateOne(state, update)
        },
      )
  },
})

export const { articleRemoved } = articlesSlice.actions

export const {
  selectAll: selectAllArticles,
  selectById: selectArticleById,
  selectIds: selectArticlesIds,
} = articlesAdapter.getSelectors((state: RootState) => state.articles)

export const selectArticlesStatus = (state: RootState) => state.articles.status
export const selectArticlesError = (state: RootState) => state.articles.error
export const selectArticlesFilter = (state: RootState) => state.articles.filter

export default articlesSlice.reducer
