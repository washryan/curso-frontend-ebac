import React from 'react'
import Header from './components/Header'
import Produtos from './containers/Produtos'

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <Produtos />
      </main>
    </div>
  )
}
