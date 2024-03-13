// worker.ts
import { SimplexErrorCodes } from "../../errors/Simplex/simplexErrorCodes";
import { InputSimplex } from "../../interfaces/Simplex";
import {
  assembleFirstSimplexBoard,
  assembleReformulation,
  iterateMethodBigM,
} from "../helpers/Simplex";
import { MessageForWorker } from "../utils/CustomEventWorker";
import { SimplexBoard } from "../utils/Simplex/Board";
import { WorkerOrders } from "./WorkerOrders";

self.addEventListener(
  "message",
  (e: MessageEvent<MessageForWorker<InputSimplex>>) => {
    let aborted = false;

    const { input: inputSimplex, nameChannel } = e.data;

    const channel = new BroadcastChannel(nameChannel);

    channel.addEventListener("message", (e: MessageEvent<string>) => {
      if (e.data === WorkerOrders.ABORT) {
        aborted = true;
        channel.close();
      }
    });

    const reformulation = assembleReformulation(inputSimplex);

    const firstBoard = assembleFirstSimplexBoard(reformulation!);

    const simplexBoards: SimplexBoard[] = [];
    let currentSimplexBoard: SimplexBoard | SimplexBoard[] = firstBoard!;

    try {
      if (!Array.isArray(currentSimplexBoard)) {
        while (currentSimplexBoard.hasNegativeCoefficientsInZ()) {
          simplexBoards.push(
            (currentSimplexBoard = iterateMethodBigM(
              currentSimplexBoard
            ) as SimplexBoard)
          );
        }
      } else {
        let newRamification: SimplexBoard[] = []; 
        
        currentSimplexBoard = currentSimplexBoard.map((simplexBoard) => {

          while (simplexBoard.hasNegativeCoefficientsInZ()) {
            simplexBoards.push(
              (currentSimplexBoard = iterateMethodBigM(
                simplexBoard
              ) as SimplexBoard)
            );
          }
        });

        simplexBoards.push(newRamification as SimplexBoard[]);
      }
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === SimplexErrorCodes.NOT_OPERABLE_OPERANDS)
          return self.postMessage(new Error(e.message));
      }
    }

    setTimeout(() => {
      if (!aborted) {
        //Debes comprobar siempre que esto este en false para poder hacer operaciones
        console.log("HOLA AMIGO ESTAMOS EMPEZANDO BIEN!", firstBoard);
      } else {
        console.log("Se cancelo");
      }
    }, 2000);

    console.log(boards);

    // const output: OutputSimplex = {
    //   boards: simplexBoards,
    //   optimalSolution,
    //   optimalValues,
    //   reformulation: reformulation!,
    // };

    // self.postMessage(output);
  }
);
