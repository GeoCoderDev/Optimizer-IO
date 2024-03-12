import {
  ADDITIONAL_VARIABLES,
  InputSimplex,
  LinealTerm,
  LinealTermsEquality,
  RESTRICTION_COEFFICIENTS,
  Reformulation,
  VariableName,
  Z_ADDITIONAL_VARIABLES_COEFFICIENTS,
} from "../../../interfaces/Simplex";
import { Board } from "../../utils/Simplex/Board";
import { Equality } from "../../utils/Simplex/Equality";
import { RowNumber } from "../../utils/Simplex/RowNumber";

export function assembleReformulation({
  numberOfVariables,
  objetiveFunction,
  type,
  restrictions,
}: InputSimplex) {
  //Se resuleve de manera diferente
  if (type === "objetiveValue") {
    return;
  }

  //Minimizacion o Maximizacion

  // const Z_COEFFICIENTS = {
  //   Z: 1,
  //   Sol: 0,
  //   ...(type !== "objetiveValue"
  //     ? Z_ADDITIONAL_VARIABLES_COEFFICIENTS[type]
  //     : {}),
  // };

  const Z_COEFFICIENTS = {
    Z: 1,
    Sol: 0,
    ...Z_ADDITIONAL_VARIABLES_COEFFICIENTS[type],
  };

  //Armando la funcion objetivo
  const columnNames: VariableName[] = [];
  const rowNames: VariableName[] = [];

  //Incializando con la primera letra
  columnNames.push({ letter: "Z" });
  rowNames.push({ letter: "Z" });

  //Agregando las variables a los nombres de las columnas
  for (
    let i = 1;
    i <= numberOfVariables;
    columnNames.push({ letter: `X`, number: i++ })
  );

  // Agregando variables de holgura, exceso y artificiales a las columnas
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

  const objetiveFunctionOutput = new Equality({
    linealTerms: {
      left: [{ coefficient: 1, variableName: { letter: "Z" } }],
      right: [
        ...columnNames.flatMap((columnName) => {
          if (
            columnName.letter === "Sol" ||
            columnName.letter === "E" ||
            columnName.letter === "Z" ||
            columnName.letter === "S"
          )
            return [];

          const linealTerm: LinealTerm = {
            coefficient:
              columnName.letter === "X"
                ? objetiveFunction[columnName.number! - 1]
                : Z_COEFFICIENTS[columnName.letter],
            variableName: columnName,
          };

          return linealTerm;
        }),
      ],
    },
  });

  const restrictionsOutput: Equality[] = [
    ...restrictions.map(({ coefficients, independentTerm }, rIndex) => {
      const linealTerms: LinealTermsEquality = {
        left: [
          ...columnNames.flatMap((columnName) => {
            if (columnName.letter === "Z" || columnName.letter === "Sol")
              return [];

            if (
              (columnName.letter == "S" ||
                columnName.letter === "E" ||
                columnName.letter === "A") &&
              columnName.number !== rIndex + 1
            )
              return [];

            const linealTerm: LinealTerm = {
              coefficient:
                columnName.letter === "X"
                  ? coefficients[columnName.number! - 1]
                  : RESTRICTION_COEFFICIENTS[columnName.letter],
              variableName: columnName,
            };
            return linealTerm;
          }),
        ],
        //No hay terminos a la derecha
        right: [],
      };

      const equality = new Equality({
        linealTerms,
        independentTerm: { side: "right", value: independentTerm },
      });

      return equality;
    }),
  ];

  const reformulation: Reformulation = {
    type,
    rowNames,
    columnNames,
    objetiveFunction: objetiveFunctionOutput,
    restrictions: restrictionsOutput,
  };

  return reformulation;
}

export function assembleFirstBoard({
  type,
  columnNames,
  objetiveFunction,
  restrictions,
  rowNames,
}: Reformulation) {
  if (type === "objetiveValue") return;

  // Armando la primera fila
  //Haciendo las respectivas operaciones con la GRAN M
  const firstRowNumberEquation: Equality =
    type === "maximization"
      ? objetiveFunction.operate("multiply", -1).clearIndependentTerm("right")
      : objetiveFunction.clearIndependentTerm("right");

  const firstRowNumber = new RowNumber(
    columnNames.map((columnName) =>
      firstRowNumberEquation.coefficientOf(columnName)
    )
  );

  const rowNumbers: RowNumber[] = [
    firstRowNumber,
    ...restrictions.map(
      (restriction) =>
        new RowNumber(
          columnNames.map((columnName) => {
            if (columnName.letter === "Sol")
              return restriction.independentTerm?.value ?? 0;
            return restriction.coefficientOf(columnName);
          })
        )
    ),
  ];

  const firstBoard: Board = new Board({
    columnNames,
    rowNames,
    rowNumbers,
  });

  return firstBoard;
}

export function iterateMethodBigM(initialBoard: Board): Board{




}