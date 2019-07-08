import styled from 'styled-components'
import Page from './Main'
import Head from 'next/head'
import Title from '../components/post/Title'
import Meta from '../components/post/Meta'

const Article = styled.article`font-size: 14px;`

export default ({ title, date, children }) =>
  <Page>
    <Article>
      <Head>
        <title>{title}</title>
      </Head>
      <Title>{title}</Title>
      <Meta date={date} />
      {children}
    </Article>
  </Page>
