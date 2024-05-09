import { startEditingPost } from './../../../../old_blog/src/pages/blog/blog.reducer'
import { PayloadAction, nanoid, createSlice, current, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit'
import { Post } from '../../types/blog.type'
import http from '../../utils/http'

interface BlogState {
  postId: string
}

const initialState: BlogState = {
  postId: ''
}

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    startEditPost: (state, action: PayloadAction<string>) => {
      state.postId = action.payload
    },
    cancelEditPost: (state) => {
      state.postId = ''
    }
  }
})

const blogReducer = blogSlice.reducer
export const { startEditPost, cancelEditPost } = blogSlice.actions
export default blogReducer
