import { CustomEvent } from "./CustomEvent";

export interface MessageForWorker<I> {
  id?: number;
  input: I;
  nameChannel: string
}

export interface MessageFromWorker<O> {
  id: number;
  output: O;
}

export class CustomEventWorker<I, O> {
  #workerOperationEvent = new CustomEvent<O>();

  constructor(private worker: Worker, private name: string) {
    this.worker.addEventListener(
      "message",
      (e: MessageEvent<MessageFromWorker<O>>) => {
        this.#workerOperationEvent.dispatchEvent(e.data.output, e.data.id);
      }
    );
  }

  addOperation(input: I) {
    
    let listenerOperationID: number | undefined;

    const promise = new Promise<O>((resolve) => {
      listenerOperationID = this.#workerOperationEvent.addListener((output) => {
        resolve(output);
      });
    });

    const nameChannel =`${this.name}-${listenerOperationID}`;
    const channel = new BroadcastChannel(nameChannel);


    const messageForWorker: MessageForWorker<I> = {
      id: listenerOperationID,      
      input,
      nameChannel
    };


    this.worker.postMessage(messageForWorker);
    return { promise, channel };
  }
}