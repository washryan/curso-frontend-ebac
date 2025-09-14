import React from 'react'
import IMCCalculator from './components/IMCCalculator'

export default function App() {
  return (
    <div className="app">
      <header>
        <h1>Calculadora de IMC</h1>
        <p>Insira altura e peso — o IMC e a classificação atualizam automaticamente.</p>
      </header>

      <main className="card">
        <IMCCalculator />
      </main>

      <footer className="note">
        <small>IMC = peso (kg) / altura (m)² — classificação segundo padrões comuns (OMS).</small>
      </footer>
    </div>
  )
}
