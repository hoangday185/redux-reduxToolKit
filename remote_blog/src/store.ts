import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './pages/blog/blog.slice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: { blog: blogReducer }
})

//lấy RootState và app dispatch từ store của chúng ta
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
