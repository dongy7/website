import Link from 'next/link'
import Router from 'next/router'
import Meta from '../components/Meta'
import Navbar from '../components/nav/Navbar'
import { LeftNav, RightNav } from '../components/nav/Navbar'
import NavLink from '../components/nav/Link'
import MainContainer from '../components/Container'
import ProjectContainer from '../components/ProjectContainer'

export default ({ children, project }) => {
  const Container = project ? ProjectContainer : MainContainer
  return (
    <div>
      <Navbar>
        <LeftNav>
          <Link prefetch href="/">
            <NavLink first>Home</NavLink>
          </Link>
          <Link prefetch href="/about">
            <NavLink>About</NavLink>
          </Link>
          <Link prefetch href="/projects">
            <NavLink>Projects</NavLink>
          </Link>
          <Link prefetch href="/posts">
            <NavLink>Posts</NavLink>
          </Link>
        </LeftNav>
        <RightNav>
          <Link>
            <NavLink href="https://github.com/dongy7/">
              <i className="fab fa-github fa-lg"></i>
            </NavLink>
          </Link>
          <Link>
            <NavLink href="https://www.linkedin.com/in/dongy7/">
              <i className="fab fa-linkedin fa-lg"></i>
            </NavLink>
          </Link>
          <Link>
            <NavLink href="mailto:dongy7@gmail.com">
              <i className="fas fa-envelope fa-lg"></i>
            </NavLink>
          </Link>
        </RightNav>
      </Navbar>
      <Container>
        {children}
        <Meta />
      </Container>
    </div>
  )
}
