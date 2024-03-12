import {
  MinimumQuotientColumn,
  OperationsBetweenRowsColumn,
  VariableName,
} from "../../../interfaces/Simplex";
import { MixedNumberWithTermM } from "./MixedNumberWithM";
import { RowNumber } from "./RowNumber";
import { TermM } from "./TermM";

export class Board {
  rowNames: VariableName[];
  columnNames: VariableName[];
  rowNumbers: RowNumber[];
  minimumQuotientColumn?: MinimumQuotientColumn;
  operationsBetweenRowsColumn?: OperationsBetweenRowsColumn;

  constructor({
    columnNames,
    rowNames,
    rowNumbers,
    minimumQuotientColumn,
    operationsBetweenRowsColumn,
  }: {
    rowNames: VariableName[];
    columnNames: VariableName[];
    rowNumbers: RowNumber[];
    minimumQuotientColumn?: MinimumQuotientColumn;
    operationsBetweenRowsColumn?: OperationsBetweenRowsColumn;
  }) {
    this.rowNames = rowNames;
    this.columnNames = columnNames;
    this.rowNumbers = rowNumbers;
    this.minimumQuotientColumn = minimumQuotientColumn;
    this.operationsBetweenRowsColumn = operationsBetweenRowsColumn;
  }

  hasNegativeCoefficientsInZ() {
    const funcionObjetivo = this.rowNumbers[0];
    return funcionObjetivo.coefficients.some((coefficient) => {
      if (coefficient instanceof MixedNumberWithTermM)
        return coefficient.coefficient < 0;
      if (coefficient instanceof TermM) return coefficient.coefficient < 0;
      return coefficient < 0;
    });
  }
}
