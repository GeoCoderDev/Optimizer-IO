import { AdditiveOperations } from "../lib/helpers/basicOperations";
import { comparesRationalNumbers } from "../lib/helpers/operationsRationalNumbers";
import { SimplexBoard } from "../lib/utils/Simplex/Board";
import {
  Equality,
  operateBetweenRationalNumbers,
} from "../lib/utils/Simplex/Equality";
import { MixedNumberWithTermM, TermM } from "../lib/utils/Simplex/TermM";
import { RationalNumber } from "./Fraction";

//INPUT SIMPLEX
export const RIGHT_SIDE_NAME = "Sol";

interface AdditionalVariablesValues {
  S: CoefficientMethodBigM;
  A: CoefficientMethodBigM;
  E: CoefficientMethodBigM;
}

export type AdditionalVariables = keyof AdditionalVariablesValues;

export interface AdditionalVariablesNames {
  "<=": AdditionalVariables[];
  "=": AdditionalVariables[];
  ">=": AdditionalVariables[];
}

export const ADDITIONAL_VARIABLES: AdditionalVariablesNames = {
  "<=": ["S"],
  "=": ["A"],
  ">=": ["E", "A"],
};

export type AllNamesVariables = "X" | "Z" | keyof AdditionalVariablesValues;

export interface InputSimplex {
  type: OptimizationType;
  numberOfVariables: number;
  objetiveFunction: number[];
  restrictions: Restriction[];
  objetiveValue?: number;
}

export type OptimizationType =
  | "maximization"
  | "minimization"
  | "objetiveValue";

export interface Restriction {
  coefficients: number[];
  comparisonSign: keyof typeof ADDITIONAL_VARIABLES;
  independentTerm: number;
}

//OUTPUT SIMPLEX
export interface OutputSimplex {
  reformulation: Reformulation;
  boards: (SimplexBoard | SimplexBoard[])[];
  optimalValues: number[];
  optimalSolution: number;
}

export interface Reformulation {
  columnNames: VariableName[];
  rowNames: VariableName[];
  restrictions: Equality[];
  objetiveFunction: Equality;
  type: OptimizationType;
}

export type SideEquality = keyof LinealTermsEquality;

export type CoefficientMethodBigM =
  | RationalNumber
  | TermM
  | MixedNumberWithTermM;

export interface LinealTerm {
  coefficient: CoefficientMethodBigM;
  variableName: VariableName;
}

export interface VariableName {
  letter: typeof RIGHT_SIDE_NAME | AllNamesVariables;
  number?: number;
}

export interface LinealTermsEquality {
  left: LinealTerm[];
  right: LinealTerm[];
}

export interface IndependentTermEquality {
  value: RationalNumber;
  side: SideEquality;
}

export class OperationOfQuotient {
  rowIndex: number;
  dividend: RationalNumber;
  divisor: RationalNumber;
  result: RationalNumber;
  constructor({
    dividend,
    divisor,
    rowIndex,
  }: {
    rowIndex: number;
    dividend: RationalNumber;
    divisor: RationalNumber;
  }) {
    this.rowIndex = rowIndex;
    this.dividend = dividend;
    this.divisor = divisor;

    this.result = operateBetweenRationalNumbers("/", false, dividend, divisor);
  }

  static createOperationOfQuotient({
    dividend,
    divisor,
    rowIndex,
  }: {
    rowIndex: number;
    dividend: RationalNumber;
    divisor: RationalNumber;
  }): OperationOfQuotient | undefined {
    //REGLAS AQUI PARA CONSIDERAR EN EL CONCIENTE MINIMO
    if (comparesRationalNumbers(divisor, "<", 0)) return; //Regla 1: Divisor no negativo
    return new OperationOfQuotient({ dividend, divisor, rowIndex });
  }
}

export interface MinimumQuotientColumn {
  quotientOperations: (OperationOfQuotient | undefined)[];
  cellRowIndexHighlighted: number;
}

export class OperationBetweenRows {
  row1: LinealTerm;
  row2: LinealTerm;
  operation: AdditiveOperations;
  /**
   * Note that the first row is the one that will be modified in the
   * next iteration
   *
   */
  constructor({
    row1,
    row2,
    operation,
  }: {
    row1: LinealTerm;
    row2: LinealTerm;
    operation: AdditiveOperations;
  }) {
    this.row1 = row1;
    this.row2 = row2;
    this.operation = operation;
  }
}

export interface OperationsBetweenRowsColumn {
  operationsBetweenRows: (OperationBetweenRows | undefined)[];
}

export interface SimplexCell {
  columnIndex: number;
  rowIndex: number;
  value: CoefficientMethodBigM;
}

export const RESTRICTION_COEFFICIENTS = {
  S: 1,
  E: -1,
  A: 1,
};

export const Z_ADDITIONAL_VARIABLES_COEFFICIENTS_MAX: AdditionalVariablesValues =
  {
    S: 0,
    A: new TermM(1),
    E: 0,
  };
export const Z_ADDITIONAL_VARIABLES_COEFFICIENTS_MIN: AdditionalVariablesValues =
  {
    S: 0,
    A: new TermM(-1),
    E: 0,
  };

export const Z_ADDITIONAL_VARIABLES_COEFFICIENTS = {
  maximization: Z_ADDITIONAL_VARIABLES_COEFFICIENTS_MAX,
  minimization: Z_ADDITIONAL_VARIABLES_COEFFICIENTS_MIN,
  objetiveValue: null,
};

export type NumberPresentationType = "fraction" | "decimal";
