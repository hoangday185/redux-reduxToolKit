import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './old_blog/pages/blog/blog.reducer'

export const store = configureStore({
  reducer: { blog: blogReducer }
})

//lấy RootState và app dispatch từ store của chúng ta
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
