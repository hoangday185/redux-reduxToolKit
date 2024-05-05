import { PayloadAction, nanoid, createSlice, current } from '@reduxjs/toolkit'
import { Post } from '../../types/blog.type'
import { initialPostList } from '../../constants/blog'

interface BlogState {
  postList: Post[]
  editingPost: null | Post
}

const initialState: BlogState = {
  postList: initialPostList,
  editingPost: null
}

// export const addPost = createAction('blog/addPost', function (post: Omit<Post, 'id'>) {
//   return {
//     payload: {
//       ...post,
//       id: nanoid()
//     }
//   }
// })

// export const deletePost = createAction<string>('blog/delete')

// export const startEditingPost = createAction<string>('/blog/startEditingPost')

// export const cancelEditingPost = createAction('blog/cancelEditingPost')

// export const finishedEditPost = createAction<Post>('blog/finishedEditPost')

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action: PayloadAction<Post>) => {
        const post = action.payload
        state.postList.push(post)
      },
      prepare: (post: Omit<Post, 'id'>) => ({
        payload: {
          ...post,
          id: nanoid()
        }
      })
    },
    deletePost: (state, action: PayloadAction<string>) => {
      const postId = action.payload
      const foundPostIndex = state.postList.findIndex((post) => post.id == postId)
      if (foundPostIndex != -1) state.postList.splice(foundPostIndex, 1)
    },
    startEditingPost: (state, action: PayloadAction<string>) => {
      const postId = action.payload
      const foundPost = state.postList.find((post) => post.id == postId)
      state.editingPost = foundPost ? foundPost : null
    },
    cancelEditingPost: (state) => {
      state.editingPost = null
    },
    finishedEditPost: (state, action: PayloadAction<Post>) => {
      const postId = action.payload.id
      state.postList.some((post, index) => {
        if (post.id == postId) {
          state.postList[index] = action.payload
          return true
        }
        return false
      })
      state.editingPost = null
    }
  },
  extraReducers(builder) {
    builder
      .addMatcher(
        (action) => action.type.includes('cancel'),
        (state) => {
          console.log(current(state))
        }
      )
      .addDefaultCase((state, action) => {
        console.log(`action type : ${action.type}`, current(state))
      })
  }
})

export const { addPost, startEditingPost, cancelEditingPost, finishedEditPost, deletePost } = blogSlice.actions
const blogReducer = blogSlice.reducer
export default blogReducer
