import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
import postSlice from "./slices/postSlice";
import userSlice from "./slices/userSlice";



const persistConfig = {
    key: 'root',
    storage:sessionStorage
  }

const reducers=combineReducers({
    posts: postSlice,
    users: userSlice
  })

const persistedReducer = persistReducer(persistConfig, reducers)



export const store= configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
})