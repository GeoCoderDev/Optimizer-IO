import { SimplexErrorsCodes } from "../../../errors/Simplex/simplexErrorCodes";
import { CoefficientMethodBigM } from "../../../interfaces/Simplex";
import {
  AdditiveOperations,
  BasicArithmeticOperations,
  basicArithmeticOperation,
} from "../../helpers/basicOperations";
import { TermM } from "./TermM";

export class MixedNumberWithTermM extends TermM {
  independentTerm: number;

  constructor({
    coefficientTermM,
    independentTerm,
  }: {
    coefficientTermM: number;
    independentTerm: number;
  }) {
    super(coefficientTermM);
    this.independentTerm = independentTerm;
  }

  override operateWithNumber(
    operation: BasicArithmeticOperations,
    operand: number,
    inverse: boolean
  ): CoefficientMethodBigM {
    const independentResult = basicArithmeticOperation(
      operation,
      inverse,
      this.independentTerm,
      operand
    );

    let coefficientTermM;
    if (operation === "*" || operation === "/") {
      coefficientTermM = basicArithmeticOperation(
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
  ): MixedNumberWithTermM | number {
    const independentTerm = basicArithmeticOperation(
      operation,
      inverse,
      this.independentTerm,
      0
    );

    const coefficientTermM = basicArithmeticOperation(
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
    const resultIndependentTerms = basicArithmeticOperation(
      operation,
      inverse,
      this.independentTerm,
      operandMixedNumberWithTermM.independentTerm
    );

    const resultTermsM: number = basicArithmeticOperation(
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

    return this.operateWithNumber(operation, operand, inverse);
  }
}
