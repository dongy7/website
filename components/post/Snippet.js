import styled from 'styled-components'
import { Code } from 'react-animated-term'
const Snippet = styled.pre`
  margin: 40px 0 40px 0;
  word-wrap: break-word;
`

export default ({ children }) =>
  <Snippet>
    <Code white>
      {children}
    </Code>
  </Snippet>
