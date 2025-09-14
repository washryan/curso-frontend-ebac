import React, { useState, useMemo } from 'react'

function classifyBMI(bmi) {
  if (bmi === null) return { category: '', color: '' }
  if (bmi < 18.5) return { category: 'Abaixo do peso', color: '#2b6cb0' }
  if (bmi < 25) return { category: 'Normal', color: '#2f855a' }
  if (bmi < 30) return { category: 'Sobrepeso', color: '#d69e2e' }
  if (bmi < 35) return { category: 'Obesidade grau I', color: '#dd6b20' }
  if (bmi < 40) return { category: 'Obesidade grau II', color: '#c53030' }
  return { category: 'Obesidade grau III', color: '#9b2c2c' }
}

export default function IMCCalculator() {
  // armazenar altura em centímetros para facilitar input do usuário
  const [heightCm, setHeightCm] = useState('')
  const [weightKg, setWeightKg] = useState('')

  // parse e validação
  const numericHeight = parseFloat(String(heightCm).replace(',', '.'))
  const numericWeight = parseFloat(String(weightKg).replace(',', '.'))

  const bmi = useMemo(() => {
    if (!numericHeight || !numericWeight) return null
    const h = numericHeight / 100 // cm -> m
    if (h <= 0) return null
    const value = numericWeight / (h * h)
    if (!Number.isFinite(value)) return null
    return value
  }, [numericHeight, numericWeight])

  const rounded = bmi === null ? '—' : (Math.round(bmi * 10) / 10).toFixed(1)
  const classification = bmi === null ? '' : classifyBMI(bmi)

  const errorMessage = useMemo(() => {
    if (heightCm === '' || weightKg === '') return ''
    if (Number.isNaN(numericHeight) || Number.isNaN(numericWeight)) return 'Informe números válidos'
    if (numericHeight <= 0) return 'Altura deve ser maior que zero (cm)'
    if (numericWeight <= 0) return 'Peso deve ser maior que zero (kg)'
    return ''
  }, [heightCm, weightKg, numericHeight, numericWeight])

  return (
    <div>
      <div className="row">
        <label>
          Altura (cm)
          <input
            type="number"
            step="0.1"
            placeholder="ex.: 170"
            value={heightCm}
            onChange={(e) => setHeightCm(e.target.value)}
            aria-label="Altura em centímetros"
          />
        </label>

        <label>
          Peso (kg)
          <input
            type="number"
            step="0.1"
            placeholder="ex.: 70"
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            aria-label="Peso em quilogramas"
          />
        </label>
      </div>

      <div className="result" aria-live="polite">
        <div>
          <strong>IMC:</strong>{' '}
          <span className="value">{errorMessage ? '—' : rounded}</span>
        </div>

        <div style={{ marginLeft: 16 }}>
          <strong>Classificação:</strong>{' '}
          {errorMessage ? (
            <span className="error">{errorMessage}</span>
          ) : (
            <span style={{ color: classification.color || '#111', fontWeight: 700 }}>
              {classification.category || '—'}
            </span>
          )}
        </div>
      </div>

      <div className="table">
        <h4>Tabela (referência)</h4>
        <ul>
          <li>&lt; 18.5 — Abaixo do peso</li>
          <li>18.5 – 24.9 — Normal</li>
          <li>25 – 29.9 — Sobrepeso</li>
          <li>30 – 34.9 — Obesidade grau I</li>
          <li>35 – 39.9 — Obesidade grau II</li>
          <li>&ge; 40 — Obesidade grau III</li>
        </ul>
      </div>
    </div>
  )
}
