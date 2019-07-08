import styled from 'styled-components'

const Paragraph = styled.p`
  font-size: 14px;
  line-height: 24px;
  margin-bottom: 20px;
`

export default ({ children }) =>
  <Paragraph>
    {children}
  </Paragraph>
