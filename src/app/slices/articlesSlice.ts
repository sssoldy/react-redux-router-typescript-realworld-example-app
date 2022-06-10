import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from '@reduxjs/toolkit'
import { Articles } from '../../services/conduit'
import {
  IAxiosArticleConfigMeta,
  IAxiosArticlesConfig,
  IResponseFilterMeta,
} from '../../types/api'
import {
  IArticle,
  IArticlesState,
  IMultiArticlesRes,
} from '../../types/articles'
import { IResponseError } from '../../types/error'
import { getConfigData, getErrorData } from '../../utils/misc'
import { RootState } from '../store'

export const getAllArticles = createAsyncThunk<
  IMultiArticlesRes,
  void,
  {
    state: RootState
    pendingMeta: IResponseFilterMeta
    rejectValue: IResponseError
    fulfilledMeta: IAxiosArticleConfigMeta
  }
>(
  'articles/getAllArticles',
  async (_, { getState, rejectWithValue, fulfillWithValue }) => {
    try {
      const limit = getState().articles.limit
      const response = await Articles.all(limit)
      return fulfillWithValue(response.data, getConfigData(response))
    } catch (error: any) {
      throw error.response ? rejectWithValue(getErrorData(error)) : error
    }
  },
  {
    getPendingMeta() {
      return { filter: { type: 'global', arg: null } }
    },
  },
)

export const getUserFeedArticles = createAsyncThunk<
  IMultiArticlesRes,
  void,
  {
    state: RootState
    pendingMeta: IResponseFilterMeta
    rejectValue: IResponseError
    fulfilledMeta: IAxiosArticleConfigMeta
  }
>(
  'articles/getUserFeedArticles',
  async (_, { getState, rejectWithValue, fulfillWithValue }) => {
    try {
      const limit = getState().articles.limit
      const response = await Articles.feed(limit)
      return fulfillWithValue(response.data, getConfigData(response))
    } catch (error: any) {
      throw error.response ? rejectWithValue(getErrorData(error)) : error
    }
  },
  {
    getPendingMeta() {
      return { filter: { type: 'feed', arg: null } }
    },
  },
)

export const getProfileArticles = createAsyncThunk<
  IMultiArticlesRes,
  string,
  {
    state: RootState
    pendingMeta: IResponseFilterMeta
    rejectValue: IResponseError
    fulfilledMeta: IAxiosArticleConfigMeta
  }
>(
  'articles/getProfileArticles',
  async (username, { getState, rejectWithValue, fulfillWithValue }) => {
    try {
      const limit = getState().articles.limit
      const response = await Articles.profile(username, limit)
      return fulfillWithValue(response.data, getConfigData(response))
    } catch (error: any) {
      throw error.response ? rejectWithValue(getErrorData(error)) : error
    }
  },
  {
    getPendingMeta(base) {
      return { filter: { type: 'author', arg: base.arg } }
    },
  },
)

export const getFavoritedArticles = createAsyncThunk<
  IMultiArticlesRes,
  string,
  {
    state: RootState
    pendingMeta: IResponseFilterMeta
    rejectValue: IResponseError
    fulfilledMeta: IAxiosArticleConfigMeta
  }
>(
  'articles/getFavoritedArticles',
  async (username, { getState, rejectWithValue, fulfillWithValue }) => {
    try {
      const limit = getState().articles.limit
      const response = await Articles.favorited(username, limit)
      return fulfillWithValue(response.data, getConfigData(response))
    } catch (error: any) {
      throw error.response ? rejectWithValue(getErrorData(error)) : error
    }
  },
  {
    getPendingMeta(base) {
      return { filter: { type: 'favorited', arg: base.arg } }
    },
  },
)

export const getTaggedArticles = createAsyncThunk<
  IMultiArticlesRes,
  string,
  {
    state: RootState
    pendingMeta: IResponseFilterMeta
    rejectValue: IResponseError
    fulfilledMeta: IAxiosArticleConfigMeta
  }
>(
  'articles/getTaggedArticles',
  async (tag, { getState, rejectWithValue, fulfillWithValue }) => {
    try {
      const limit = getState().articles.limit
      const response = await Articles.tag(tag, limit)
      return fulfillWithValue(response.data, getConfigData(response))
    } catch (error: any) {
      throw error.response ? rejectWithValue(getErrorData(error)) : error
    }
  },
  {
    getPendingMeta(base) {
      return { filter: { type: 'tag', arg: base.arg } }
    },
  },
)

export const getArticlesByQuery = createAsyncThunk<
  IMultiArticlesRes,
  IAxiosArticlesConfig,
  {
    state: RootState
    pendingMeta: IResponseFilterMeta
    rejectValue: IResponseError
    fulfilledMeta: IAxiosArticleConfigMeta
  }
>(
  'articles/getArticlesByQuery',
  async (query, { getState, rejectWithValue, fulfillWithValue }) => {
    try {
      const limit = getState().articles.limit
      const response = await Articles.query(query, limit)
      return fulfillWithValue(response.data, getConfigData(response))
    } catch (error: any) {
      throw error.response ? rejectWithValue(getErrorData(error)) : error
    }
  },
  {
    getPendingMeta() {
      return { filter: { type: 'global', arg: null } }
    },
  },
)

const articlesAdapter = createEntityAdapter<IArticle>({
  selectId: state => state.slug,
})

const initialState = articlesAdapter.getInitialState<IArticlesState>({
  status: 'idle',
  error: null,
  articlesCount: null,
  limit: 10,
  config: null,
  filter: null,
})

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    articleFavoriteToggled: (state, action: PayloadAction<IArticle>) => {
      const { slug, favorited, favoritesCount } = action.payload
      const update = {
        id: slug,
        changes: { favorited, favoritesCount },
      }
      articlesAdapter.updateOne(state, update)

      if (state.filter?.type === 'favorited') {
        articlesAdapter.removeOne(state, slug)
      }
    },
  },
  extraReducers: builder => {
    builder
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
          state.filter = action.meta.filter
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
          state.config = action.meta.config
          state.articlesCount = action.payload.articlesCount
          articlesAdapter.setAll(state, action.payload.articles)
        },
      )
      .addMatcher(isFulfilled(getArticlesByQuery), (state, action) => {
        state.config = action.meta.config
        state.articlesCount = action.payload.articlesCount
        articlesAdapter.addMany(state, action.payload.articles)
      })
  },
})

export const { articleFavoriteToggled } = articlesSlice.actions

export const {
  selectAll: selectAllArticles,
  selectById: selectArticleById,
  selectIds: selectArticlesIds,
} = articlesAdapter.getSelectors((state: RootState) => state.articles)

export const selectArticleByUsername = createSelector(
  [selectAllArticles, (_, username: string) => username],
  (articles, username) =>
    articles.find(article => article.author.username === username),
)

export const selectArticlesStatus = (state: RootState) => state.articles.status
export const selectArticlesError = (state: RootState) => state.articles.error
export const selectArticlesFilter = (state: RootState) => state.articles.filter
export const selectArticlesConfig = (state: RootState) => state.articles.config
export const selectArticlesLimit = (state: RootState) => state.articles.limit
export const selectArticlesCount = (state: RootState) =>
  state.articles.articlesCount

export default articlesSlice.reducer
