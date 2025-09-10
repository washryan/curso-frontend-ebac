class Veiculo {
  constructor(marca, modelo) {
    if (new.target === Veiculo) {
    }
    this.marca = marca;
    this.modelo = modelo;
    this._velocidade = 0;
  }

  get velocidade() {
    return this._velocidade;
  }

  set velocidade(v) {
    if (typeof v !== 'number' || v < 0) {
      throw new Error('Velocidade deve ser número >= 0');
    }
    this._velocidade = v;
  }

  acelerar(delta = 10) {
    this.velocidade = this.velocidade + delta;
    return this.velocidade;
  }

  frear(delta = 10) {
    this.velocidade = Math.max(0, this.velocidade - delta);
    return this.velocidade;
  }

  tempoAte100() {
    return 999;
  }

  toString() {
    return `${this.constructor.name} ${this.marca} ${this.modelo} (vel=${this.velocidade} km/h)`;
  }
}

class Carro extends Veiculo {
  constructor(marca, modelo, motores = 1) {
    super(marca, modelo);
    this.motores = motores;
  }
  tempoAte100() {
    return Math.max(3, 12 - this.motores * 2);
  }
}

class Motocicleta extends Veiculo {
  constructor(marca, modelo, cilindradas) {
    super(marca, modelo);
    this.cilindradas = cilindradas;
  }
  tempoAte100() {
    if (this.cilindradas >= 1000) return 3;
    if (this.cilindradas >= 600) return 5;
    return 8;
  }
}

class Aviao extends Veiculo {
  constructor(marca, modelo, tipo) {
    super(marca, modelo);
    this.tipo = tipo || 'comercial';
  }
  tempoAte100() {
    return 1;
  }
}

const carro1 = new Carro('Volkswagen', 'Gol', 1);
const moto1 = new Motocicleta('Honda', 'CB500', 500);
const aviao1 = new Aviao('Boeing', '737', 'comercial');

console.log('--- Instâncias criadas ---');
console.log(carro1.toString(), 'tempo0-100s:', carro1.tempoAte100());
console.log(moto1.toString(), 'tempo0-100s:', moto1.tempoAte100());
console.log(aviao1.toString(), 'tempo0-100s:', aviao1.tempoAte100());

try {
  carro1.velocidade = 50; // ok
  moto1.velocidade = 120; // ok
} catch (err) {
  console.error('Erro ao setar velocidade:', err.message);
}

const lista = [carro1, moto1, aviao1];
console.log('\n--- Polimorfismo: tempos 0-100 (por instância) ---');
lista.forEach(v => {
  console.log(`${v.constructor.name} ${v.marca} ${v.modelo} -> ${v.tempoAte100()}s`);
});

if (typeof window !== 'undefined') {
  window.OO = { Veiculo, Carro, Motocicleta, Aviao, carro1, moto1, aviao1 };
}
