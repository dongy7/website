import Terminal from 'react-animated-term'
import styled from 'styled-components'

const StyledTerminal = styled.div`margin: 40px 0 40px 0;`

export default props =>
  <StyledTerminal>
    <Terminal {...props} />
  </StyledTerminal>
