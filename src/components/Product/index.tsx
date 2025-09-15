import React from 'react'
import { Produto } from '../../types'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../features/cartSlice'

type Props = {
  produto: Produto
}

export default function Product({ produto }: Props) {
  const dispatch = useDispatch()
  return (
    <div className="product">
      <img src={produto.imagem} alt={produto.nome} />
      <h3>{produto.nome}</h3>
      <p>R$ {produto.preco.toFixed(2)}</p>
      <button onClick={() => dispatch(addToCart(produto))}>Adicionar ao carrinho</button>
    </div>
  )
}
