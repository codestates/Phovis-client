import styled from '@styles/themed-components'

export const HeaderContainer = styled.header`
  width: 100%;
  height: 60px;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 9999;
  transition: top 0.3s;
`
export const HeaderInner = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 24px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #17181e;
  color: #fff;
  z-index: 1001;
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.07);

  div {
    display: flex;
  }
`
export const Banner = styled.div`
  width: 100%;
  height: 55vh;
  overflow: hidden;
  border: 1px solid lightslategray;
`
export const Main = styled.main`
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  min-height: 1000px;
`