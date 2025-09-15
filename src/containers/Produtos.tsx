import React from 'react'
import { useGetProdutosQuery } from '../services/api'
import Product from '../components/Product'

export default function Produtos() {
  const { data, error, isLoading } = useGetProdutosQuery()

  if (isLoading) return <p>Carregando produtos...</p>
  if (error) return <p>Erro ao carregar produtos</p>

  return (
    <section className="products">
      {data?.map((p) => (
        <Product key={p.id} produto={p} />
      ))}
    </section>
  )
}
