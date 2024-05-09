import CreatePost from '../components/CreatePost'
import PostList from '../components/PostList'

const Blog = (): JSX.Element => {
  return (
    <div className='p-5'>
      <CreatePost />
      <PostList />
    </div>
  )
}
export default Blog
