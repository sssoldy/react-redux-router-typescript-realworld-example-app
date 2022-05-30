import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import profileReducer from './slices/profileSlice'
import articlesReducer from './slices/articlesSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    articles: articlesReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
