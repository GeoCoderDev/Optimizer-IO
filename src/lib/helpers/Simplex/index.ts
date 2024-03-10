import {
  ADDITIONAL_VARIABLES,
  Board,
  HeaderBoard,
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
    ...restrictions.map((restriction) => {
      return restriction.coefficients;
    }),
  ];

  const firstBoard: Board = {
    columnNames,
    rowNames,
    rowNumbers,
  };

  return firstBoard;
}
