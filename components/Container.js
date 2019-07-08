import styled from 'styled-components'

const Container = styled.div`
  max-width: 900px;
  padding: 90px 0 0 0;
  margin: 0 auto;

  @media (max-width: 950px) {
    max-width: 100%;
    padding: 50px 30px 0 30px;
  }

  @media (max-width: 730px) {
    max-width: 100%;
    padding: 50px 20px 0 20px;
  }
`

export default Container
