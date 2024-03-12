import { gcd } from "../helpers/greatestCommonDivisor";

export class Fraction {
  numerator: number = 1;
  denominator: number = 1;

  constructor(data: number | { numerator: number; denominator: number }) {
    if (typeof data === "number") return Fraction.fractionFrom(data);
    this.numerator = data.numerator;
    this.denominator = data.denominator;
  }

  toNumber(precision?: number) {
    return precision
      ? (this.numerator / this.denominator).toFixed(precision)
      : this.numerator / this.denominator;
  }

  static fractionFrom(number: number) {
    // Inicializamos el numerador y el denominator con el decimal
    let numerator = number;
    let denominator = 1;

    // Mientras el numerator no sea entero, multiplicamos por 10
    // el numerator y el denominator
    while (numerator % 1 !== 0) {
      numerator *= 10;
      denominator *= 10;
    }

    // Buscamos el máximo común divisor entre el numerator y el denominator
    const mcd = gcd(numerator, denominator);

    // Dividimos ambos por el máximo común divisor para simplificar la fracción
    numerator /= mcd;
    denominator /= mcd;

    // Devolvemos la fracción como un objeto con numerator y denominator
    return new Fraction({ numerator, denominator });
  }
}
