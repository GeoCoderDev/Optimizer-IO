import {
  ADDITIONAL_VARIABLES,
  Board,
  HeaderBoard,
  RESTRICTION_COEFFICIENTS,
  Restriction,
  RowNumber,
  Z_COEFFICIENTS,
} from "../../../interfaces/Simplex";

export function assembleFirstBoard({
  numberOfVariables,
  objetiveFunction,
  restrictions,
}: {
  objetiveFunction: number[];
  restrictions: Restriction[];
  numberOfVariables: number;
}): Board {
  //Armando la primera Tabla
  const columnNames: HeaderBoard[] = [];
  const rowNames: HeaderBoard[] = [];

  //Incializando con la primera letra
  rowNames.push({ letter: "Z" });
  columnNames.push({ letter: "Z" });

  //Agregando las variables a los nombres de las columnas
  for (
    let i = 1;
    i <= numberOfVariables;
    columnNames.push({ letter: `X`, number: i++ })
  );

  // Agregando variables de holgura, exceso y artificiales a las filas
  restrictions.forEach(({ comparisonSign }, index) => {
    const position = index + 1;
    ADDITIONAL_VARIABLES[comparisonSign].forEach((letter) => {
      columnNames.push({ letter, number: position });
      if (letter === "E") return;
      rowNames.push({ letter, number: position });
    });
  });

  //Agregando la columna de solucion
  columnNames.push({ letter: "Sol" });

  const firstRowNumber: RowNumber = [
    ...columnNames.map((columnName) => {
      if (columnName.letter === "X") {
        return objetiveFunction[columnName.number! - 1];
      }

      return Z_COEFFICIENTS[columnName.letter];
    }),
  ];

  const rowNumbers: RowNumber[] = [
    firstRowNumber,
    ...restrictions.map((restriction, rIndex) => {
      return columnNames.map(({ letter, number }, colIndex) => {
        if (letter === "Z") return 0;
        if (letter === "X") return restriction.coefficients[colIndex - 1];
        if (letter === "Sol") return restriction.independentTerm;
        if (number === rIndex + 1) return RESTRICTION_COEFFICIENTS[letter];
        return 0;
      });
    }),
  ];

  const firstBoard: Board = {
    columnNames,
    rowNames,
    rowNumbers,
  };

  return firstBoard;
}
