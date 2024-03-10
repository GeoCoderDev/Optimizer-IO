//INPUT SIMPLEX
export const Z_ADDITIONAL_VARIABLES_COEFFICIENTS = {
  S: 0,
  A: -Infinity,
  E: 0,
};

export type AdditionalVariables =
  keyof typeof Z_ADDITIONAL_VARIABLES_COEFFICIENTS;

export const Z_COEFFICIENTS = {
  ...Z_ADDITIONAL_VARIABLES_COEFFICIENTS,
  Z: 1,
};

export const ADDITIONAL_VARIABLES: {
  "greather than or equal": AdditionalVariables[];
  equals: AdditionalVariables[];
  "less than or equal": AdditionalVariables[];
} = {
  "less than or equal": ["S"],
  equals: ["A"],
  "greather than or equal": ["E", "A"],
};

export type ZCoefficients = keyof typeof Z_COEFFICIENTS;

export type AllNamesVariables = "X" | ZCoefficients;

export interface InputSimplex {
  type: "maximization" | "minimization" | "valueOf";
  numberOfVariables: number;
  objetiveFunction: number[];
  restrictions: Restriction[];
  valueOf?: number;
}

export interface Restriction {
  coefficients: number[];
  comparisonSign: keyof typeof ADDITIONAL_VARIABLES;
  independentTerm: number;
}

//OUTPUT SIMPLEX
export interface OutputSimplex {
  boards: Board[];
  optimalValues: number[];
  optimalSolution: number;
  initialCoefficients: number[];
}

export interface Board {
  rowNames: HeaderBoard[];
  columnNames: HeaderBoard[];
  rowNumbers: RowNumber[];
}

export type RowNumber = number[];

export interface HeaderBoard {
  letter: "X" | ZCoefficients;
  number?: number;
}
