import { RationalNumber } from "../../../interfaces/Fraction";
import { CoefficientMethodBigM } from "../../../interfaces/Simplex";
import {
  BasicArithmeticOperations,
  MultiplicativeOperations,
} from "../../helpers/basicOperations";
import { Equality, operateBetweenRationalNumbers } from "./Equality";
import { TermM } from "./TermM";

export class RowNumber {
  coefficients: CoefficientMethodBigM[];

  constructor(coefficients: Equality | CoefficientMethodBigM[]) {
    if (coefficients instanceof Equality)
      this.coefficients = [
        ...coefficients
          .clearIndependentTerm("right")
          .linealTerms.left.map((linealTerm) => linealTerm.coefficient),
      ];
    else this.coefficients = coefficients;
  }

  operate(
    operation: MultiplicativeOperations,
    operand: RationalNumber | TermM,
    modifyOriginal = false
  ): RowNumber {
    const coefficients = [
      ...this.coefficients.map((coefficient) =>
        operateBetweenCoefficientOfMethodBigM(
          operation,
          false,
          coefficient,
          operand
        )
      ),
    ];

    if (modifyOriginal) {
      this.coefficients = coefficients;
      return this;
    }

    return new RowNumber(coefficients);
  }
}

export function operateBetweenCoefficientOfMethodBigM(
  operation: BasicArithmeticOperations,
  inverse: boolean,
  ...operands: CoefficientMethodBigM[]
) {
  const coefficientOfMethodBigMOperand = inverse
    ? operands.reverse()
    : operands;

  return coefficientOfMethodBigMOperand.reduce((acum, val) => {
    if (acum instanceof TermM) return acum.operateWith(operation, val);

    if (val instanceof TermM) return val.operateWith(operation, acum, true);

    return operateBetweenRationalNumbers(operation, inverse, acum, val);
  });
}
