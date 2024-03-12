import { useSelector } from "react-redux";
import "./index.css";
import { InputSimplex } from "./interfaces/Simplex";

import { RootState } from "./store";
import { useState } from "react";

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
        }}
      >
        RESOLVER
      </button>
      <button
        onClick={() => {
          if (channelAbort) channelAbort.postMessage("abort");
        }}
      >
        Cancelar
      </button>
    </>
  );
}

export default App;
