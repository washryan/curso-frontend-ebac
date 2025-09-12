<template>
  <div class="app">
    <header>
      <h1>Calculadora reativa</h1>
      <p>Altere os valores ou a operação — o resultado atualiza automaticamente.</p>
    </header>

    <main class="card">
      <div class="row">
        <label>
          Número 1
          <input type="number" v-model.number="num1" />
        </label>

        <label>
          Operação
          <select v-model="op">
            <option value="+">+</option>
            <option value="-">−</option>
            <option value="*">×</option>
            <option value="/">÷</option>
          </select>
        </label>

        <label>
          Número 2
          <input type="number" v-model.number="num2" />
        </label>
      </div>

      <div class="result">
        <strong>Resultado:</strong>
        <span v-if="error" class="error">{{ error }}</span>
        <span v-else class="value">{{ formattedResult }}</span>
      </div>
    </main>

    <footer class="note">
      <small>Operações suportadas: soma, subtração, multiplicação e divisão (tratamento de divisão por zero).</small>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const num1 = ref(0)
const num2 = ref(0)
const op = ref('+')

function isFiniteNumber(v) {
  return typeof v === 'number' && Number.isFinite(v)
}

/** retorna { value: number|null, error: string|null } */
const calc = computed(() => {
  const a = Number(num1.value)
  const b = Number(num2.value)

  if (!isFiniteNumber(a) || !isFiniteNumber(b)) {
    return { value: null, error: 'Informe números válidos' }
  }

  switch (op.value) {
    case '+': return { value: a + b, error: null }
    case '-': return { value: a - b, error: null }
    case '*': return { value: a * b, error: null }
    case '/':
      if (b === 0) return { value: null, error: 'Erro: divisão por zero' }
      return { value: a / b, error: null }
    default: return { value: null, error: 'Operação inválida' }
  }
})

const error = computed(() => calc.value.error)
const formattedResult = computed(() => {
  const v = calc.value.value
  if (v === null || v === undefined) return '—'
  // formata com até 6 casas, remove zeros à direita
  const s = Number.isInteger(v) ? String(v) : String(Math.round(v * 1e6) / 1e6)
  return s
})
</script>

<style scoped>
.app {
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  padding: 2rem;
  max-width: 760px;
  margin: 0 auto;
}
header h1 { margin: 0 0 .2rem 0; }
.card {
  background: white;
  padding: 1.2rem;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(10,20,40,0.06);
  margin-top: 1rem;
}
.row {
  display:flex;
  gap:12px;
  flex-wrap:wrap;
}
label {
  display:flex;
  flex-direction:column;
  gap:6px;
  min-width: 200px;
}
input[type="number"], select {
  padding: .5rem .6rem;
  border-radius:6px;
  border:1px solid #e2e8f0;
  font-size:1rem;
}
.result {
  margin-top: 1rem;
  display:flex;
  align-items:center;
  gap: .6rem;
  font-size:1.1rem;
}
.value { color: #0b6; font-weight:700; }
.error { color: #e53e3e; font-weight:600; }
.note { margin-top: 1rem; color:#666; font-size:.9rem; }
</style>
