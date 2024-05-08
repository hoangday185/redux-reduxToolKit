import { useDispatch, useSelector } from 'react-redux'
import PostItem from '../PostItem'

import { deletePost, getPostList, startEditingPost } from '../../blog/blog.slice'
import { RootState, useAppDispatch } from '../../../store'

import { useEffect } from 'react'
import SkeletonPost from '../Skeleton'

//goi api trong useEffect
//nếu gọi thành công thì dispatch action type : "blog/getPostListSuccess"
//nếu gọi thất bại thì dispatch action type : "blog/getPostListFailed"

//dispatch action type "blog/getPostList"REDUCER CHỈ ĐƯỢC DÙNG ĐỒNG BỘ
const PostList = (): JSX.Element => {
  const postList = useSelector((state: RootState) => state.blog.postList)
  const loading = useSelector((state: RootState) => state.blog.loading)
  const dispatch = useAppDispatch()

  // useEffect(() => {
  //   const controller = new AbortController()
  //   http
  //     .get('posts', {
  //       signal: controller.signal
  //     })
  //     .then((res) => {
  //       const postsListResult = res.data
  //       dispatch({ type: 'blog/getPostListSuccess', payload: postsListResult })
  //     })
  //     .catch((error) => {
  //       if (error.code != 'ERR_CANCELED') {
  //         dispatch({ type: 'blog/getPostListFailed', payload: error })
  //       }
  //     })
  //   return () => {
  //     controller.abort() //hủy call api lần 2
  //   }
  // }, []) cách này làm lâu vl :) dùng createAsyncThunk

  useEffect(() => {
    const promise = dispatch(getPostList())
    return () => {
      promise.abort()
    }
  }, [])

  const handleDelete = (postId: string) => {
    dispatch(deletePost(postId))
  }

  const handleStartEditing = (postId: string) => {
    dispatch(startEditingPost(postId))
  }

  return (
    <div>
      <div className='bg-white py-6 sm:py-8 lg:py-12'>
        <div className='mx-auto max-w-screen-xl px-4 md:px-8'>
          <div className='mb-10 md:mb-16'>
            <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>Blog</h2>
            <p className='mx-auto max-w-screen-md text-center text-gray-500 md:text-lg'>
              Đừng bao giờ từ bỏ. Hôm nay khó khăn, ngày mai sẽ trở nên tồi tệ. Nhưng ngày mốt sẽ có nắng
            </p>
          </div>
          <div className='grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8'>
            {loading && (
              <>
                <SkeletonPost />
                <SkeletonPost />
              </>
            )}
            {!loading &&
              postList.map((post) => (
                <PostItem
                  key={post.id}
                  post={post}
                  handleDelete={handleDelete}
                  handleStartEditing={handleStartEditing}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostList
