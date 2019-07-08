import Head from 'next/head'
import Page from '../layouts/Post'
import Title from '../components/post/Title'
import P from '../components/post/Paragraph'
import Link from '../components/post/Link'
import withMarkdownStyle from '../layouts/withMarkdownStyle'
import About from '../markdown/about.md'

export default () => {
  const Content = withMarkdownStyle(About)
  return (
    <Page>
      <Head>
        <title>About</title>
      </Head>
      <div className="about">
        <Title>About Me</Title>
        <Content />
      </div>
    </Page>
  )
}