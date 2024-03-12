import { Board } from "../lib/utils/Simplex/Board";
import { Equality } from "../lib/utils/Simplex/Equality";
import {  MixedNumberWithTermM } from '../lib/utils/Simplex/MixedNumberWithM';
import { TermM } from "../lib/utils/Simplex/TermM";
import { RationalNumber } from "./Fraction";

//INPUT SIMPLEX
export const Z_ADDITIONAL_VARIABLES_COEFFICIENTS_MAX: AdditionalVariablesValues =
  {
    S: 0,
    A: -Infinity,
    E: 0,
  };
export const Z_ADDITIONAL_VARIABLES_COEFFICIENTS_MIN: AdditionalVariablesValues =
  {
    S: 0,
    A: Infinity,
    E: 0,
  };

export const Z_ADDITIONAL_VARIABLES_COEFFICIENTS = {
  maximization: Z_ADDITIONAL_VARIABLES_COEFFICIENTS_MAX,
  minimization: Z_ADDITIONAL_VARIABLES_COEFFICIENTS_MIN,
  objetiveValue: null,
};

interface AdditionalVariablesValues {
  S: number;
  A: number;
  E: number;
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

export const RESTRICTION_COEFFICIENTS = {
  S: 1,
  E: -1,
  A: 1,
};

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
  boards: Board[];
  optimalValues: number[];
  optimalSolution: number;  
}

export interface Reformulation {
  type: OptimizationType;
  columnNames: VariableName[];
  rowNames: VariableName[];
  objetiveFunction: Equality;
  restrictions: Equality[];
}

export type SideEquality = keyof LinealTermsEquality;

export type CoefficientMethodBigM = RationalNumber | TermM | MixedNumberWithTermM; 

export interface LinealTerm {
  coefficient: RationalNumber;
  variableName: VariableName;
}

export interface VariableName {
  letter: "Sol" | AllNamesVariables;
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

export interface MinimumQuotientColumn{
  
}

export interface OperationsBetweenRowsColumn{
  
}