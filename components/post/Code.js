import styled from 'styled-components'

const Code = styled.code`
  color: #8e43e7;
  font-size: 13px;
  line-height: 22px;
  font-family: Operator Mono, Menlo, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
`

const stripLeadingNewline = text => {
  let formattedText = text
  while (formattedText[0] === '\n') {
    formattedText = formattedText.slice(1)
  }

  return formattedText
}

export default ({ children }) =>
  <Code>
    {stripLeadingNewline(children)}
  </Code>
