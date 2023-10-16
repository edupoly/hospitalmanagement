import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {hospApi}  from '../services/hospApi.js'
import userreducer from './userslice.js'
export const store = configureStore({
  reducer: {

    [hospApi.reducerPath]: hospApi.reducer,
    u:userreducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hospApi.middleware),
})

setupListeners(store.dispatch)