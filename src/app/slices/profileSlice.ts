import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Profile } from '../../services/conduit'
import { IResError } from '../../types/error'
import { IProfileRes, IProfileState } from '../../types/profile'
import { getErrorConfig } from '../../utils/misc'
import { RootState } from '../store'

export const getProfile = createAsyncThunk<
  IProfileRes,
  string,
  { rejectValue: IResError; rejectedMeta: IResError }
>('profile/getProfile', async (username: string, { rejectWithValue }) => {
  try {
    const { data } = await Profile.get(username)
    return data
  } catch (error) {
    const resError = getErrorConfig(error)
    if (!resError) throw error
    throw rejectWithValue(resError, resError)
  }
})

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
    builder.addCase(getProfile.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(getProfile.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload ?? null
    })
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.status = 'successed'
      state.error = null
      state.profile = action.payload.profile
    })
  },
})

export default profileScile.reducer

export const selectProfile = (state: RootState) => state.profile.profile
export const selectProfileStatus = (state: RootState) => state.profile.status
export const selectProfileError = (state: RootState) => state.profile.error
