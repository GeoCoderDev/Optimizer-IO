import "./index.css";

import AWorker from "./lib/workers/Solver.ts?worker";

const myWorker = new AWorker();

myWorker.postMessage("Hola Estimado");

function App() {
  return (
    <>
      <h1 className="font-sans text-blue-700">Hola mundo</h1>
    </>
  );
}

export default App;
