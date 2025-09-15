import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import './styles.css'

export default function Header() {
  const items = useSelector((state: RootState) => state.cart.items)
  return (
    <header className="header">
      <h1>EBAC Sports (Redux)</h1>
      <div className="cart-info">Itens no carrinho: {items.length}</div>
    </header>
  )
}
