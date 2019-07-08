import Post from '../../layouts/Post'
import withMarkdownStyle from '../../layouts/withMarkdownStyle'
import CircuitPost from '../../markdown/2017/fun-with-circuits.md'

export default () => {
  const PostContent = withMarkdownStyle(CircuitPost)
  return (
    <Post
      title={'Fun with Circuits'}
      date={'January 7, 2017'}
    >
      <PostContent />
    </Post>
  )
}