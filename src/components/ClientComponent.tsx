"use client";

import { InputSimplex, OutputSimplex } from "@/interfaces/Simplex";
import { CustomEventWorker } from "@/lib/utils/CustomEventWorker";
import { WorkerOrders } from "@/lib/workers/WorkerOrders";
import React, { useState } from "react";

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

const ClientComponent = () => {
  const [currentChannelAbort, setCurrentChannelAbort] = useState<
    BroadcastChannel | undefined
  >();

  return (
    <>
      <h1 className="font-sans text-blue-700">Hola mundo</h1>
      <button
        onClick={() => {
          const currentCustomEventWorker = new CustomEventWorker<
            InputSimplex,
            OutputSimplex
          >(
            new Worker(new URL("../lib/workers/Simplex.ts", import.meta.url)),
            "Simplex"
          );

          // const dataSimplex = simplexWorker.addOperation(input);
          // setChannelAbort(dataSimplex.channel);
          console.log(currentCustomEventWorker);
          const dataSimplex2 = currentCustomEventWorker.addOperation(input2);
          setCurrentChannelAbort(dataSimplex2.channel);
          console.log(dataSimplex2);
          // console.log(
          //   operateBetweenCoefficientOfMethodBigM(
          //     "-",
          //     true,
          //     new MixedNumberWithTermM({
          //       coefficientTermM: new Fraction({
          //         numerator: 135,
          //         denominator: 4,
          //       }),
          //       independentTerm: -2250,
          //     }),
          //     new TermM(-39)
          //   )
          // );
        }}
      >
        RESOLVER
      </button>
      <button
        onClick={() => {
          currentChannelAbort?.postMessage(WorkerOrders.ABORT);
        }}
      >
        Cancelar
      </button>
    </>
  );
};

export default ClientComponent;
