import { useState } from 'react'
import FormVagas from '../../components/FormVagas'
import Vaga from '../../components/Vaga'
import styled from 'styled-components'

type VagaType = {
  id: string
  titulo: string
  localizacao: string
  nivel: string
  modalidade: string
  salarioMin: number
  salarioMax: number
  requisitos: string[]
}

const Vagas = styled.ul<React.HTMLAttributes<HTMLUListElement>>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 16px;
  row-gap: 16px;
  margin-top: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ListaVagas = () => {
  const [vagas] = useState<VagaType[]>([
    {
      id: '1',
      titulo: 'Desenvolvedor Front-end',
      localizacao: 'Remoto',
      nivel: 'Pleno',
      modalidade: 'CLT',
      salarioMin: 4000,
      salarioMax: 7000,
      requisitos: ['React', 'CSS', 'HTML']
    },
    {
      id: '2',
      titulo: 'Designer UI/UX',
      localizacao: 'São Paulo',
      nivel: 'Junior',
      modalidade: 'PJ',
      salarioMin: 3000,
      salarioMax: 5000,
      requisitos: ['Figma', 'Design System']
    },
    {
      id: '3',
      titulo: 'Backend Node',
      localizacao: 'Remoto',
      nivel: 'Senior',
      modalidade: 'CLT',
      salarioMin: 7000,
      salarioMax: 12000,
      requisitos: ['Node', 'TypeScript', 'SQL']
    }
  ])

  const [filtro, setFiltro] = useState('')

  const aoPesquisar = (termo: string) => setFiltro(termo)

  const vagasFiltradas = vagas.filter(
    (v) =>
      v.titulo.toLowerCase().includes(filtro) ||
      v.requisitos.join(' ').toLowerCase().includes(filtro)
  )

  return (
    <div>
      <FormVagas aoPesquisar={aoPesquisar} />
      <Vagas>
        {vagasFiltradas.map((vag) => (
          <Vaga
            key={vag.id}
            titulo={vag.titulo}
            localizacao={vag.localizacao}
            nivel={vag.nivel}
            modalidade={vag.modalidade}
            salarioMin={vag.salarioMin}
            salarioMax={vag.salarioMax}
            requisitos={vag.requisitos}
          />
        ))}
      </Vagas>
    </div>
  )
}

export default ListaVagas
