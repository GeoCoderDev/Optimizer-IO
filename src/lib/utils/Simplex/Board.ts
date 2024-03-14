import {
  CoefficientMethodBigM,
  ConvertCellInZeroWithOtherRow,
  FutureOperation,
  FutureOperations,
  LinealTerm,
  MinimumQuotientColumn,
  OperationBetweenRows,
  SimplexCell,
  VariableName,
} from "../../../interfaces/Simplex";
import { TermM } from "./TermM";
import {
  ColumnNumber,
  RowNumber,
  RowNumbersArray,
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
import { CellOfRowInOneOperation } from "../../../interfaces/Simplex";

export type BoardComponentType = "row" | "column";
export type BoardComponentIdentifier = number | VariableName;

interface BoardConstructorParams {
  rowNames: VariableName[];
  columnNames: VariableName[];
  rowNumbers: RowNumbersArray;
  minimumQuotientColumn?: MinimumQuotientColumn;
  futureOperations?: FutureOperations;
  highlightedColumn?: VariableName[];
  highlightedRows?: VariableName[];
  highlightedCells?: SimplexCell[];
  maxNumberInitial?: number;
}

export class Board implements BoardConstructorParams {
  rowNames: VariableName[];
  columnNames: VariableName[];
  rowNumbers: RowNumbersArray;
  minimumQuotientColumn?: MinimumQuotientColumn;
  futureOperations: FutureOperations = {
    futureOperations: [],
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
    this.rowNumbers.rows.forEach((thisRowNumber) => {
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
    futureOperations,
  }: BoardConstructorParams) {
    super({
      rowNames,
      columnNames,
      rowNumbers,
    });

    //Comprobando si hay operaciones pendientes entre filas y realizandolas
    console.log(futureOperations);
    if (futureOperations) {
      futureOperations.futureOperations.forEach((futureOperation, i) => {
        if (futureOperation instanceof OperationBetweenRows) {
          const { operation, row1, row2 } = futureOperation;
          // if (futureOperation instanceof ConvertCellInZeroWithOtherRow) {
          //   const { columnIndexToConvertToZeroInRow1 } = futureOperation;

          //   return;
          // }

          const newRow = this.operateTwoRows(
            this.getRow(row1.variableName).operate("*", row1.coefficient),
            operation,

            this.getRow(row2.variableName).operate("*", row2.coefficient)
          );

          console.log(
            "segundafila",
            this.getRow(row2.variableName).operate("*", row2.coefficient)
          );

          this.setNewRow(row1.variableName, newRow);
        } else if (futureOperation instanceof CellOfRowInOneOperation) {
          const row = this.getRow(futureOperation.rowIdentifier);
          row.operate(
            "/",
            row.coefficients[
              typeof futureOperation.columnIdentifier === "number"
                ? futureOperation.columnIdentifier
                : this.getIndexOfRowOrColumnByName(
                    "column",
                    futureOperation.columnIdentifier
                  )
            ],
            true
          );
        } else {
          //Reemplazando Nombres
          this.replaceNewRowName(
            futureOperation.previousName,
            futureOperation.newName
          );
        }
        console.log(
          `%cfuture\noperation ${i + 1}`,
          "color:blue;font-family:system-ui;font-size:1rem;font-weight:bold",
          structuredClone(this)
        );
      });
    }
  }

  getRow(rowNameOrIndex: BoardComponentIdentifier): RowNumber {
    const rowIndex =
      typeof rowNameOrIndex === "number"
        ? rowNameOrIndex
        : this.getIndexOfRowOrColumnByName("row", rowNameOrIndex);

    if (rowIndex < 0)
      throw new Error(SimplexErrorCodes.COMPONENT_NOT_FOUND_IN_BOARD);
    if (rowIndex >= this.rowNames.length)
      throw new Error(
        SimplexErrorCodes.INDEX_OUT_OF_RANGE +
          ` ${
            typeof rowNameOrIndex === "number"
              ? rowNameOrIndex
              : rowNameOrIndex.letter + rowNameOrIndex.number
          }`
      );

    // console.log("getrow",rowIndex,this.rowNumbers[rowIndex]);
    return this.rowNumbers.rows[rowIndex];
  }

  getColumn(columnNameOrIndex: BoardComponentIdentifier): ColumnNumber {
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
      this.rowNumbers.rows.map((rowNumber) => {
        return rowNumber.coefficients[index];
      }),
      index
    );

    return column;
  }

  // getMostPositiveNumberOfARow(rowName: VariableName) {}
  // getMostPositiveNumberOfAColumn(columnName: VariableName) {}

  getSmallestCellOfARow(
    rowIdentifier: BoardComponentIdentifier,
    indexesExcep: number[]
  ): SimplexCell {
    console.log("getSmallestCellOfARow", rowIdentifier);

    const row = this.getRow(rowIdentifier);

    const rowIndex =
      typeof rowIdentifier === "number"
        ? rowIdentifier
        : this.getIndexOfRowOrColumnByName("row", rowIdentifier);

    let columnIndex: number = 0;
    let smallestValue: CoefficientMethodBigM = Infinity;

    row.coefficients.forEach((coeff, index) => {
      if (indexesExcep.indexOf(index) !== -1) return;
      if (
        comparesCoefficientsMethodBigM(
          coeff,
          "<",
          smallestValue,
          this.maxNumberInitial
        )
      ) {
        columnIndex = index;
        smallestValue = coeff;
      }
    });

    console.log(smallestValue);
    return {
      rowIndex,
      columnIndex,
      value: smallestValue,
    };
  }

  getValueByRowAndColumnIdentifiers(
    rowIdentifier: BoardComponentIdentifier,
    columnIdentifier: BoardComponentIdentifier
  ) {
    // console.log(rowIdentifier, columnIdentifier);
    console.log(
      "getValueByRowAndColumnIdentifiers",
      rowIdentifier,
      columnIdentifier
    );

    return this.getRow(rowIdentifier).coefficients[
      typeof columnIdentifier === "number"
        ? columnIdentifier
        : this.getIndexOfRowOrColumnByName("column", columnIdentifier)
    ];
  }

  // getSmallestNumberOfAColumn(columnName: VariableName) {}

  operateTwoRows(
    rowOrIdentifier1: RowNumber | BoardComponentIdentifier,
    operation: AdditiveOperations,
    rowOrIdentifier2: RowNumber | BoardComponentIdentifier
  ): RowNumber {
    const firstRow =
      rowOrIdentifier1 instanceof RowNumber
        ? rowOrIdentifier1
        : this.getRow(rowOrIdentifier1);

    const secondRow =
      rowOrIdentifier2 instanceof RowNumber
        ? rowOrIdentifier2
        : this.getRow(rowOrIdentifier2);

    return new RowNumber(
      firstRow.coefficients.map((coefficient, index) => {
        return operateBetweenCoefficientOfMethodBigM(
          operation,
          false,
          coefficient,
          secondRow.coefficients[index]
        );
      })
    );
  }

  addFutureOperation(futureOperation: FutureOperation) {
    this.futureOperations.futureOperations.push(futureOperation);
  }

  multiplicateRowWithCoefficientMethodBigMInTheFuture(
    rowIdentifier: BoardComponentIdentifier,
    coefficientMethodBigM: CoefficientMethodBigM
  ) {
    console.log(
      "multiplicateRowWithCoefficientMethodBigMInTheFuture",
      rowIdentifier
    );
    this.getRow(rowIdentifier).operate("/", coefficientMethodBigM);
  }

  convertCellToOneInTheFuture(
    rowIdentifier: BoardComponentIdentifier,
    columnIdentifier: BoardComponentIdentifier
  ) {
    const cellInOneOperation = new CellOfRowInOneOperation({
      rowIdentifier,
      columnIdentifier,
    });

    this.addFutureOperation(cellInOneOperation);
  }

  convertCellToZeroInTheFuture(
    rowIdentifier: BoardComponentIdentifier,
    columnIdentifier: BoardComponentIdentifier,
    rowToUse: BoardComponentIdentifier,
    coefficientShouldBeOne = false
  ): void {
    if (coefficientShouldBeOne) {
      if (
        this.getValueByRowAndColumnIdentifiers(rowToUse, columnIdentifier) !== 1
      )
        throw new Error(SimplexErrorCodes.COEFFICIENT_SHOULD_BE_ONE);
    }

    console.log("convertCellToZeroInTheFuture");

    const firstRowName =
      typeof rowIdentifier === "number"
        ? this.rowNames[rowIdentifier]
        : rowIdentifier;

    const row1: LinealTerm = {
      coefficient: 1,
      variableName: firstRowName,
    };

    const intersectionValue = this.getValueByRowAndColumnIdentifiers(
      rowIdentifier,
      columnIdentifier
    );

    let coefficientSecondRow;
    let operation: AdditiveOperations;

    if (
      comparesCoefficientsMethodBigM(
        intersectionValue,
        "<",
        0,
        this.maxNumberInitial
      )
    ) {
      coefficientSecondRow = operateBetweenCoefficientOfMethodBigM(
        "*",
        false,
        intersectionValue,
        -1
      );
      operation = "+";
    } else {
      coefficientSecondRow = intersectionValue;
      operation = "-";
    }

    const otherRowName =
      typeof rowToUse === "number" ? this.rowNames[rowToUse] : rowToUse;

    const row2: LinealTerm = {
      coefficient: coefficientSecondRow,
      variableName: otherRowName,
    };

    const newFutureOperation = new ConvertCellInZeroWithOtherRow({
      operation,
      resultRowIndex: this.getIndexOfRowOrColumnByName(
        "row",
        row1.variableName
      ),
      row1,
      row2,
      columnIndexToConvertToZeroInRow1:
        typeof columnIdentifier === "number"
          ? columnIdentifier
          : this.getIndexOfRowOrColumnByName("column", columnIdentifier),
    });

    console.log(newFutureOperation);

    this.addFutureOperation(newFutureOperation);
  }

  replaceNewRowName(
    rowIdentifier: BoardComponentIdentifier,
    newName: VariableName
  ) {
    this.rowNames[
      typeof rowIdentifier === "number"
        ? rowIdentifier
        : this.getIndexOfRowOrColumnByName("row", rowIdentifier)
    ] = newName;
  }

  setNewRow(rowIdentifier: BoardComponentIdentifier, newRow: RowNumber): void {
    if (newRow.coefficients.length !== this.columnNames.length)
      throw new Error(SimplexErrorCodes.NEW_ROW_WITH_DIFFERENT_LENGTH);
    let index;

    if (typeof rowIdentifier === "number") {
      if (rowIdentifier < 0 || rowIdentifier >= this.rowNames.length)
        throw new Error(SimplexErrorCodes.INDEX_OUT_OF_RANGE);

      index = rowIdentifier;
    } else index = this.getIndexOfRowOrColumnByName("row", rowIdentifier);

    console.log("setNewRow", index);
    this.rowNumbers.rows[index] = newRow;
  }

  getIndexOfRowOrColumnByName(
    BoardcomponentType: BoardComponentType,
    name: VariableName
  ): number {
    let index;
    if (BoardcomponentType === "column") {
      index = this.columnNames.findIndex(
        ({ letter, number }) => name.letter === letter && name.number === number
      );
    } else {
      index = this.rowNames.findIndex(
        ({ letter, number }) => name.letter === letter && name.number === number
      );
    }

    if (index === -1) {
      throw new Error(SimplexErrorCodes.COMPONENT_NOT_FOUND_IN_BOARD);
    }
    return index;
  }

  // findRowOrColumnWhereThereThisValue(compoenentType: BoardComponentType, variableName: VariableName, coefficient: ):SimplexCell[]{

  // }

  /**
   * Este metodo devuelve todas las variables basicas que aun tienen coeficiente
   * M en Z, si no hay ninguna se devuelve undefined
   */
  getBasicVariablesWhoHasCoefficientMInZ(): VariableName[] | undefined {
    const basicVariables: VariableName[] = [];

    const objetiveFunction = this.getRow(0);

    console.log(
      "getBasicVariablesWhoHasCoefficientMInZ",
      "objetiveFunction",
      objetiveFunction
    );

    this.rowNames.forEach((rownName) => {
      const columnIndex = this.getIndexOfRowOrColumnByName("column", rownName);

      //CHEQUEAR BIEN
      if (objetiveFunction.coefficients[columnIndex] instanceof TermM)
        basicVariables.push(rownName);
    });

    console.log("getBasicVariablesWhoHasCoefficientMInZ", basicVariables);
    return basicVariables.length === 0 ? undefined : basicVariables;
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
