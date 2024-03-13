import { useSelector } from "react-redux";
import "./index.css";
import { InputSimplex } from "./interfaces/Simplex";

import { RootState } from "./store";
import { useState } from "react";
import { WorkerOrders } from "./lib/workers/WorkerOrders";

const input: InputSimplex = {
  type: "maximization",
  numberOfVariables: 2,
  objetiveFunction: [8, 6],
  restrictions: [
    {
      coefficients: [2, 1],
      comparisonSign: ">=",
      independentTerm: 10,
    },
    {
      coefficients: [3, 8],
      comparisonSign: "<=",
      independentTerm: 96,
    },
  ],
};

const input2: InputSimplex = {
  type: "minimization",
  numberOfVariables: 2,
  objetiveFunction: [80, 90],
  restrictions: [
    {
      coefficients: [1, 1],
      comparisonSign: "=",
      independentTerm: 30,
    },
    {
      coefficients: [0.2, 0.35],
      comparisonSign: ">=",
      independentTerm: 9,
    },
    {
      coefficients: [0.06, 0.12],
      comparisonSign: "<=",
      independentTerm: 3,
    },
  ],
};

function App() {
  const simplexWorker = useSelector((state: RootState) => state.simplexEvent);

  const [channelAbort, setChannelAbort] = useState<BroadcastChannel | null>(
    null
  );

  return (
    <>
      <h1 className="font-sans text-blue-700">Hola mundo</h1>
      <button
        onClick={() => {
          const dataSimplex = simplexWorker.addOperation(input);
          setChannelAbort(dataSimplex.channel);
          simplexWorker.addOperation(input2);
        }}
      >
        RESOLVER
      </button>
      <button
        onClick={() => {
          if (channelAbort) channelAbort.postMessage(WorkerOrders.ABORT);
        }}
      >
        Cancelar
      </button>
    </>
  );
}

export default App;
