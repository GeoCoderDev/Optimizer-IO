import {
  CoefficientMethodBigM,
  MinimumQuotientColumn,
  OperationBetweenRows,
  OperationsBetweenRowsColumn,
  SimplexCell,
  VariableName,
} from "../../../interfaces/Simplex";
import { TermM } from "./TermM";
import {
  ColumnNumber,
  RowNumber,
  operateBetweenCoefficientOfMethodBigM,
} from "./BoardComponents";

import { AdditiveOperations } from "../../helpers/basicOperations";
import { SimplexErrorCodes } from "../../../errors/Simplex/simplexErrorCodes";
import { comparesRationalNumbers } from "../../helpers/operationsRationalNumbers";
import {
  comparesCoefficientsMethodBigM,
  maxCoefficientMethodBigMWithoutMValue,
} from "../../helpers/Simplex/operationsCoefficientsMethodBigM";
import { Fraction } from "../Fraction";

export type BoardComponentType = "row" | "column";

interface BoardConstructorParams {
  rowNames: VariableName[];
  columnNames: VariableName[];
  rowNumbers: RowNumber[];
  minimumQuotientColumn?: MinimumQuotientColumn;
  nextOperationsBetweenRowsColumn?: OperationsBetweenRowsColumn;
  highlightedColumn?: VariableName[];
  highlightedRows?: VariableName[];
  highlightedCells?: SimplexCell[];
  maxNumberInitial?: number;
}

export class Board implements BoardConstructorParams {
  rowNames: VariableName[];
  columnNames: VariableName[];
  rowNumbers: RowNumber[];
  minimumQuotientColumn?: MinimumQuotientColumn;
  nextOperationsBetweenRowsColumn: OperationsBetweenRowsColumn = {
    operationsBetweenRows: [],
  };
  highlightedColumn: VariableName[] = [];
  highlightedRows: VariableName[] = [];
  highlightedCells: SimplexCell[] = [];
  maxNumberInitial: number = -Infinity;

  constructor({ rowNames, columnNames, rowNumbers }: BoardConstructorParams) {
    this.rowNames = rowNames;
    this.columnNames = columnNames;
    this.rowNumbers = rowNumbers;

    //Obteniendo el numero mayor de toda la tabla para valores de M
    this.rowNumbers.forEach((thisRowNumber) => {
      const currentRowNumber = maxCoefficientMethodBigMWithoutMValue(
        ...thisRowNumber.coefficients
      );

      this.maxNumberInitial = comparesRationalNumbers(
        this.maxNumberInitial ?? -Infinity,
        "<",
        currentRowNumber
      )
        ? currentRowNumber instanceof Fraction
          ? currentRowNumber.toNumber()
          : currentRowNumber
        : this.maxNumberInitial;
    });
  }
}

export class SimplexBoard extends Board {
  constructor({
    rowNames,
    columnNames,
    rowNumbers,
    nextOperationsBetweenRowsColumn,
  }: BoardConstructorParams) {
    super({
      rowNames,
      columnNames,
      rowNumbers,
    });

    //Comprobando si hay operaciones pendientes entre filas y realizandolas
    if (nextOperationsBetweenRowsColumn) {
      nextOperationsBetweenRowsColumn.operationsBetweenRows.forEach(
        (operationBetweenRows) => {
          if (!operationBetweenRows) return;
          const { operation, row1, row2 } = operationBetweenRows;
          const newRow = this.operateTwoRows(
            this.getRow(row1.variableName),
            operation,
            this.getRow(row2.variableName)
          );

          this.setNewRow(row1.variableName, newRow);
        }
      );
    }
  }

  getRow(rowNameOrIndex: VariableName | number): RowNumber {
    const rowIndex =
      typeof rowNameOrIndex === "number"
        ? rowNameOrIndex
        : this.rowNames.findIndex(
            ({ letter, number }) =>
              rowNameOrIndex.letter === letter &&
              rowNameOrIndex.number === number
          );

    if (rowIndex < 0)
      throw new Error(SimplexErrorCodes.COMPONENT_NOT_FOUND_IN_BOARD);

    return this.rowNumbers[rowIndex];
  }

  getColumn(columnNameOrIndex: VariableName | number): ColumnNumber {
    const index =
      typeof columnNameOrIndex === "number"
        ? columnNameOrIndex
        : this.columnNames.findIndex(
            ({ letter, number }) =>
              columnNameOrIndex.letter === letter &&
              columnNameOrIndex.number === number
          );

    if (index < 0)
      throw new Error(SimplexErrorCodes.COMPONENT_NOT_FOUND_IN_BOARD);

    const column = new ColumnNumber(
      this.rowNumbers.map((rowNumber) => {
        return rowNumber.coefficients[index];
      }),
      index
    );

    return column;
  }

  // getMostPositiveNumberOfARow(rowName: VariableName) {}
  // getMostPositiveNumberOfAColumn(columnName: VariableName) {}

  getSmallestCellOfARow(
    rowNameOrIndex: VariableName | number,
    indexesExcep: number[]
  ): SimplexCell {
    const row = this.getRow(rowNameOrIndex);

    const rowIndex =
      typeof rowNameOrIndex === "number"
        ? rowNameOrIndex
        : this.getIndexOfRowOrColumnByName("row", rowNameOrIndex);
    let columnIndex: number = 0;
    let smallestValue: CoefficientMethodBigM = Infinity;

    row.coefficients.forEach((coeff, index) => {
      if (indexesExcep.indexOf(index) !== 1) return;
      if (
        comparesCoefficientsMethodBigM(coeff, "<", 0, this.maxNumberInitial)
      ) {
        columnIndex = index;
        smallestValue = coeff;
      }
    });

    if (!rowIndex)
      throw new Error(SimplexErrorCodes.COMPONENT_NOT_FOUND_IN_BOARD);

    return {
      rowIndex,
      columnIndex,
      value: smallestValue,
    };
  }

  // getSmallestNumberOfAColumn(columnName: VariableName) {}

  // convertCellToZero(
  //   { columnIndex, rowIndex }: SimplexCell,
  //   rowToUse?: RowNumber
  // ): RowNumber {
  //   if (rowToUse) {
  //   }
  //   const columnOfCell = this.getColumn(columnIndex);
  // }

  operateTwoRows(
    rowOrIndex1: RowNumber | number,
    operation: AdditiveOperations,
    rowOrIndex2: RowNumber | number
  ): RowNumber {
    const firstRow =
      typeof rowOrIndex1 === "number" ? this.getRow(rowOrIndex1) : rowOrIndex1;
    const secondRow =
      typeof rowOrIndex2 === "number" ? this.getRow(rowOrIndex2) : rowOrIndex2;

    return new RowNumber(
      firstRow.coefficients.map((c, index) => {
        return operateBetweenCoefficientOfMethodBigM(
          operation,
          false,
          secondRow.coefficients[index]
        );
      })
    );
  }

  addFutureOperationBetweenRows(operationBetweenRows?: OperationBetweenRows) {
    this.nextOperationsBetweenRowsColumn.operationsBetweenRows.push(
      operationBetweenRows
    );
  }

  setNewRow(
    rowNameOrIndex: VariableName | number,
    newRow: RowNumber,
    newName?: VariableName
  ): void {
    if (newRow.coefficients.length !== this.columnNames.length)
      throw new Error(SimplexErrorCodes.NEW_ROW_WITH_DIFFERENT_LENGTH);
    let index;

    if (typeof rowNameOrIndex === "number") {
      if (rowNameOrIndex < 0 || rowNameOrIndex >= this.rowNames.length)
        throw new Error(SimplexErrorCodes.INDEX_OUT_OF_RANGE);

      index = rowNameOrIndex;
    } else index = this.getIndexOfRowOrColumnByName("row", rowNameOrIndex);

    if (!index) throw new Error(SimplexErrorCodes.INDEX_NOT_FOUND);

    this.rowNumbers[index] = newRow;

    if (newName) this.rowNames[index] = newName;
  }

  getIndexOfRowOrColumnByName(
    BoardcomponentType: BoardComponentType,
    name: VariableName
  ): number | undefined {
    let index;
    if (BoardcomponentType === "column")
      index = this.columnNames.findIndex(
        ({ letter, number }) => name.letter === letter && name.number === number
      );
    else
      index = this.columnNames.findIndex(
        ({ letter, number }) => name.letter === letter && name.number === number
      );

    if (index === -1) return;
    return index;
  }

  // findRowOrColumnWhereThereThisValue(compoenentType: BoardComponentType, variableName: VariableName, coefficient: ):SimplexCell[]{

  // }

  getBasicVariablesWhoHasCoefficientMInZ(): VariableName[] | undefined {
    const basicVariables: VariableName[] = [];

    const objetiveFunction = this.getRow(0);

    this.rowNames.forEach((rownName) => {
      const columnIndex = this.getIndexOfRowOrColumnByName("column", rownName);

      if (!columnIndex) return;

      //CHEQUEAR BIEN
      if (objetiveFunction.coefficients[columnIndex] instanceof TermM)
        basicVariables.push(rownName);
    });

    return (basicVariables.length===0)?undefined: basicVariables;
  }

  // removeCoefficientsMFromZ() {}

  hasNegativeCoefficientsInZ() {
    return comparesCoefficientsMethodBigM(
      this.getSmallestCellOfARow(0, [0, this.columnNames.length - 1]).value,
      "<",
      0,
      this.maxNumberInitial
    );
  }

  testVariableName(
    boardComponentType: BoardComponentType,
    variable: VariableName
  ) {
    let finded = false;
    if (boardComponentType === "row") {
      if (
        this.rowNames.some(
          ({ letter, number }) =>
            variable.letter === letter && variable.number === number
        )
      )
        finded = true;
    } else {
      if (
        this.columnNames.some(
          ({ letter, number }) =>
            variable.letter === letter && variable.number === number
        )
      )
        finded = true;
    }
    if (!finded)
      throw new Error(SimplexErrorCodes.COMPONENT_NOT_FOUND_IN_BOARD);
  }

  addHighlightRow(rowName: VariableName) {
    this.testVariableName("row", rowName);
    this.highlightedRows.push(rowName);
  }

  addHighlightColumn(columnName: VariableName) {
    this.testVariableName("column", columnName);
    this.highlightedColumn.push(columnName);
  }

  addHighlightCell(simplexCell: SimplexCell) {
    if (
      simplexCell.columnIndex < this.columnNames.length &&
      simplexCell.columnIndex >= 0 &&
      simplexCell.rowIndex < this.rowNames.length &&
      simplexCell.rowIndex >= 0
    )
      this.highlightedCells.push(simplexCell);
    else throw new Error(SimplexErrorCodes.INDEX_OUT_OF_RANGE);
  }
}
