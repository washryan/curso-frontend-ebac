import { multiplicar, saudacao } from './functions';

const resultado = multiplicar(4, 5); // 20
const mensagem = saudacao('Washington');

console.log('Resultado da multiplicação (4 * 5):', resultado);
console.log(mensagem);

export { resultado, mensagem };
