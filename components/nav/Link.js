import styled from 'styled-components'
import PropTypes from 'prop-types'

const Link = styled.a.attrs({
  target: '_blank',
})`
  color: #999;
  padding: 10px;
  padding-left: 10px;
  font-size: 12px;
  font-weight: normal;
  text-transform: uppercase;

  @media screen and (max-width: 950px) {
    display: block;
    font-size: 20px;
  }
`

class NavLink extends React.Component {
  super(props) {
    constructor(props)
  }

  render() {
    return (
      <Link onClick={() => this.context.onNavLinkClick()} {...this.props} />
    )
  }
}

NavLink.contextTypes = {
  onNavLinkClick: PropTypes.func,
}

export default Link
