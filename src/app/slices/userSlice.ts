import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit'
import { Auth } from '../../services/conduit'
import { IResError } from '../../types/error'
import {
  ILoginReq,
  IRegisterUserReq,
  IUpdateUser,
  IUserRes,
  IUserState,
} from '../../types/user'
import { getErrorConfig } from '../../utils/misc'
import { RootState } from '../store'

export const loginUser = createAsyncThunk<
  IUserRes,
  ILoginReq,
  { rejectValue: IResError; rejectedMeta: IResError }
>('user/loginUser', async (loginData, { rejectWithValue }) => {
  try {
    const { data } = await Auth.login(loginData)
    return data
  } catch (error: any) {
    const resError = getErrorConfig(error)
    if (!resError) throw error
    throw rejectWithValue(resError, resError)
  }
})

export const registerUser = createAsyncThunk<
  IUserRes,
  IRegisterUserReq,
  { rejectValue: IResError; rejectedMeta: IResError }
>('user/registerUser', async (registerData, { rejectWithValue }) => {
  try {
    const { data } = await Auth.register(registerData)
    return data
  } catch (error: any) {
    const resError = getErrorConfig(error)
    if (!resError) throw error
    throw rejectWithValue(resError, resError)
  }
})

export const getCurrentUser = createAsyncThunk<
  IUserRes,
  string,
  { rejectValue: IResError; rejectedMeta: IResError }
>('user/getCurrentUser', async (token, { rejectWithValue }) => {
  try {
    const { data } = await Auth.current(token)
    return data
  } catch (error: any) {
    const resError = getErrorConfig(error)
    if (!resError) throw error
    throw rejectWithValue(resError, resError)
  }
})

export const updateUser = createAsyncThunk<
  IUserRes,
  IUpdateUser,
  { rejectValue: IResError; rejectedMeta: IResError }
>('user/updateUser', async (updateData, { rejectWithValue }) => {
  try {
    const { data } = await Auth.update({ user: updateData })
    return data
  } catch (error: any) {
    const resError = getErrorConfig(error)
    if (!resError) throw error
    throw rejectWithValue(resError, resError)
  }
})

const initialState: IUserState = {
  user: null,
  initStatus: 'idle',
  currentStatus: 'idle',
  initError: null,
  currentError: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggedOut: () => {
      localStorage.removeItem('jwt')
      return initialState
    },
    resetUserCurrentStatus: state => {
      state.currentStatus = 'idle'
    },
    resetUserCurrentError: state => {
      state.currentError = null
    },
    resetUserInitError: state => {
      state.initError = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCurrentUser.pending, state => {
        state.initStatus = 'loading'
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.initStatus = 'failed'
        state.initError = action.payload ?? null
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.initStatus = 'successed'
        state.initError = null
        localStorage.setItem('jwt', action.payload.user.token)
        state.user = action.payload.user
      })
      .addMatcher(isPending(loginUser, registerUser, updateUser), state => {
        state.currentStatus = 'loading'
      })
      .addMatcher(
        isRejected(loginUser, registerUser, updateUser),
        (state, action) => {
          state.currentStatus = 'failed'
          state.currentError = action.payload ?? null
        },
      )
      .addMatcher(
        isFulfilled(loginUser, registerUser, updateUser),
        (state, action) => {
          state.currentStatus = 'successed'
          state.currentError = null
          localStorage.setItem('jwt', action.payload.user.token)
          state.user = action.payload.user
        },
      )
  },
})

export const {
  loggedOut,
  resetUserCurrentStatus,
  resetUserInitError,
  resetUserCurrentError,
} = userSlice.actions

export const selectUser = (state: RootState) => state.user.user
export const selectUserToken = (state: RootState) => state.user.user?.token

export const selectUserInitError = (state: RootState) => state.user.initError
export const selectUserUpdateError = (state: RootState) =>
  state.user.currentError

export const selectUserInitStatus = (state: RootState) => state.user.initStatus
export const selectUserUpdateStatus = (state: RootState) =>
  state.user.currentStatus

export default userSlice.reducer
