import { SimplexErrorsCodes } from "../../../errors/Simplex/simplexErrorCodes";
import { RationalNumber } from "../../../interfaces/Fraction";
import { CoefficientMethodBigM } from "../../../interfaces/Simplex";
import {
  AdditiveOperations,
  BasicArithmeticOperations
} from "../../helpers/basicOperations";
import { operateBetweenRationalNumbers } from './Equality';
import { TermM } from "./TermM";

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
    }

    if (independentResult === 0) {
      if (coefficientTermM) {
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
  ): MixedNumberWithTermM | RationalNumber {
    const independentTerm = operateBetweenRationalNumbers(
      operation,
      inverse,
      this.independentTerm,
      0
    );

    const coefficientTermM = operateBetweenRationalNumbers(
      operation,
      inverse,
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
        throw new Error(SimplexErrorsCodes.NOT_OPERABLE_OPERANDS);
      return this.operateWithMixedNumberWithTermM(operation, operand, inverse);
    }

    if (operand instanceof TermM) {
      if (operation === "*" || operation === "/")
        throw new Error(SimplexErrorsCodes.NOT_OPERABLE_OPERANDS);
      return this.operateWithTermM(operation, operand, inverse);
    }

    return this.operateWithRationalNumber(operation, operand, inverse);
  }
}
