import { SimplexErrorsCodes } from "../../../errors/Simplex/simplexErrorCodes";
import { CoefficientMethodBigM } from "../../../interfaces/Simplex";
import {
  AdditiveOperations,
  BasicArithmeticOperations,
  basicArithmeticOperation,
} from "../../helpers/basicOperations";
import { MixedNumberWithTermM } from "./MixedNumberWithM";

export class TermM {
  coefficient: number;

  constructor(coefficient: number) {
    this.coefficient = coefficient;
  }

  operateWithNumber(
    operation: BasicArithmeticOperations,
    operand: number,
    inverse: boolean
  ): CoefficientMethodBigM {
    if (operation === "*" || operation === "/") {
      const result = basicArithmeticOperation(
        operation,
        inverse,
        this.coefficient,
        operand
      );
      return result === 0 ? 0 : new TermM(result);
    }

    if (operand === 0) return new TermM(this.coefficient);

    return new MixedNumberWithTermM({
      coefficientTermM: this.coefficient,
      independentTerm: operation === "+" ? operand : -operand,
    });
  }

  operateWithTermM(
    operation: AdditiveOperations,
    operandTermM: TermM,
    inverse: boolean
  ): number | TermM {
    const result = basicArithmeticOperation(
      operation,
      inverse,
      this.coefficient,
      operandTermM.coefficient
    );

    return result === 0 ? 0 : new TermM(result);
  }

  operateWithMixedNumberWithTermM(
    operation: AdditiveOperations,
    operandMixedNumberWithTermM: MixedNumberWithTermM,
    inverse: boolean
  ): CoefficientMethodBigM {
    const independentResult = operandMixedNumberWithTermM.independentTerm;
    const coefficientTermM = basicArithmeticOperation(
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
        throw new Error(SimplexErrorsCodes.NOT_OPERABLE_OPERANDS);
      return this.operateWithMixedNumberWithTermM(operation, operand, inverse);
    }

    if (operand instanceof TermM) {
      if (operation === "*" || operation === "/")
        throw new Error(SimplexErrorsCodes.NOT_OPERABLE_OPERANDS);
      return this.operateWithTermM(operation, operand, inverse);
    }

    return this.operateWithNumber(operation, operand, inverse);
  }
}
