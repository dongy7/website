import styled from 'styled-components'
import Head from 'next/head'
import Link from 'next/link'
import Page from '../layouts/Main'
import { posts } from '../posts'

export default () =>
  <Page>
    <Head>
      <title>Posts</title>
    </Head>
    <div className="posts">
      {posts.map(({ id, date, title }) =>
        <Post id={id} key={id} date={date} title={title} />
      )}
    </div>
  </Page>

const PostDiv = styled.div`
  margin-bottom: 10px;

  @media (max-width: 500px) {
    margin-bottom: 15px;
  }
`

const DateSpan = styled.span`
  display: inline-block;
  width: 140px;
  text-align: right;
  margin-right: 30px;
  color: #999;

  @media (max-width: 500px) {
    display: block;
    width: inherit;
    text-align: inherit;
    font-size: 11px;
    color: #ccc;
    margin-bottom: 5px;
  }
`

const A = styled.a`text-decoration: none;`

const Post = ({ id, date, title }) =>
  <PostDiv>
    <DateSpan>
      {date}
    </DateSpan>
    <Link prefetch href={`/${new Date(date).getFullYear()}/${id}`}>
      <a>
        {title}{' '}
      </a>
    </Link>
  </PostDiv>
