import { FractionProps } from "../utils/Fraction";
// Función para calcular el máximo común divisor (MCD) usando el algoritmo de Euclides
export function gcd(a: number, b: number) {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
}

export function getMinimumDivisblesBetween(
  number1: number,
  number2: number
): FractionProps {
  // Mientras el numerator no sea entero, multiplicamos por 10
  // el numerator y el denominator
  while (number1 % 1 !== 0) {
    number1 *= 10;
    number2 *= 10;
  }

  // Buscamos el máximo común divisor entre el numerator y el denominator
  const mcd = gcd(number1, number2);

  // Dividimos ambos por el máximo común divisor para simplificar la fracción
  const numerator = number1 / mcd;
  const denominator = number2 / mcd;

  //Signo siempre en el numerador
  return {
    numerator: denominator < 0 ? -numerator : numerator,
    denominator: Math.abs(denominator),
  };
}
