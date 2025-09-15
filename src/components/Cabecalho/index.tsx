import styled from 'styled-components'

const CabecalhoWrapper = styled.header`
  background-color: var(--cor-secundaria);
  color: var(--cor-principal);
  text-align: center;
  padding: 24px 0;
`

const Titulo = styled.h1`
  margin: 0;
  font-size: 1.6rem;
`

const Cabecalho = () => (
  <CabecalhoWrapper>
    <Titulo>EBAC Jobs</Titulo>
  </CabecalhoWrapper>
)

export default Cabecalho
