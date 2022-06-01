import { createAsyncThunk, createSlice, isFulfilled } from '@reduxjs/toolkit'
import { Profile } from '../../services/conduit'
import { IResError } from '../../types/error'
import { IProfile, IProfileState } from '../../types/profile'
import { IUser } from '../../types/user'
import { getErrorData } from '../../utils/misc'
import { RootState } from '../store'
import { authorUpdated } from './articleSlice'
import { selectArticleByUsername } from './articlesSlice'

export const getProfile = createAsyncThunk<
  IProfile,
  string,
  { state: RootState; rejectValue: IResError }
>(
  'profile/getProfile',
  async (username: string, { getState, rejectWithValue }) => {
    let user: IUser | IProfile | null = getState().user.user

    if (!user || username !== user?.username) {
      user = selectArticleByUsername(getState(), username)?.author ?? null
    }

    if (username === user?.username) {
      const { username, bio, image } = user
      const following = 'following' in user ? user.following : false
      return { username, bio, image, following }
    }

    try {
      const { data } = await Profile.get(username)
      return data.profile
    } catch (error: any) {
      throw error.response ? rejectWithValue(getErrorData(error)) : error
    }
  },
)

export const followProfile = createAsyncThunk<
  IProfile,
  string,
  { state: RootState; rejectValue: IResError }
>(
  'profile/followProfile',
  async (username: string, { getState, dispatch, rejectWithValue }) => {
    try {
      const { data } = await Profile.follow(username)
      const article = getState().article.article
      if (article) {
        dispatch(authorUpdated(data.profile))
      }
      return data.profile
    } catch (error: any) {
      throw error.response ? rejectWithValue(getErrorData(error)) : error
    }
  },
)

export const unfollowProfile = createAsyncThunk<
  IProfile,
  string,
  { state: RootState; rejectValue: IResError }
>(
  'profile/unfollowProfile',
  async (username: string, { getState, dispatch, rejectWithValue }) => {
    try {
      const { data } = await Profile.unfollow(username)
      const article = getState().article.article
      if (article) {
        dispatch(authorUpdated(data.profile))
      }
      return data.profile
    } catch (error: any) {
      throw error.response ? rejectWithValue(getErrorData(error)) : error
    }
  },
)

const initialState: IProfileState = {
  profile: null,
  status: 'idle',
  error: null,
}

const profileScile = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProfile.pending, state => {
        state.status = 'loading'
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? null
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.status = 'successed'
        state.error = null
        state.profile = action.payload
      })
      .addMatcher(
        isFulfilled(followProfile, unfollowProfile),
        (state, action) => {
          state.profile = action.payload
        },
      )
  },
})

export const selectProfile = (state: RootState) => state.profile.profile
export const selectProfileStatus = (state: RootState) => state.profile.status
export const selectProfileError = (state: RootState) => state.profile.error

export default profileScile.reducer
