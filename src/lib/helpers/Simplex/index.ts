import {
  ADDITIONAL_VARIABLES,
  InputSimplex,
  LinealTerm,
  LinealTermsEquality,
  OtherFutureOperations,
  RESTRICTION_COEFFICIENTS,
  RIGHT_SIDE_NAME,
  Reformulation,
  SimplexBoardBranch,
  SimplexBoardBranches,
  VariableName,
  Z_ADDITIONAL_VARIABLES_COEFFICIENTS,
} from "../../../interfaces/Simplex";
import { SimplexBoard } from "../../utils/Simplex/Board";
import { Equality } from "../../utils/Simplex/Equality";
import {
  RowNumber,
  RowNumbersArray,
} from "../../utils/Simplex/BoardComponents";
import { SimplexErrorCodes } from "../../../errors/Simplex/simplexErrorCodes";
import { numberToFractionIfItCan } from "../../utils/Fraction";

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
  //   [RIGHT_SIDE_NAME]: 0,
  //   ...(type !== "objetiveValue"
  //     ? Z_ADDITIONAL_VARIABLES_COEFFICIENTS[type]
  //     : {}),
  // };

  const Z_COEFFICIENTS = {
    Z: 1,
    [RIGHT_SIDE_NAME]: 0,
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
  columnNames.push({ letter: RIGHT_SIDE_NAME });

  const objetiveFunctionOutput = new Equality({
    linealTerms: {
      left: [{ coefficient: 1, variableName: { letter: "Z" } }],
      right: [
        ...columnNames.flatMap((columnName) => {
          if (
            columnName.letter === RIGHT_SIDE_NAME ||
            columnName.letter === "E" ||
            columnName.letter === "Z" ||
            columnName.letter === "S"
          )
            return [];

          const linealTerm: LinealTerm = {
            coefficient:
              columnName.letter === "X"
                ? numberToFractionIfItCan(
                    objetiveFunction[columnName.number! - 1]
                  )
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
            if (
              columnName.letter === "Z" ||
              columnName.letter === RIGHT_SIDE_NAME
            )
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
                  ? numberToFractionIfItCan(
                      coefficients[columnName.number! - 1]
                    )
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

export function assembleFirstSimplexBoard({
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
    type === "minimization"
      ? objetiveFunction.operate("*", -1).clearIndependentTerm("right")
      : objetiveFunction.clearIndependentTerm("right");

  const firstRowNumber = new RowNumber(
    columnNames.map((columnName) =>
      firstRowNumberEquation.coefficientOf(columnName)
    )
  );

  const rowNumbers = new RowNumbersArray([
    firstRowNumber,
    ...restrictions.map(
      (restriction) =>
        new RowNumber(
          columnNames.map((columnName) => {
            if (columnName.letter === RIGHT_SIDE_NAME)
              return restriction.independentTerm?.value ?? 0;
            return restriction.coefficientOf(columnName);
          })
        )
    ),
  ]);

  const firstBoard: SimplexBoard = new SimplexBoard({
    columnNames,
    rowNames,
    rowNumbers,
  });

  return firstBoard;
}

export function iterateMethodBigM(
  previousSimplexBoard: SimplexBoard
): SimplexBoard | SimplexBoardBranches {
  //Obteniendo todas las propiedades necesarias para continuar las operaciones

  //NO HACER ESTO, SE PIERDEN INSTANCIAS
  // const { rowNames, columnNames, rowNumbers, futureOperations } =
  //   previousSimplexBoard;

  // Creando la nueva tabla con las operaciones futuras para realizar en el constructor con nuevas referencias
  const currentSimplexBoard = new SimplexBoard({
    rowNames: structuredClone(previousSimplexBoard.rowNames),
    columnNames: structuredClone(previousSimplexBoard.columnNames),
    rowNumbers: previousSimplexBoard.rowNumbers.copy(),
    futureOperations: previousSimplexBoard.futureOperations,
    pivoteColumnIndex: previousSimplexBoard.pivoteColumnIndex,
    pivoteRowsIndex: previousSimplexBoard.pivoteRowsIndex,
    pivoteElement: previousSimplexBoard.pivoteElement,
    iterationNumber: previousSimplexBoard.iterationNumber,
  });

  //     Este paso normalmente se hace antes de empezar las iteraciones
  //      Por lo cual aun no se aumentan las iteraciones (No deberia
  //        repetirse nunca mas, solo con la primera Tabla Simplex)
  //
  //==========================================================================
  //|      PASO 0: Eliminar coeficientes M de la funcion objetivo que        |
  //|                  pertenezcan a alguna variable basica                  |
  //==========================================================================

  //Obteniendo todas las variables basicas que aun tienen coeficiente M en Z
  const basicVariablesWithCoefficientMInZ =
    currentSimplexBoard.getBasicVariablesWhoHasCoefficientMInZ();

  //Volviendo a 0 todas las variables basicas que aun tienen coeficiente M en Z
  // para la siguiente tabla simplex
  if (basicVariablesWithCoefficientMInZ) {
    basicVariablesWithCoefficientMInZ.forEach((basicVariableName) => {
      currentSimplexBoard.convertCellToZeroInTheFuture(
        0,
        basicVariableName,
        basicVariableName
      );
    });

    return currentSimplexBoard;
  }

  //==========================================================================
  //|  PASO 1: Obtener Cociente(s) Menor Positivo para hallar la la columna  |
  //|       pivote(Aqui se define si habra 2 o mas ramificaciones)           |
  //==========================================================================

  //Solo se hara esto si la fila pivote no esta definida
  if (currentSimplexBoard.pivoteRowsIndex === undefined) {
    //Que estemos aqui significa que estamos empezando una nueva iteracion
    currentSimplexBoard.addIteration();

    //Leer descripcion de la funcion, para mas informacion
    currentSimplexBoard.pivoteRowsIndex =
      currentSimplexBoard.generateColumnOfMinimumQuotientAndGetIndexesPivoteRow();

    return currentSimplexBoard;
  }

  //==========================================================================
  //            PASO 2:  Aqui se obtiene la columna pivote o las             |
  //             ramificaciones con diferentes columnas pivote               |
  //==========================================================================

  if (currentSimplexBoard.pivoteElement === undefined) {
    if (Array.isArray(currentSimplexBoard.pivoteRowsIndex)) {
      const ramification: SimplexBoardBranches =
        currentSimplexBoard.pivoteRowsIndex.map((pivoteRowIndex) => {
          const simplexBoardBranch: SimplexBoardBranch = [
            currentSimplexBoard.useThisIndexPivotRowInTheNextSimplexBoard(
              pivoteRowIndex
            ),
          ];
          return simplexBoardBranch;
        });
      return ramification;
    } else {
      return currentSimplexBoard.useThisIndexPivotRowInTheNextSimplexBoard(
        currentSimplexBoard.pivoteRowsIndex
      );
    }
  }
  //===========================================================================
  //|  PASO 3: Dividir la fila pivote entre el elemento pivote para volverlo  |
  //|        1 e intecambiar nombre de  la misma por columna pivote           |
  //===========================================================================

  if(currentSimplexBoard.pivoteElement.value!==1){
    currentSimplexBoard.addFutureOperation(OtherFutureOperations.TRANFORM_PIVOT_ELEMENT_IN_ONE)
  }

  //===========================================================================
  //|               PASO 4: Volver 0 los demas elementos de                   |
  //|                           la columna pivote                             |
  //===========================================================================




  //ITERACION FINALIZADA
  //===========================================================================
  //|          PASO 5: Resetear propiedades a propiedades iniciales           |
  //===========================================================================


  return currentSimplexBoard;
}

//LA FORMA DE UN ARRAY DE BOARDS SERA ASI : [sB, sB, sB,[[sB],[sB, sB, sB]]]
export function allBranchesOptimized(
  simplexBoards: (SimplexBoard | SimplexBoardBranches)[]
): boolean {
  let isAllBranchesOptimized = true;

  function traverseBranches(
    sB:
      | (SimplexBoard | SimplexBoardBranches)[]
      | SimplexBoard
      | SimplexBoardBranches
  ) {
    if (Array.isArray(sB)) {
      //Comprobando si todos son Arrays, si es asi, sera un array de ramificaciones
      const allSubBoardsAreArrays = sB.every(
        (subSimplexBoard) => Array.isArray(subSimplexBoard)
        // && subSimplexBoard instanceof SimplexBoard
      );
      if (allSubBoardsAreArrays) {
        for (const simplexBoard of sB) {
          if (!isAllBranchesOptimized) return; // Detener recursión si ya se encontró una rama no optimizada
          traverseBranches(simplexBoard);
        }
      } else traverseBranches(sB[sB.length - 1]);
    } else {
      if (
        sB.getBasicVariablesWhoHasCoefficientMInZ() !== undefined ||
        sB.hasNegativeCoefficientsInZ()
      ) {
        isAllBranchesOptimized = false;
      }
    }
  }

  traverseBranches(simplexBoards);

  return isAllBranchesOptimized;
}

export function iterateAllBranches(
  simplexBranches: SimplexBoardBranches
): void {
  if (isSimplexBoardBranches(simplexBranches)) {
    const lastContainer: SimplexBoardBranches =
      simplexBranches as SimplexBoardBranches;

    lastContainer.forEach((branch) => {
      const [lastElement] = branch.slice(-1);

      //SubRama encontrada
      if (Array.isArray(lastElement)) iterateAllBranches(lastElement);
      else if (lastElement instanceof SimplexBoard)
        branch.push(iterateMethodBigM(lastElement) as SimplexBoard);
      else throw new Error(SimplexErrorCodes.BRANCH_NOT_VALID);
    });
  } else throw new Error(SimplexErrorCodes.BRANCH_NOT_VALID);
}

export function isSimplexBoardBranches(
  array: SimplexBoardBranch | SimplexBoardBranches
) {
  return array.every((element) => isSimplexBoardBranch(element));
}

export function isSimplexBoardBranch(
  array: SimplexBoardBranch | SimplexBoardBranches | SimplexBoard
) {
  if (!Array.isArray(array)) return false;

  const allAreBoardsExceptLast = array
    .slice(0, -1)
    .every((element) => element instanceof SimplexBoard);

  const [lastElement] = array.slice(-1);

  const lastAreBoardOrArray =
    //SubRama de una Rama
    Array.isArray(lastElement) || lastElement instanceof SimplexBoard;

  return allAreBoardsExceptLast && lastAreBoardOrArray;
}
