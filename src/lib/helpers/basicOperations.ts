export type AdditiveOperations = "+" | "-";
export type MultiplicativeOperations = "*" | "/";
export type BasicArithmeticOperations = AdditiveOperations | MultiplicativeOperations;

export function basicArithmeticOperation(
  operation: BasicArithmeticOperations,inverse:boolean,
  ...operands: number[]
): number {
  let result: number;

  switch (operation) {
    case "+":
      if(inverse) operands.reverse().reduce((acc, curr) => acc + curr);
      result = operands.reduce((acc, curr) => acc + curr);
      break;

    case "-":
      if(inverse) operands.reverse().reduce((acc, curr) => acc - curr);
      result = operands.reduce((acc, curr) => acc - curr);
      break;
    case "*":
      if(inverse) operands.reverse().reduce((acc, curr) => acc * curr);
      result = operands.reduce((acc, curr) => acc * curr);
      break;
    case "/":
      if(inverse) operands.reverse().reduce((acc, curr) => acc / curr);
      result = operands.reduce((acc, curr) => acc / curr);      
      break;
  }

  return result;
}
