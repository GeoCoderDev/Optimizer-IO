import { TermM } from "./TermM";
import { CoefficientMethodBigM } from "../../../interfaces/Simplex";
import {
  BasicArithmeticOperations,
  MultiplicativeOperations,
} from "../../helpers/basicOperations";
import { Equality, operateBetweenRationalNumbers } from "./Equality";

export class BoardComponent {
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

  copy() {
    return new RowNumber(this.coefficients);
  }
}

export class RowNumbersArray {
  rows: RowNumber[];

  constructor(rows: RowNumber[]) {
    this.rows = rows;
  }

  copy() {
    return new RowNumbersArray(this.rows.map((row) => row.copy()));
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
  ): ColumnNumber {
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
    
  const result = coefficientOfMethodBigMOperand.reduce((acum, val) => {
    if (acum instanceof TermM) return acum.operateWith(operation, val);

    if (val instanceof TermM) return val.operateWith(operation, acum, true);

    return operateBetweenRationalNumbers(operation, false, acum, val);
  });

  // console.log(
  //   "%c OperateBetweenCoefficientOfMethodBigM: Resultado","color: magenta; font-size: 0.7rem;",
  //   operation,
  //   operands,
  //   result,
  //   inverse,
  // );

  return result;
}
