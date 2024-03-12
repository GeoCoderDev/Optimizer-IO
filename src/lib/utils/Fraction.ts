import { FractionErrors } from "../../errors/FractionErrors";
import { RationalNumber } from "../../interfaces/Fraction";
import {
  BasicArithmeticOperations,
  basicArithmeticOperation,
} from "../helpers/basicOperations";
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

  operateWithOtherFraction(
    operation: BasicArithmeticOperations,
    fraction: Fraction,
    inverse: boolean
  ) {
    let numerator;
    let denominator;

    if (operation === "+" || operation === "-") {
      numerator = basicArithmeticOperation(
        operation,
        inverse,
        this.numerator * fraction.denominator,
        this.denominator * fraction.numerator
      );
      denominator = this.denominator * fraction.denominator;
    } else {
      if (operation === "*") {
        numerator = basicArithmeticOperation(
          operation,
          inverse,
          this.numerator,
          fraction.numerator
        );
        denominator = basicArithmeticOperation(
          operation,
          inverse,
          this.denominator,
          fraction.denominator
        );
      }

      numerator = this.numerator * fraction.denominator;

      denominator = this.denominator * fraction.numerator;

      if (inverse) [numerator, denominator] = [denominator, numerator];
    }

    //Reduciendo la fraccion
    const mcd = gcd(numerator, denominator);

    numerator /= mcd;
    denominator /= mcd;

    if (denominator === 0)
      throw new Error(FractionErrors.DENOMINATOR_CANNOT_ZERO);
    if (numerator === 0) return 0;
    if (denominator === 1) return numerator;
    return new Fraction({ numerator, denominator });
  }

  operateWithNumber(
    operation: BasicArithmeticOperations,
    number: number,
    inverse: boolean
  ) {
    return this.operateWithOtherFraction(
      operation,
      new Fraction(number),
      inverse
    );
  }

  operateWith(
    operation: BasicArithmeticOperations,
    operand: RationalNumber,
    inverse = false
  ) {
    if (typeof operand === "number")
      return this.operateWithNumber(operation, operand, inverse);
    return this.operateWithOtherFraction(operation, operand, inverse);
  }

  reverse(modifyOriginal = false) {
    if (modifyOriginal) {
      [this.denominator, this.numerator] = [this.numerator, this.denominator];
      return this;
    }

    return new Fraction({
      numerator: this.denominator,
      denominator: this.numerator,
    });
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
