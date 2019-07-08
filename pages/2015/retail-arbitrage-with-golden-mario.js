import Head from 'next/head'
import Post from '../../layouts/Post'
import RxPost from '../../markdown/2015/retail-arbitrage-with-golden-mario.md'
import withMarkdownStyle from '../../layouts/withMarkdownStyle'

export default () => {
  const PostContent = withMarkdownStyle(RxPost)
  return (
    <Post title={'Retail Arbitrage with Golden Mario'} date={'March 10, 2015'}>
      <PostContent />
    </Post>
  )
}
