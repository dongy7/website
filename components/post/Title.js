import styled from 'styled-components'

const A = styled.a`
  color: #000;
  text-decoration: none;
  &: hover {
    background-color: #000;
    color: #fff;
  }
`

const H1 = styled.h1`
  font-weight: 500;
  margin-bottom: 10px;
`

export default ({ children }) =>
  <H1>
    <A href="#">
      {children}
    </A>
  </H1>
