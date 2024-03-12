import { CoefficientMethodBigM } from "../../../interfaces/Simplex";
import {
  MultiplicativeOperands,
  MultiplicativeOperations,
} from "../../helpers/basicOperations";
import { Equality } from "./Equality";
import { TermM } from "./TermM";


export class RowNumber {
  coefficients: CoefficientMethodBigM[];

  constructor(coefficients: Equality | number[]) {
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
    operand: number | TermM,
    modifyOriginal = false
  ): RowNumber {
    const coefficients: number[] = [
      ...this.coefficients.map((coefficient) => {
        return operation === "*"
          ? coefficient * operand
          : coefficient / operand;
      }),
    ];

    if (modifyOriginal) {
      this.coefficients = coefficients;
      return this;
    }

    return new RowNumber(coefficients);
  }
}
