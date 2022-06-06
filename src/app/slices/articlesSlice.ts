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
import { IAxiosArticleConfigMeta, IResponseFilterMeta } from '../../types/api'
import { IArticle, IArticlesState } from '../../types/articles'
import { IResponseError } from '../../types/error'
import { getConfigData, getErrorData } from '../../utils/misc'
import { RootState } from '../store'

export const getAllArticles = createAsyncThunk<
  Array<IArticle>,
  void,
  {
    pendingMeta: IResponseFilterMeta
    rejectValue: IResponseError
    fulfilledMeta: IAxiosArticleConfigMeta
  }
>(
  'articles/getAllArticles',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await Articles.all()
      return fulfillWithValue(response.data.articles, getConfigData(response))
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
  Array<IArticle>,
  void,
  {
    pendingMeta: IResponseFilterMeta
    rejectValue: IResponseError
    fulfilledMeta: IAxiosArticleConfigMeta
  }
>(
  'articles/getUserFeedArticles',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await Articles.feed()
      return fulfillWithValue(response.data.articles, getConfigData(response))
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
  Array<IArticle>,
  string,
  {
    pendingMeta: IResponseFilterMeta
    rejectValue: IResponseError
    fulfilledMeta: IAxiosArticleConfigMeta
  }
>(
  'articles/getProfileArticles',
  async (username, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await Articles.profile(username)
      return fulfillWithValue(response.data.articles, getConfigData(response))
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
  Array<IArticle>,
  string,
  {
    pendingMeta: IResponseFilterMeta
    rejectValue: IResponseError
    fulfilledMeta: IAxiosArticleConfigMeta
  }
>(
  'articles/getFavoritedArticles',
  async (username, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await Articles.favorited(username)
      return fulfillWithValue(response.data.articles, getConfigData(response))
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
  Array<IArticle>,
  string,
  {
    pendingMeta: IResponseFilterMeta
    rejectValue: IResponseError
    fulfilledMeta: IAxiosArticleConfigMeta
  }
>(
  'articles/getTaggedArticles',
  async (tag, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await Articles.tag(tag)
      return fulfillWithValue(response.data.articles, getConfigData(response))
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

const articlesAdapter = createEntityAdapter<IArticle>({
  selectId: state => state.slug,
})

const initialState = articlesAdapter.getInitialState<IArticlesState>({
  status: 'idle',
  error: null,
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
          // FIXME:
          articlesAdapter.setAll(state, action.payload)
        },
      )
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

export default articlesSlice.reducer
