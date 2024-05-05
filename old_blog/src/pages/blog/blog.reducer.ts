import { PayloadAction, createAction, createReducer, current, nanoid } from '@reduxjs/toolkit'
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

export const addPost = createAction('blog/addPost', function (post: Omit<Post, 'id'>) {
  return {
    payload: {
      ...post,
      id: nanoid()
    }
  }
})

export const deletePost = createAction<string>('blog/delete')

export const startEditingPost = createAction<string>('/blog/startEditingPost')

export const cancelEditingPost = createAction('blog/cancelEditingPost')

export const finishedEditPost = createAction<Post>('blog/finishedEditPost')

const blogReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addPost, (state, action) => {
      //immerjs giúp chúng ta mutate một state an toàn
      //không hản là mutate mà của cơ chế là giúp chúng ta tạo ra 1 giá trị nháp và mutate trên đó
      const { payload } = action
      state.postList.push(payload)
    })
    .addCase(deletePost, (state, action) => {
      const postId = action.payload
      const foundPostIndex = state.postList.findIndex((post) => post.id == postId)
      if (foundPostIndex != -1) state.postList.splice(foundPostIndex, 1)
    })
    .addCase(startEditingPost, (state, action) => {
      const postId = action.payload
      const foundPost = state.postList.find((post) => post.id == postId)
      state.editingPost = foundPost ? foundPost : null
    })
    .addCase(cancelEditingPost, (state) => {
      state.editingPost = null
    })
    .addCase(finishedEditPost, (state, action) => {
      const postId = action.payload.id
      state.postList.some((post, index) => {
        if (post.id == postId) {
          state.postList[index] = action.payload
          return true
        }
        return false
      })
      state.editingPost = null
    })
    .addMatcher(
      (action) => action.type.includes('cancel'),
      (state, action) => {
        console.log(state) //log ra proxy đang thao tác trên wrap state(state nháp)
        console.log(current(state))
      }
    )
})

//dùng map object cái này không hợp với ts, map object ổn với js nha
//redux kêu hãy xài builder callback đi =)))

// const blogReducer = createReducer(
//   initialState,
//   {
//     [addPost.type]: (state, action: PayloadAction<Post>) => {
//       //immerjs giúp chúng ta mutate một state an toàn
//       //không hản là mutate mà của cơ chế là giúp chúng ta tạo ra 1 giá trị nháp và mutate trên đó
//       const { payload } = action
//       state.postList.push(payload)
//     },
//     [deletePost.type]: (state, action: PayloadAction<string>) => {
//       const postId = action.payload
//       const foundPostIndex = state.postList.findIndex((post) => post.id == postId)
//       if (foundPostIndex != -1) state.postList.splice(foundPostIndex, 1)
//     },
//     [startEditingPost.type]: (state, action) => {
//       const postId = action.payload
//       const foundPost = state.postList.find((post) => post.id == postId)
//       state.editingPost = foundPost ? foundPost : null
//     },
//     [cancelEditingPost.type]: (state) => {
//       state.editingPost = null
//     },
//     [finishedEditPost.type]: (state, action) => {
//       const postId = action.payload.id
//       state.postList.some((post, index) => {
//         if (post.id == postId) {
//           state.postList[index] = action.payload
//           return true
//         }
//         return false
//       })
//       state.editingPost = null
//     }
//   },
//   [
//     {
//       matcher: (action) => action.type.includes('cancel') as any,
//       reducer(state, action) {
//         console.log(state) //log ra proxy đang thao tác trên wrap state(state nháp)
//         console.log(current(state))
//       }
//     }
//   ],
//  [
//   (state) =>{
//     console.log(state)
//   }
//  ]
// )

export default blogReducer
