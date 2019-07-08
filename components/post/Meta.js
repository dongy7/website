import styled from 'styled-components'

const Meta = styled.div`
  margin-bottom: 20px;
  color: #777;
`

export default ({ date }) =>
  <Meta>
    {date}
  </Meta>
