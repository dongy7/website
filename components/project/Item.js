import styled from 'styled-components'

const Item = styled.li`
  width: calc(50% - 10px);
  margin: 10px 0px;
  @media (max-width: 700px) {
    width: 100%;
  }
`

export default Item
