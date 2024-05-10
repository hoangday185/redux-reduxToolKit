import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from '../../types/blog.type'
import { CustomError } from '../../utils/helper'

const blogApi = createApi({
  reducerPath: 'blogApi',
  tagTypes: ['Posts'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
  endpoints: (builder) => ({
    getPostList: builder.query<Post[], void>({
      query: () => `posts`, //method ko có argument
      providesTags(result) {
        //map với những invalidTags để call lại api getPostList lại
        if (result) {
          const final = [
            ...result.map(({ id }) => ({ type: 'Posts' as const, id })),
            { type: 'Posts' as const, id: 'LIST' }
          ]
          return final
        }
        const final = [{ type: 'Posts' as const, id: 'LIST' }]
        return final
        //return [{ type: 'Posts' as const, id: 'LIST' }]
      }
    }),
    addPost: builder.mutation<Post, Omit<Post, 'id'>>({
      query(body) {
        try {
          // let a: any = null
          // a.b = 1
          return {
            url: 'posts',
            method: 'POST',
            body
          }
        } catch (error: any) {
          throw new CustomError(error.message)
        }
      },
      /**
       * invalidateTas cung cấp các tag để báo hiệu cho những method nào có providesTags match
       * với nó sẽ bị gọi lại
       * Trong trường hợp này getPosts sẽ chạy lại
       */
      invalidatesTags: (result, error, body) =>
        error ? [] : [{ type: 'Posts', id: 'LIST' }]
    }),
    getPost: builder.query<Post, string>({
      query: (id) => `posts/${id}`
    }),
    updatePost: builder.mutation<Post, { id: string; body: Post }>({
      query(data) {
        //throw Error('ahihi') //lỗi nhảy vào serialize Error type lỗi do người code
        return {
          url: `posts/${data.id}`,
          method: 'PUT',
          body: data.body
        }
      },
      //trong trường hợp này nó sẽ làm cho getPost chạy lại
      invalidatesTags: (result, error, data) =>
        error ? [] : [{ type: 'Posts', id: data.id }]
    }),
    deletePost: builder.mutation<{}, string>({
      query(id) {
        return {
          url: `posts/${id}`,
          method: 'DELETE'
        }
      },
      //trong trường hợp này nó sẽ làm cho getPost chạy lại
      invalidatesTags: (result, error, id) =>
        error ? [] : [{ type: 'Posts', id }]
    })
  })
})

export const {
  useGetPostListQuery,
  useAddPostMutation,
  useGetPostQuery,
  useUpdatePostMutation,
  useDeletePostMutation
} = blogApi
export default blogApi
