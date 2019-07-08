import Post from '../../layouts/Post'
import withMarkdownStyle from '../../layouts/withMarkdownStyle'
import MdxPost from '../../markdown/2018/integrating-markdown-in-react-with-mdx.md'

export default () => {
  const PostContent = withMarkdownStyle(MdxPost)
  return (
    <Post
      title={'Integrating Markdown in React with MDX'}
      date={'May 4, 2018'}
    >
      <PostContent />
    </Post>
  )
}