import styled from 'styled-components'

const Link = styled.a.attrs({
  target: '_blank',
})``

export default ({ href, children }) =>
  <Link href={href}>
    {children}
  </Link>
