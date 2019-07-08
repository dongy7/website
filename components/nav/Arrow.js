import styled from 'styled-components'

const Menu = styled.div`
  display: None;
  width: 40px;
  height: 40px;

  @media screen and (max-width: 950px) {
    fill: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 28px;
    right: 20px;
    transition: transform 0.2s ease;
    transform: ${props => (props.toggled ? 'rotate(180deg)' : '')};
  }
`
export default ({ onClick, toggled }) =>
  <Menu toggled={toggled}>
    <i className="fas fa-lg fa-chevron-down" onClick={() => onClick()} />
  </Menu>
