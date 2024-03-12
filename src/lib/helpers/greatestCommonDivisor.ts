// Función para calcular el máximo común divisor (MCD) usando el algoritmo de Euclides
export function gcd(a: number, b: number) {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
}
