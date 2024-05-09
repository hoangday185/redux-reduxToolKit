import PostItem from '../PostItem'

import SkeletonPost from '../Skeleton'
import { Post } from '../../../types/blog.type'
import { useDeletePostMutation, useGetPostListQuery } from '../../blog/blog.service'
import { useDispatch } from 'react-redux'
import { startEditPost } from '../../blog/blog.slice'

const PostList = (): JSX.Element => {
  //isLoading chỉ dành cho lần fetch đầu tiên
  //isFetching là cho mỗi lần gọi api
  const { data, isFetching, isLoading } = useGetPostListQuery()
  const dispatch = useDispatch()
  const startEdit = (id: string) => {
    dispatch(startEditPost(id))
  }

  const [deletePostItem, deletePostItemResult] = useDeletePostMutation()
  const handleDeltePost = (id: string) => {
    deletePostItem(id)
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
            {isFetching && (
              <>
                <SkeletonPost />
                <SkeletonPost />
              </>
            )}
            {!isFetching &&
              (data as Post[]).map((post) => (
                <PostItem key={post.id} post={post} handleStartEditing={startEdit} handleDelete={handleDeltePost} />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostList
