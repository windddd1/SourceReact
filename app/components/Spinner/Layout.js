
import styled from 'styled-components'

const Layout = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  z-index: ${props =>props.status ? '2' :'0'};
  width: 100%;
`
export default Layout
    