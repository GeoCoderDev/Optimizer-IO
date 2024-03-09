// worker.ts
import { InputSimplex } from "../../interfaces/Simplex";
import { MessageForWorker } from "../utils/CustomEventWorker";

self.addEventListener(
  "message",
  (e: MessageEvent<MessageForWorker<InputSimplex>>) => {
    let aborted = false;

    const { input: inputSimplex, nameChannel } = e.data;

    const channel = new BroadcastChannel(nameChannel);

    channel.addEventListener("message", (e: MessageEvent<string>) => {
      console.log(nameChannel);
      if (e.data === "abort") aborted = true;
    });

    if (inputSimplex.type === "maximization") {
      setTimeout(() => {
        if (!aborted) {
          //Debes comprobar siempre que esto este en false para poder hacer operaciones
          console.log("HOLA AMIGO ESTAMOS EMPEZANDO BIEN!");
          channel.close()          
        } else {
          console.log("Se cancelo");
        }
      }, 5000);
    }

    if (inputSimplex.type === "minimization") {

    }

    if (inputSimplex.type === "valueOf") {
        
    }

    self.postMessage(new Error("Invalid-Type"));
  }
);
