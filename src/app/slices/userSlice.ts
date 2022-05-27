import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit'
import { Auth } from '../../services/conduit'
import { IGenericResError } from '../../types/error'
import { ILoginReq, IRegisterUserReq, IUser, IUserRes } from '../../types/user'
import { RootState } from '../store'

export const loginUser = createAsyncThunk<
  IUserRes,
  ILoginReq,
  { rejectValue: IGenericResError; rejectedMeta: IGenericResError }
>('user/loginUser', async (loginData: ILoginReq, { rejectWithValue }) => {
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
>(
  'user/registerUser',
  async (registerData: IRegisterUserReq, { rejectWithValue }) => {
    try {
      const { data } = await Auth.register(registerData)
      return data
    } catch (error: any) {
      if (!error.response) throw error
      return rejectWithValue(error.response.data, error.response.data)
    }
  },
)

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

type resStatus = 'idle' | 'loading' | 'failed' | 'successed'

interface IUserState {
  user: IUser | null
  status: resStatus
  errors: IGenericResError | null
}

const initialState: IUserState = {
  user: null,
  status: 'idle',
  errors: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
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
          localStorage.setItem('jwt', action.payload.user.token)
          state.errors = null
          state.user = action.payload.user
        },
      )
  },
})

export const selectUser = (state: RootState) => state.user.user
export const selectUserToken = (state: RootState) => state.user.user?.token
export const selectUserStatus = (state: RootState) => state.user.status
export const selectUserErrors = (state: RootState) => state.user.errors

export default userSlice.reducer
