import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit'
import { Comments } from '../../services/conduit'
import { IComment, ICommentsState, INewCommentReq } from '../../types/comments'
import { IResError } from '../../types/error'
import { getErrorConfig } from '../../utils/misc'
import { RootState } from '../store'

export const getAllComments = createAsyncThunk(
  'comments/getAllComments',
  async (slug: string, { rejectWithValue }) => {
    try {
      const { data } = await Comments.all(slug)
      return data.comments
    } catch (error) {
      const resError = getErrorConfig(error)
      if (!resError) throw error
      throw rejectWithValue(resError)
    }
  },
)

export const addNewComment = createAsyncThunk(
  'comment/addNewComment',
  async (commentData: INewCommentReq, { rejectWithValue }) => {
    try {
      const { data } = await Comments.add(commentData)
      return data.comment
    } catch (error) {
      const resError = getErrorConfig(error)
      if (!resError) throw error
      throw rejectWithValue(resError)
    }
  },
)

export const deleteComment = createAsyncThunk(
  'article/deleteComment',
  async ({ slug, id }: { slug: string; id: number }, { rejectWithValue }) => {
    try {
      const { data } = await Comments.delete(slug, id)
      return data
    } catch (error) {
      const resError = getErrorConfig(error)
      if (!resError) throw error
      throw rejectWithValue(resError)
    }
  },
)

const commentsAdapter = createEntityAdapter<IComment>({
  selectId: state => state.id,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
})

const initialState = commentsAdapter.getInitialState<ICommentsState>({
  status: 'idle',
  error: null,
})

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(isPending(getAllComments), state => {
        state.status = 'loading'
      })
      .addMatcher(
        isRejected(getAllComments, addNewComment, deleteComment),
        (state, action) => {
          state.status = 'failed'
          state.error = (action.payload as IResError) ?? null
        },
      )
      .addMatcher(isFulfilled(getAllComments), (state, action) => {
        state.status = 'successed'
        state.error = null
        commentsAdapter.setAll(state, action.payload)
      })
      .addMatcher(isFulfilled(addNewComment), (state, action) => {
        state.status = 'successed'
        state.error = null
        commentsAdapter.upsertOne(state, action.payload)
      })
      .addMatcher(isFulfilled(deleteComment), (state, action) => {
        state.status = 'successed'
        state.error = null
        commentsAdapter.removeOne(state, action.meta.arg.id)
      })
  },
})

export const {
  selectAll: selectAllComments,
  selectById: selectCommentById,
  selectIds: selectCommentsIds,
} = commentsAdapter.getSelectors((state: RootState) => state.comments)

export const selectCommentsStatus = (state: RootState) => state.comments.status
export const selectCommentsError = (state: RootState) => state.comments.error

export default commentsSlice.reducer
