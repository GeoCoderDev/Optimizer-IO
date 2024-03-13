import { RationalNumberErrorCodes } from "../../errors/RationalNumbers";
import { RationalNumber } from "../../interfaces/Fraction";
import { ComparisonSign } from "../../interfaces/comparisonSigns";
import { Fraction } from "../utils/Fraction";

export function comparesRationalNumbers(
    rational1: RationalNumber,
    comparisonSign: ComparisonSign,
    rational2: RationalNumber
  ): boolean {
    const number1: number =
      rational1 instanceof Fraction ? rational1.toNumber() : rational1;
    const number2: number =
      rational2 instanceof Fraction ? rational2.toNumber() : rational2;
  
    switch (comparisonSign) {
      case "!=":
        return number1 !== number2;
      case "=":
        return number1 === number2;
      case ">":
        return number1 > number2;
      case "<":
        return number1 < number2;
      case ">=":
        return number1 >= number2;
      case "<=":
        return number1 <= number2;
      default:
        throw new Error(RationalNumberErrorCodes.CANNOT_COMPARE);
    }
  }

  