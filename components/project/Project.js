import styled from 'styled-components'

const Project = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  text-align: left;
  box-shadow: 0 2px 4px rgba(3, 27, 78, .06);
  padding: 5px 5px 5px 15px;
  transition: box-shadow 225ms linear;
  :hover {
    box-shadow: 0 10px 20px rgba(3, 27, 78, .1);
  }
`

export default Project
