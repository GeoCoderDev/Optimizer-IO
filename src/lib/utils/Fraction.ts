import { FractionErrors } from "../../errors/FractionErrors";
import { RationalNumber } from "../../interfaces/Fraction";
import {
  BasicArithmeticOperations,
  basicArithmeticOperation,
} from "../helpers/basicOperations";
import {
  gcd,
  getMinimumDivisblesBetween,
} from "../helpers/greatestCommonDivisor";

export interface FractionProps {
  numerator: number;
  denominator: number;
}

export class Fraction implements FractionProps {
  numerator: number = 1;
  denominator: number = 1;

  constructor(data: number | FractionProps) {
    if (typeof data === "number") return Fraction.fractionFrom(data);

    //Pasando el signo negativo al numerador
    this.numerator = data.denominator < 0 ? -data.numerator : data.numerator;
    this.denominator = Math.abs(data.denominator);
  }

  toNumber(precision?: number): number {
    return precision
      ? Number((this.numerator / this.denominator).toFixed(precision))
      : this.numerator / this.denominator;
  }

  toString() {
    return `${this.numerator}/${this.denominator}`;
  }

  operateWithOtherFraction(
    operation: BasicArithmeticOperations,
    fraction: Fraction,
    inverse: boolean
  ) {
    let numerator;
    let denominator;

    if (operation === "+" || operation === "-") {
      console.log('Aqui una resta o suma\n\n", this,operation, fraction');
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
          false,
          this.numerator,
          fraction.numerator
        );
        denominator = basicArithmeticOperation(
          operation,
          false,
          this.denominator,
          fraction.denominator
        );
      } else {
        numerator = this.numerator * fraction.denominator;

        denominator = this.denominator * fraction.numerator;

        if (inverse) [numerator, denominator] = [denominator, numerator];
      }
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
    console.log("operateFractionWith", this, operation, operand);
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

  private static fractionFrom(number: number) {
    // Inicializamos el numerador y el denominator con el decimal

    const { numerator, denominator } = getMinimumDivisblesBetween(number, 1);

    // Devolvemos la fracción como un objeto con numerator y denominator
    return new Fraction({ numerator, denominator });
  }
}

export function numberToFractionIfItCan(number: number): Fraction | number {
  return createFractionIfItCan({ numerator: number, denominator: 1 })!;
}

/**
 * Esta funcion devuelve una fraccion con los 2 numeros brindados, puede
 * ser tambien numero si el denominador es 1 o indefinido si los son 0
 * @param data
 * @returns
 */
export function createFractionIfItCan(
  data: FractionProps
): Fraction | number | undefined {
  if (data.numerator === 0 && data.denominator === 0) return undefined;
  if (data.denominator === 0) return data.numerator > 0 ? Infinity : -Infinity;
  if (data.numerator === 0) return 0;

  const { numerator, denominator } = getMinimumDivisblesBetween(
    data.numerator,
    data.denominator
  );

  if (denominator === 1) return numerator;

  return new Fraction({ numerator, denominator });
}
