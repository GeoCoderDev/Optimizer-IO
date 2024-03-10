// worker.ts

import { InputSimplex } from "../../interfaces/Simplex";
import { assembleFirstBoard } from "../helpers/Simplex";
import { MessageForWorker } from "../utils/CustomEventWorker";

self.addEventListener(
  "message",
  (e: MessageEvent<MessageForWorker<InputSimplex>>) => {
    let aborted = false;

    const { input: inputSimplex, nameChannel } = e.data;

    const { numberOfVariables, objetiveFunction, restrictions, valueOf } =
      inputSimplex;

    const channel = new BroadcastChannel(nameChannel);

    channel.addEventListener("message", (e: MessageEvent<string>) => {
      console.log(nameChannel);
      if (e.data === "abort") {
        aborted = true;
        channel.close();
      }
    });

    if (inputSimplex.type === "maximization") {

      const firstBoard = assembleFirstBoard({
        numberOfVariables,
        objetiveFunction,
        restrictions,
      });

      setTimeout(() => {
        if (!aborted) {
          //Debes comprobar siempre que esto este en false para poder hacer operaciones
          console.log(
            "HOLA AMIGO ESTAMOS EMPEZANDO BIEN!",
            firstBoard
          );
        } else {
          console.log("Se cancelo");
        }
      }, 2000);
    }

    if (inputSimplex.type === "minimization") {
    }

    if (inputSimplex.type === "valueOf") {
    }

    self.postMessage(new Error("Invalid-Type"));
  }
);
