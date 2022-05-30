import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit'
import { Profile } from '../../services/conduit'
import { IResError } from '../../types/error'
import { IProfileRes, IProfileState } from '../../types/profile'
import { getErrorConfig } from '../../utils/misc'
import { RootState } from '../store'

export const getProfile = createAsyncThunk<
  IProfileRes,
  string,
  { state: RootState; rejectValue: IResError }
>(
  'profile/getProfile',
  async (username: string, { getState, rejectWithValue }) => {
    const user = getState().user.user
    if (username === user?.username) {
      return {
        profile: {
          username: user.username,
          bio: user.bio,
          image: user.image,
          following: false,
        },
      }
    }

    try {
      const { data } = await Profile.get(username)
      return data
    } catch (error) {
      const resError = getErrorConfig(error)
      if (!resError) throw error
      throw rejectWithValue(resError)
    }
  },
)

export const followProfile = createAsyncThunk<
  IProfileRes,
  string,
  { state: RootState; rejectValue: IResError }
>('profile/followProfile', async (username: string, { rejectWithValue }) => {
  try {
    const { data } = await Profile.follow(username)
    return data
  } catch (error) {
    const resError = getErrorConfig(error)
    if (!resError) throw error
    throw rejectWithValue(resError)
  }
})

export const unfollowProfile = createAsyncThunk<
  IProfileRes,
  string,
  { state: RootState; rejectValue: IResError }
>(
  'unprofile/unfollowProfile',
  async (username: string, { rejectWithValue }) => {
    try {
      const { data } = await Profile.unfollow(username)
      return data
    } catch (error) {
      const resError = getErrorConfig(error)
      if (!resError) throw error
      throw rejectWithValue(resError)
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
      .addMatcher(isPending(getProfile), state => {
        state.status = 'loading'
      })
      .addMatcher(
        isRejected(getProfile, followProfile, unfollowProfile),
        (state, action) => {
          state.status = 'failed'
          state.error = action.payload ?? null
        },
      )
      .addMatcher(
        isFulfilled(getProfile, followProfile, unfollowProfile),
        (state, action) => {
          state.status = 'successed'
          state.error = null
          state.profile = action.payload.profile
        },
      )
  },
})

export default profileScile.reducer

export const selectProfile = (state: RootState) => state.profile.profile
export const selectProfileStatus = (state: RootState) => state.profile.status
export const selectProfileError = (state: RootState) => state.profile.error
