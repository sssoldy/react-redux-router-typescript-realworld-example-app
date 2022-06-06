import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import { Comments } from '../../services/conduit'
import {
  IComment,
  ICommentsState,
  IDelCommentReq,
  INewCommentReq,
} from '../../types/comments'
import { IResponseError } from '../../types/error'
import { getErrorData } from '../../utils/misc'
import { RootState } from '../store'

export const getComments = createAsyncThunk(
  'comments/getComments',
  async (postSlug: string, { rejectWithValue }) => {
    try {
      const { data } = await Comments.all(postSlug)
      return data.comments
    } catch (error: any) {
      throw error.response ? rejectWithValue(getErrorData(error)) : error
    }
  },
)

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (newCommentData: INewCommentReq, { rejectWithValue }) => {
    try {
      const { data } = await Comments.add(newCommentData)
      return data.comment
    } catch (error: any) {
      throw error.response ? rejectWithValue(getErrorData(error)) : error
    }
  },
)

export const deleteComment = createAsyncThunk(
  'article/deleteComment',
  async (deleteReqData: IDelCommentReq, { rejectWithValue }) => {
    try {
      const { data } = await Comments.delete(deleteReqData)
      return data
    } catch (error: any) {
      throw error.response ? rejectWithValue(getErrorData(error)) : error
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
      .addCase(getComments.pending, state => {
        state.status = 'loading'
      })
      .addCase(getComments.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as IResponseError
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.status = 'successed'
        state.error = null
        commentsAdapter.setAll(state, action.payload)
      })
      .addCase(addComment.fulfilled, (state, action) => {
        commentsAdapter.upsertOne(state, action.payload)
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
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
