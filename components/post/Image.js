import styled from 'styled-components'

const Div = styled.img`
  max-width: 100%;
  margin: 15px 0;
`

const Image = ({ width, src }) => <Div width={width} src={src}></Div>

export default Image
