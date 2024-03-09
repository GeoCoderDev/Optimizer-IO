export interface InputSimplex {
  type: "maximization" | "minimization" | "valueOf";
  objetiveFunction: number[];
  restrictions: Restriction[];
  valueOf?: number; 
}


export interface Restriction {
  coefficients: number[];
  comparisonSign: "greather than or equal" | "equals" | "less than or equal";
  independentTerm: number;
}

export interface OutputSimplex{

}