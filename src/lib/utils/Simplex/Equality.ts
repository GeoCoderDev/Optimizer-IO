import { IndependentTermEquality, LinealTerm, LinealTermsEquality, SideEquality, VariableName } from "../../../interfaces/Simplex";

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
      operation: "multiply" | "divide",
      operand: number,
      modifyOriginal = false
    ): Equality {
      const linealTerms: LinealTermsEquality = {
        left: this.linealTerms.left.map(({ coefficient, variableName }) => {
          return {
            coefficient:
              operation === "multiply"
                ? coefficient * operand
                : coefficient / operand,
            variableName,
          };
        }),
        right: this.linealTerms.right.map(({ coefficient, variableName }) => {
          return {
            coefficient:
              operation === "multiply"
                ? coefficient * operand
                : coefficient / operand,
            variableName,
          };
        }),
      };
  
      let independentTerm: typeof this.independentTerm;
  
      if (this.independentTerm) {
        independentTerm = {
          side: this.independentTerm.side,
          value:
            operation === "multiply"
              ? this.independentTerm.value * operand
              : this.independentTerm.value / operand,
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
  