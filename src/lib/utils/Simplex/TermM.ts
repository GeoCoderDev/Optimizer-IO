import { SimplexErrorCodes } from "../../../errors/Simplex/simplexErrorCodes";
import { RationalNumber } from "../../../interfaces/Fraction";
import {
  CoefficientMethodBigM,
  NumberPresentationType,
} from "../../../interfaces/Simplex";
import {
  AdditiveOperations,
  BasicArithmeticOperations,
} from "../../helpers/basicOperations";
import { comparesRationalNumbers } from "../../helpers/operationsRationalNumbers";
import { Fraction } from "../Fraction";
import { operateBetweenCoefficientOfMethodBigM } from "./BoardComponents";

import { operateBetweenRationalNumbers } from "./Equality";

export const INCRESE_FACTOR_OF_M = 20;

export class TermM {
  coefficient: RationalNumber;

  constructor(coefficient: RationalNumber) {
    this.coefficient = coefficient;
  }

  toString(
    numberPresentation: NumberPresentationType,
    decimalPresicion?: number
  ) {
    if (this.coefficient === 0) return "";
    return `${comparesRationalNumbers(this.coefficient, "<", 0) ? "-" : ""}${
      comparesRationalNumbers(this.coefficient, "!=", 1)
        ? this.coefficient instanceof Fraction
          ? numberPresentation === "fraction"
            ? this.coefficient.toString()
            : this.coefficient.toNumber(decimalPresicion)
          : this.coefficient
        : ""
    }M`;
  }

  operateWithRationalNumber(
    operation: BasicArithmeticOperations,
    operand: RationalNumber,
    inverse: boolean
  ): CoefficientMethodBigM {
    console.log("TerM\nWith Rational Number");

    if (operation === "*" || operation === "/") {
      const result = operateBetweenRationalNumbers(
        operation,
        inverse,
        this.coefficient,
        operand
      );
      return result === 0 ? 0 : new TermM(result);
    }

    const independentTerm = inverse
      ? operand
      : operateBetweenRationalNumbers(operation, false, 0, operand);

    const coefficientTermM = inverse
      ? operateBetweenRationalNumbers(operation, false, 0, this.coefficient)
      : this.coefficient;

    console.log("final", coefficientTermM, independentTerm);
    if (independentTerm === 0) return new TermM(coefficientTermM);

    return new MixedNumberWithTermM({
      coefficientTermM,
      independentTerm,
    });
  }

  operateWithTermM(
    operation: AdditiveOperations,
    operandTermM: TermM,
    inverse: boolean
  ): CoefficientMethodBigM {
    const result = operateBetweenRationalNumbers(
      operation,
      inverse,
      this.coefficient,
      operandTermM.coefficient
    );
    console.log("TerMWithTermM");
    return result === 0 ? 0 : new TermM(result);
  }

  operateWithMixedNumberWithTermM(
    operation: AdditiveOperations,
    operandMixedNumberWithTermM: MixedNumberWithTermM,
    inverse: boolean
  ): CoefficientMethodBigM {
    console.log("TerMWitMixedTermM");
    const independentResult = operandMixedNumberWithTermM.independentTerm;
    const coefficientTermM = operateBetweenRationalNumbers(
      operation,
      inverse,
      this.coefficient,
      operandMixedNumberWithTermM.coefficient
    );

    if (independentResult === 0) {
      if (coefficientTermM === 0) return 0;
      return new TermM(coefficientTermM);
    }

    if (coefficientTermM === 0) return independentResult;
    return new MixedNumberWithTermM({
      coefficientTermM: coefficientTermM,
      independentTerm: coefficientTermM,
    });
  }

  operateWith(
    operation: BasicArithmeticOperations,
    operand: CoefficientMethodBigM,
    inverse = false
  ): CoefficientMethodBigM {
    if (operand instanceof MixedNumberWithTermM) {
      if (operation === "*" || operation === "/")
        throw new Error(SimplexErrorCodes.NOT_OPERABLE_OPERANDS);
      return this.operateWithMixedNumberWithTermM(operation, operand, inverse);
    }

    if (operand instanceof TermM) {
      if (operation === "*" || operation === "/")
        throw new Error(SimplexErrorCodes.NOT_OPERABLE_OPERANDS);
      return this.operateWithTermM(operation, operand, inverse);
    }

    return this.operateWithRationalNumber(operation, operand, inverse);
  }

  toNumber(maximumBoardValue: number): number {
    const valueOfM = maximumBoardValue * INCRESE_FACTOR_OF_M;

    return (
      (this.coefficient instanceof Fraction
        ? this.coefficient.toNumber()
        : this.coefficient) * valueOfM
    );
  }

  toggleSign(): CoefficientMethodBigM {
    return operateBetweenCoefficientOfMethodBigM("*", false, this, -1);
  }
}

export class MixedNumberWithTermM extends TermM {
  independentTerm: RationalNumber;

  constructor({
    coefficientTermM,
    independentTerm,
  }: {
    coefficientTermM: RationalNumber;
    independentTerm: RationalNumber;
  }) {
    super(coefficientTermM);
    this.independentTerm = independentTerm;
  }

  override operateWithRationalNumber(
    operation: BasicArithmeticOperations,
    operand: RationalNumber,
    inverse: boolean
  ): CoefficientMethodBigM {

    console.log(
      "%cMixed M with rational Number",
      "color:red;font-family:system-ui;font-size:1rem;-webkit-text-stroke: 1px black;font-weight:bold", this, operation, operand, inverse
    );

    const independentResult = operateBetweenRationalNumbers(
      operation,
      inverse,
      this.independentTerm,
      operand
    );

    let coefficientTermM;
    if (operation === "*" || operation === "/") {
      coefficientTermM = operateBetweenRationalNumbers(
        operation,
        inverse,
        this.coefficient,
        operand
      );
    } else {
      coefficientTermM = operateBetweenRationalNumbers(
        operation,
        inverse,
        this.coefficient,
        0
      );
    }

    if (independentResult === 0) {
      if (coefficientTermM !== undefined) {
        if (coefficientTermM === 0) return 0;
        return new TermM(coefficientTermM);
      }
      return new TermM(this.coefficient);
    }

    if (!coefficientTermM)
      return new MixedNumberWithTermM({
        coefficientTermM: this.coefficient,
        independentTerm: independentResult,
      });

    if (coefficientTermM === 0) return independentResult;

    return new MixedNumberWithTermM({
      coefficientTermM,
      independentTerm: independentResult,
    });
  }

  override operateWithTermM(
    operation: AdditiveOperations,
    operandTermM: TermM,
    inverse: boolean
  ): CoefficientMethodBigM {    

    console.log(
      "%cMixedM with TermM",
      "color:green;font-family:system-ui;font-size:1rem;-webkit-text-stroke: 1px black;font-weight:bold", this, operation, operandTermM, inverse
    );

    const independentTerm = operateBetweenRationalNumbers(
      operation,
      inverse,
      this.independentTerm,
      0
    );

    const coefficientTermM = operateBetweenRationalNumbers(
      operation,
      inverse,
      this.coefficient,
      operandTermM.coefficient
    );    

    if (coefficientTermM === 0) return this.independentTerm;
    return new MixedNumberWithTermM({ coefficientTermM, independentTerm });
  }

  override operateWithMixedNumberWithTermM(
    operation: AdditiveOperations,
    operandMixedNumberWithTermM: MixedNumberWithTermM,
    inverse: boolean
  ): CoefficientMethodBigM {
    const resultIndependentTerms = operateBetweenRationalNumbers(
      operation,
      inverse,
      this.independentTerm,
      operandMixedNumberWithTermM.independentTerm
    );

    const resultTermsM: RationalNumber = operateBetweenRationalNumbers(
      operation,
      inverse,
      this.coefficient,
      operandMixedNumberWithTermM.coefficient
    );

    if (resultIndependentTerms === 0) {
      if (resultTermsM === 0) return 0;
      return new TermM(resultTermsM);
    }

    if (resultTermsM === 0) return this.independentTerm;
    return new MixedNumberWithTermM({
      coefficientTermM: resultTermsM,
      independentTerm: resultIndependentTerms,
    });
  }

  override operateWith(
    operation: BasicArithmeticOperations,
    operand: CoefficientMethodBigM,
    inverse = false
  ): CoefficientMethodBigM {
    if (operand instanceof MixedNumberWithTermM) {
      if (operation === "*" || operation === "/")
        throw new Error(SimplexErrorCodes.NOT_OPERABLE_OPERANDS);
      return this.operateWithMixedNumberWithTermM(operation, operand, inverse);
    }

    if (operand instanceof TermM) {
      if (operation === "*" || operation === "/")
        throw new Error(SimplexErrorCodes.NOT_OPERABLE_OPERANDS);
      return this.operateWithTermM(operation, operand, inverse);
    }

    return this.operateWithRationalNumber(operation, operand, inverse);
  }

  override toNumber(maximumBoardValue: number): number {
    const valueOfM = maximumBoardValue * INCRESE_FACTOR_OF_M;

    return (
      (this.coefficient instanceof Fraction
        ? this.coefficient.toNumber()
        : this.coefficient) *
        valueOfM +
      (this.independentTerm instanceof Fraction
        ? this.independentTerm.toNumber()
        : this.independentTerm)
    );
  }
}
