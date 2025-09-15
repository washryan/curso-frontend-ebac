import styled from 'styled-components'

type Props = {
  titulo: string
  localizacao: string
  nivel: string
  modalidade: string
  salarioMin: number
  salarioMax: number
  requisitos: string[]
}

const VagaItem = styled.li<React.LiHTMLAttributes<HTMLLIElement>>`
  border: 1px solid var(--cor-principal);
  background-color: var(--cor-secundaria);
  color: var(--cor-principal);
  padding: 16px;
  transition: all 0.3s ease;
  border-radius: 8px;

  a {
    display: inline-block;
    margin-top: 12px;
  }

  &:hover {
    background-color: var(--cor-principal);
    color: var(--cor-secundaria);
  }

  &:hover a {
    border-color: var(--cor-principal);
    background-color: var(--cor-secundaria);
    color: var(--cor-principal);
  }
`

const VagaTitulo = styled.h3`
  font-weight: bold;
  margin-bottom: 16px;
`

const VagaLink = styled.a<React.AnchorHTMLAttributes<HTMLAnchorElement>>`
  display: inline-block;
  padding: 8px 12px;
  border: 1px solid var(--cor-secundaria);
  background-color: transparent;
  color: var(--cor-principal);
  text-decoration: none;
  border-radius: 6px;
`

const Vaga = (props: Props) => (
  <VagaItem>
    <VagaTitulo>{props.titulo}</VagaTitulo>
    <ul>
      <li>Local: {props.localizacao}</li>
      <li>Senioridade: {props.nivel}</li>
      <li>Tipo de contratacao: {props.modalidade}</li>
      <li>
        Salário: {props.salarioMin} - {props.salarioMax}
      </li>
      <li>Requisitos: {props.requisitos.join(', ')}</li>
    </ul>
    <VagaLink href="#">Ver detalhes e candidatar-se</VagaLink>
  </VagaItem>
)

export default Vaga
