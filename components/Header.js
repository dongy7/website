import styled from 'styled-components'

const H1 = styled.h1`
  font-weight: 200;
  font-size: 32px;
`

export default ({ title }) =>
  <div>
    <H1>
      {title}
    </H1>
  </div>
