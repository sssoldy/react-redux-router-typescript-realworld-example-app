import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit'
import { Auth } from '../../services/conduit'
import { IGenericResError } from '../../types/error'
import {
  ILoginReq,
  IRegisterUserReq,
  IUpdateUser,
  IUser,
  IUserRes,
} from '../../types/user'
import { RootState } from '../store'

export const loginUser = createAsyncThunk<
  IUserRes,
  ILoginReq,
  { rejectValue: IGenericResError; rejectedMeta: IGenericResError }
>('user/loginUser', async (loginData, { rejectWithValue }) => {
  try {
    const { data } = await Auth.login(loginData)
    return data
  } catch (error: any) {
    if (!error.response) throw error
    return rejectWithValue(error.response.data, error.response.data)
  }
})

export const registerUser = createAsyncThunk<
  IUserRes,
  IRegisterUserReq,
  { rejectValue: IGenericResError; rejectedMeta: IGenericResError }
>('user/registerUser', async (registerData, { rejectWithValue }) => {
  try {
    const { data } = await Auth.register(registerData)
    return data
  } catch (error: any) {
    if (!error.response) throw error
    return rejectWithValue(error.response.data, error.response.data)
  }
})

export const getCurrentUser = createAsyncThunk<
  IUserRes,
  void,
  { rejectValue: IGenericResError; rejectedMeta: IGenericResError }
>('user/getCurrentUser', async (_, { rejectWithValue }) => {
  try {
    const { data } = await Auth.current()
    return data
  } catch (error: any) {
    if (!error.response) throw error
    return rejectWithValue(error.response.data, error.response.data)
  }
})

// TODO: Rewrite to handle IGenericResError
// TODO: Add ErrorBoundary
export const updateUser = createAsyncThunk<
  IUserRes,
  IUpdateUser,
  { rejectValue: string; rejectedMeta: { error: string } }
>('user/updateUser', async (updateData, { rejectWithValue }) => {
  try {
    const { data } = await Auth.update({ user: updateData })
    return data
  } catch (error: any) {
    if (!error.response) throw error
    return rejectWithValue(error.response.data, { error: error.response.data })
  }
})

type resStatus = 'idle' | 'loading' | 'failed' | 'successed'

interface IUserState {
  user: IUser | null
  status: resStatus
  errors: IGenericResError | null
  updateStatus: resStatus
  updateError: string | null
}

const initialState: IUserState = {
  user: null,
  status: 'idle',
  errors: null,
  updateStatus: 'idle',
  updateError: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggedOut: () => {
      localStorage.removeItem('jwt')
      return initialState
    },
    resetUpdateStatus: state => {
      state.updateStatus = 'idle'
    },
  },
  extraReducers: builder => {
    builder
      .addCase(updateUser.pending, (state, action) => {
        state.updateStatus = 'loading'
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateStatus = 'failed'
        state.updateError = action.payload ?? null
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateStatus = 'successed'
        state.updateError = null
        localStorage.setItem('jwt', action.payload.user.token)
        state.user = action.payload.user
      })
      .addMatcher(isPending(loginUser, registerUser, getCurrentUser), state => {
        state.status = 'loading'
      })
      .addMatcher(
        isRejected(loginUser, registerUser, getCurrentUser),
        (state, action) => {
          state.status = 'failed'
          state.errors = action.payload ?? null
        },
      )
      .addMatcher(
        isFulfilled(loginUser, registerUser, getCurrentUser),
        (state, action) => {
          state.status = 'successed'
          state.errors = null
          localStorage.setItem('jwt', action.payload.user.token)
          state.user = action.payload.user
        },
      )
  },
})

export const { loggedOut, resetUpdateStatus } = userSlice.actions

export const selectUser = (state: RootState) => state.user.user
export const selectUserToken = (state: RootState) => state.user.user?.token
export const selectUserStatus = (state: RootState) => state.user.status
export const selectUserErrors = (state: RootState) => state.user.errors
export const selectUserUpdateStatus = (state: RootState) =>
  state.user.updateStatus
export const selectUserUpdateError = (state: RootState) =>
  state.user.updateError

export default userSlice.reducer
