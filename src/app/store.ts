import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import { persistConfig } from './persistConfig'
import authReducer from '../features/auth/authSlice'

const rootReducer = combineReducers({
  auth: authReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) => getDefault({ serializableCheck: false }),
})

export const persistor = persistStore(store)

// Inferred types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
