import styled from 'styled-components'
import Link from 'next/link'
import Head from 'next/head'
import Page from '../layouts/Main'
import Avatar from '../components/main/Avatar'
import 'react-animated-term/dist/react-animated-term.css'

const Home = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: -1;
`

const Main = styled.div`
  flex: none;
  text-align: center;
`

const H1 = styled.h1`
  font-size: 2em;
  font-weight: normal;
`

const Nav = styled.nav`margin-top: 20px;`

const A = styled.a`
  display: inline-block;
  margin: 0 15px;
  text-decoration: none;
`

const AvDiv = styled.div`
  margin-top: 20px;
`

export default () =>
  <Page>
    <Head>
      <title>Dong Yeop Lee</title>
    </Head>
    <Home>
      <Main>
        <H1>Dong Yeop Lee</H1>
        <AvDiv>
          <Avatar
            width={100}
            height={100}
            url="static/avatar.jpg"
          />
        </AvDiv>
        <Nav>
          <Link prefetch href="/projects">
            <A>Projects</A>
          </Link>
          <Link prefetch href="/posts">
            <A>Posts</A>
          </Link>
          <A href="mailto:dong@dongyeop.com">Email</A>
        </Nav>
      </Main>
    </Home>
  </Page>
