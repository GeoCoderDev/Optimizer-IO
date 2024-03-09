import { useSelector } from "react-redux";
import "./index.css";
import { InputSimplex } from "./interfaces/Simplex";

import { RootState } from "./store";
import { useState } from "react";

const input: InputSimplex = {
  type: "maximization",
  objetiveFunction: [300, 400],
  valueOf: undefined,
  restrictions: [
    {
      coefficients: [3, 3],
      comparisonSign: "less than or equal",
      independentTerm: 120,
    },
    {
      coefficients: [3, 6],
      comparisonSign: "less than or equal",
      independentTerm: 180,
    },
  ],
};

function App() {
  const simplexWorker = useSelector((state: RootState) => state.simplexEvent);

  const [channelAbort, setChannelAbort] = useState<BroadcastChannel|null>(null);

  return (
    <>
      <h1 className="font-sans text-blue-700">Hola mundo</h1>
      <button
        onClick={() => {
          const dataSimplex = simplexWorker.addOperation(input);
          setChannelAbort(dataSimplex.channel)
        }}
      >
        RESOLVER
      </button>
      <button
        onClick={() => {
          if(channelAbort) channelAbort.postMessage("abort");
        }}
      >
        Cancelar
      </button>
    </>
  );
}

export default App;
