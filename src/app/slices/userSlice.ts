import { createAsyncThunk, createSlice, isFulfilled } from '@reduxjs/toolkit'
import { Auth } from '../../services/conduit'
import {
  ILoginReq,
  IRegisterUserReq,
  IUpdateUser,
  IUserState,
} from '../../types/user'
import { getErrorData } from '../../utils/misc'
import { RootState } from '../store'

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (loginData: ILoginReq, { rejectWithValue }) => {
    try {
      const { data } = await Auth.login(loginData)
      return data
    } catch (error: any) {
      throw error.response ? rejectWithValue(getErrorData(error)) : error
    }
  },
)

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (registerData: IRegisterUserReq, { rejectWithValue }) => {
    try {
      const { data } = await Auth.register(registerData)
      return data
    } catch (error: any) {
      throw error.response ? rejectWithValue(getErrorData(error)) : error
    }
  },
)

export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async (token: string, { rejectWithValue }) => {
    try {
      const { data } = await Auth.current(token)
      return data
    } catch (error: any) {
      throw error.response ? rejectWithValue(getErrorData(error)) : error
    }
  },
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (updateData: IUpdateUser, { rejectWithValue }) => {
    try {
      const { data } = await Auth.update({ user: updateData })
      return data
    } catch (error: any) {
      throw error.response ? rejectWithValue(getErrorData(error)) : error
    }
  },
)

const initialState: IUserState = {
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggedOut: () => {
      localStorage.removeItem('jwt')
      return initialState
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      isFulfilled(getCurrentUser, loginUser, registerUser, updateUser),
      (state, action) => {
        localStorage.setItem('jwt', action.payload.user.token)
        state.user = action.payload.user
      },
    )
  },
})

export const { loggedOut } = userSlice.actions

export const selectUser = (state: RootState) => state.user.user
export const selectUsername = (state: RootState) => state.user.user?.username
export const selectUserToken = (state: RootState) => state.user.user?.token

export default userSlice.reducer
