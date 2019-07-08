import styled from 'styled-components'

const Avatar = styled.div`
  border-radius: 100%;
  margin: auto;
`

const Span = styled.span`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  display: inline-block;
  border-radius: 100%;
  overflow: hidden;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(238, 238, 238);
  border-image: initial;
`

const Img = styled.img`
  width: 100%;
  height: 100%;
`

export default ({ url, height, width }) =>
  <Avatar>
    <Span height={height} width={width}>
      <Img src={url} />
    </Span>
  </Avatar>
