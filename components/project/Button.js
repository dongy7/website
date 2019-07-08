import styled from 'styled-components'

const primaryColor = '#3369e7'
const secondaryColor = '#ff4f81'

const Button = styled.a.attrs({
  target: '_blank',
})`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0 0.5em;
  margin-left: ${props => (props.first ? 0 : '0.5em')};
  background: ${props => (props.primary ? primaryColor : secondaryColor)};
  border: 2px solid;
  border-color: ${props => (props.primary ? primaryColor : secondaryColor)};
  color: white;

  &:hover {
    background: transparent;
    color: ${props => (props.primary ? primaryColor : secondaryColor)};
  }
`

export default Button
