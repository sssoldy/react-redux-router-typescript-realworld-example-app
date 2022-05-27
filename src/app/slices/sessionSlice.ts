import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface ISessionState {
  token: string | null
}

const initialState: ISessionState = {
  token: null,
}

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    tokenAdded: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    tokenRemoved: state => {
      state.token = null
    },
  },
})

export const { tokenAdded, tokenRemoved } = sessionSlice.actions

export const selectSessionToken = (state: RootState) => state.session.token

export default sessionSlice.reducer
