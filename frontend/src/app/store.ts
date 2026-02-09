import { configureStore } from '@reduxjs/toolkit'
import userProfileReducer from '../store/userProfileSlice'
export const store = configureStore({
  reducer: {
    userSlice: userProfileReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch