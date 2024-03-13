import { TermM } from "./TermM";
import { CoefficientMethodBigM } from "../../../interfaces/Simplex";
import {
  BasicArithmeticOperations,
  MultiplicativeOperations,
} from "../../helpers/basicOperations";
import { Equality, operateBetweenRationalNumbers } from "./Equality";

export class BoardComponent{
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
}

export class RowNumber extends BoardComponent {
  constructor(
    coefficients: Equality | CoefficientMethodBigM[],
    public rowIndex?: number
  ) {
    super(coefficients);
  }

  operate(
    operation: MultiplicativeOperations,
    operand: CoefficientMethodBigM,
    modifyOriginal = false
  ): RowNumber{
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

export class ColumnNumber extends BoardComponent {
  constructor(
    coefficients: Equality | CoefficientMethodBigM[],
    public columnIndex?: number
  ) {
    super(coefficients);
  }

  operate(
    operation: MultiplicativeOperations,
    operand: CoefficientMethodBigM,
    modifyOriginal = false
  ): ColumnNumber{
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

    return new ColumnNumber(coefficients);
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
