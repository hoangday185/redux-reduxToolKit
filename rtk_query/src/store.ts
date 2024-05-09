import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './pages/blog/blog.slice'
import { useDispatch } from 'react-redux'
import blogApi from './pages/blog/blog.service'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: { blog: blogReducer, [blogApi.reducerPath]: blogApi.reducer }, //thêm reducer được tạo từ api slice
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware)
})

//option nhưng bắt buộc nếu dùng tính năng reFetchOnFocus/reFetchOnReConnect
setupListeners(store.dispatch)

//lấy RootState và app dispatch từ store của chúng ta
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
