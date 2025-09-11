const alunos = [
  { nome: "Ana", nota: 9.0 },
  { nome: "Bruno", nota: 5.5 },
  { nome: "Carla", nota: 6.0 },
  { nome: "Diego", nota: 4.0 },
  { nome: "Elisa", nota: 7.2 },
  { nome: "Felipe", nota: 6.9 }
];

const getAprovados = (listaAlunos, limite = 6) =>
  listaAlunos.filter(({ nota }) => nota >= limite);

const aprovados = getAprovados(alunos);
console.log("Alunos aprovados (nota >= 6):", aprovados);

const nomesAprovados = aprovados.map(({ nome }) => nome);
console.log("Nomes aprovados:", nomesAprovados);

if (typeof module !== "undefined" && module.exports) {
  module.exports = { alunos, getAprovados };
}
