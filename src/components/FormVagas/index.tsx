import React, { FormEvent, useState, ChangeEvent } from 'react'
import styled from 'styled-components'

type Props = {
  aoPesquisar: (termo: string) => void
}

const Form = styled.form<React.FormHTMLAttributes<HTMLFormElement>>`
  display: grid;
  grid-template-columns: 1fr auto;
  background-color: var(--cor-secundaria);
  padding: 32px;
  border-radius: 12px;
  margin-top: 40px;
`

const Campo = styled.input<React.InputHTMLAttributes<HTMLInputElement>>`
  padding: 0 16px;
  outline-color: var(--cor-principal);
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 6px;
`

const Botao = styled.button<React.ButtonHTMLAttributes<HTMLButtonElement>>`
  background-color: var(--cor-principal);
  border: 1px solid var(--cor-principal);
  height: 40px;
  padding: 0 16px;
  font-size: 18px;
  color: var(--cor-secundaria);
  margin-left: 8px;
  cursor: pointer;
  border-radius: 6px;
`

const FormVagas = ({ aoPesquisar }: Props) => {
  const [termo, setTermo] = useState<string>('')

  const aoEnviarForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    aoPesquisar(termo.toLocaleLowerCase())
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTermo(e.target.value)
  }

  return (
    <Form onSubmit={aoEnviarForm}>
      <Campo
        placeholder="Front-end, fullstack, node, design"
        onChange={handleChange}
        type="search"
      />
      <Botao type="submit">Pesquisar</Botao>
    </Form>
  )
}

export default FormVagas
