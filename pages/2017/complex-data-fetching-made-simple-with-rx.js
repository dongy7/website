import Head from 'next/head'
import Post from '../../layouts/Post'
import RxPost from '../../markdown/2017/complex-data-fetching-made-simple-with-rx.md'
import withMarkdownStyle from '../../layouts/withMarkdownStyle'

export default () => {
  const PostContent = withMarkdownStyle(RxPost)
  return (
    <Post
      title={'Complex Data Fetching Made Simple With Rx'}
      date={'June 24, 2017'}
    >
      <PostContent />
    </Post>
  )
}
