import { injectGlobal } from 'styled-components'
import Head from 'next/head'
import NProgress from 'nprogress'
import Router from 'next/router'
import * as gtag from '../lib/gtag'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = url => {
  NProgress.done()
  gtag.pageview(url)
}
Router.onRouteChangeError = () => NProgress.done()

injectGlobal`
  * {
    margin: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  a {
    color: #3369e7;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    cursor: pointer;
    text-decoration: none;
  }

  /* loading progress bar styles */
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: #3369e7;
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
  }

  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px #3369e7, 0 0 5px #3369e7;
    opacity: 1.0;
    transform: rotate(3deg) translate(0px, -4px);
  }

  ::selection {
    background: #33A9FF;
    color: white;
  }
`

export default () =>
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        href="/atom"
        type="application/atom+xml"
        rel="alternate"
        title="Dong Yeop Lee"
      />
    </Head>
  </div>
