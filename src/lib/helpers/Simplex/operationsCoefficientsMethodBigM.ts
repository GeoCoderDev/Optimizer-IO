import { RationalNumberErrorCodes } from "../../../errors/RationalNumbers";
import { RationalNumber } from "../../../interfaces/Fraction";
import { CoefficientMethodBigM } from "../../../interfaces/Simplex";
import { ComparisonSign } from "../../../interfaces/comparisonSigns";
import { TermM } from "../../utils/Simplex/TermM";
import { comparesRationalNumbers } from "../operationsRationalNumbers";

export function comparesCoefficientsMethodBigM(
  coefficient1: CoefficientMethodBigM,
  comparisonSign: ComparisonSign,
  coefficient2: CoefficientMethodBigM, valueOfM: number
) {
    const operand1: RationalNumber = (coefficient1 instanceof TermM)?coefficient1.toNumber(valueOfM):coefficient1;
    const operand2: RationalNumber = (coefficient2 instanceof TermM)?coefficient2.toNumber(valueOfM):coefficient2;

    return comparesRationalNumbers(operand1, comparisonSign, operand2);
}

export function maxCoefficientMethodBigMWithoutMValue(
  ...coefficients: CoefficientMethodBigM[]
): RationalNumber {
  let max: RationalNumber = -Infinity;

  coefficients.forEach((coefficient) => {
    const currentCoefficient =
      coefficient instanceof TermM ? coefficient.coefficient : coefficient;

    max = comparesRationalNumbers(max, ">", currentCoefficient)
      ? max
      : currentCoefficient;
  });

  if (max === -Infinity)
    throw new Error(RationalNumberErrorCodes.MAX_NOT_FOUND);
  return max;
}
