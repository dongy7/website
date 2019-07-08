import styled from 'styled-components'

const Div = styled.div`
  margin: 25px 0;
  font-family: helvetica neue, helvetica, arial, "lucida grande", sans-serif;
  &: hover a {
    visibility: visible;
  }
`

const Span = styled.span`
  position: absolute;
  margin-left: -15px;
  width: 15px;
  &: hover a {
    visibility: visible;
  }
`

const A = styled.a`visibility: hidden;`

const h = ({ id, level = 2, fontsize = 16, children }) =>
  <Div>
    {react.createelement(
      `h${level}`,
      { style: { fontweight: 500, fontsize } },
      <Span>
        <A href={`#${id}`} id={id}>
          #
        </A>
      </Span>,
      children
    )}
  </Div>

const h2 = h
const h3 = props => h({ ...props, level: 3, fontsize: 14 })

export default h2
export { h2, h3 }
