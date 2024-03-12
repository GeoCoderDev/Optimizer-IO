import { RationalNumber } from "../../../interfaces/Fraction";
import {
  IndependentTermEquality,
  LinealTerm,
  LinealTermsEquality,
  SideEquality,
  VariableName,
} from "../../../interfaces/Simplex";
import {
  BasicArithmeticOperations,
  MultiplicativeOperations,
  basicArithmeticOperation,
} from "../../helpers/basicOperations";

export function operateAllCoefficients(
  linealTerms: LinealTerm[],
  operation: BasicArithmeticOperations,
  operand: RationalNumber
) {
  return linealTerms.map(({ coefficient, variableName }) => {
    const newCoefficient = operateBetweenRationalNumbers(
      operation,
      false,
      coefficient,
      operand
    );

    return {
      coefficient: newCoefficient,
      variableName,
    };
  });
}

export function operateBetweenRationalNumbers(
  operation: BasicArithmeticOperations,
  inverse = false,
  ...operands: RationalNumber[]
): RationalNumber {
  const rationalNumbersArgs = inverse
    ? operands.reverse()
    : operands;

  return rationalNumbersArgs.reduce((acum, val) => {
    let result;
    if (typeof acum === "number") {
      if (typeof val === "number")
        result = basicArithmeticOperation(operation, false, acum, val);
      else result = val.operateWith(operation, acum, true);
    } else {
      result = acum.operateWith(operation, val);
    }

    return result;
  });
}

export class Equality {
  linealTerms: LinealTermsEquality;
  independentTerm?: IndependentTermEquality;

  constructor({
    linealTerms,
    independentTerm,
  }: {
    linealTerms: LinealTermsEquality;
    independentTerm?: IndependentTermEquality;
  }) {
    this.linealTerms = linealTerms;
    this.independentTerm = independentTerm;
  }

  coefficientOf({ letter, number }: VariableName) {
    const termFinded = this.linealTerms.left.find(
      (linealTerm) =>
        linealTerm.variableName.letter === letter &&
        linealTerm.variableName.number === number
    );

    return termFinded?.coefficient ?? 0;
  }

  operate(
    operation: MultiplicativeOperations,
    operand: RationalNumber,
    modifyOriginal = false
  ): Equality {
    const linealTerms: LinealTermsEquality = {
      left: operateAllCoefficients(this.linealTerms.left, operation, operand),
      right: operateAllCoefficients(this.linealTerms.left, operation, operand),
    };

    let independentTerm: typeof this.independentTerm;

    if (this.independentTerm) {
      independentTerm = {
        side: this.independentTerm.side,
        value: operateBetweenRationalNumbers(
          operation,
          false,
          this.independentTerm.value,
          operand
        ),
      };
    }

    if (modifyOriginal) {
      this.linealTerms = linealTerms;
      this.independentTerm = independentTerm;

      return this;
    }

    return new Equality({ linealTerms, independentTerm });
  }

  clearIndependentTerm(side: SideEquality, modifyOriginal = false): Equality {
    const independentTerm: typeof this.independentTerm = this.independentTerm
      ? {
          side,
          value:
            this.independentTerm.side === side
              ? this.independentTerm.value
              : -this.independentTerm.value,
        }
      : {
          side,
          value: 0,
        };

    const otherSide: SideEquality = side === "left" ? "right" : "left";

    const linealTerms = {} as LinealTermsEquality;

    // Asignar las propiedades dinámicamente
    // Pasando todos los coeficientes al otro lado
    linealTerms[side] = [];
    linealTerms[otherSide] = [
      ...this.linealTerms[otherSide],
      ...this.linealTerms[side].map(({ coefficient, variableName }) => {
        const newLinealTerm: LinealTerm = {
          variableName,
          coefficient: -coefficient,
        };
        return newLinealTerm;
      }),
    ];

    if (modifyOriginal) {
      this.independentTerm = independentTerm;
      this.linealTerms = linealTerms;
      return this;
    }

    return new Equality({ linealTerms, independentTerm });
  }

  // clearVariable(side: "left" | "right", variable: VariableName) {}
}
