// worker.ts

import { SimplexErrorsCodes } from "../../errors/Simplex/simplexErrorCodes";
import { InputSimplex, OutputSimplex } from "../../interfaces/Simplex";
import {
  assembleFirstBoard,
  assembleReformulation,
  iterateMethodBigM,
} from "../helpers/Simplex";
import { MessageForWorker } from "../utils/CustomEventWorker";
import { Board } from "../utils/Simplex/Board";

self.addEventListener(
  "message",
  (e: MessageEvent<MessageForWorker<InputSimplex>>) => {
    let aborted = false;

    const { input: inputSimplex, nameChannel } = e.data;

    const channel = new BroadcastChannel(nameChannel);

    channel.addEventListener("message", (e: MessageEvent<string>) => {
      console.log(nameChannel);
      if (e.data === "abort") {
        aborted = true;
        channel.close();
      }
    });

    const reformulation = assembleReformulation(inputSimplex);

    const firstBoard = assembleFirstBoard(reformulation!);

    const boards: Board[] = [];
    let currentBoard: Board = firstBoard!;

    try {
      while (currentBoard.hasNegativeCoefficientsInZ())
        boards.push((currentBoard = iterateMethodBigM(currentBoard)));
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === SimplexErrorsCodes.NOT_OPERABLE_OPERANDS)
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
    //   boards,
    //   optimalSolution,
    //   optimalValues,
    //   reformulation: reformulation!,
    // };

    // self.postMessage(output);
  }
);
