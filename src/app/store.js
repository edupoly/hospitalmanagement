import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {hospApi}  from '../services/hospApi.js'
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
    [hospApi.reducerPath]: hospApi.reducer,
    u:userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hospApi.middleware),
})

setupListeners(store.dispatch)