"use client";

import BigMMethodImage from "@/components/Icons/svg/linear-programming/BigMMethodImage";
import GraphicMethodImage from "@/components/Icons/svg/linear-programming/GraphicMethodImage";
import TwoPhasesImage from "@/components/Icons/svg/linear-programming/TwoPhasesImage";
import Link from "next/link";

const LinearProgramming = () => {
  return (
    <div className="w-full h-full flex flex-col flex-wrap items-center -border-2 gap-4">
      <h2 className="justify-self-start -border-2">Programación Lineal</h2>
      <h3 className="self-center">Métodos</h3>
      <div className="flex flex-wrap justify-center gap-8">
        <Link
          href={"/graphic-method"}
          as={"/linear-programming/graphic-method"}
        >
          <GraphicMethodImage
            className="w-[10rem] cursor-pointer"
            title="Método Grafico"
          />
        </Link>

        <Link href={"/big-m-method"} as={"/linear-programming/big-m-method"}>
          <BigMMethodImage
            className="w-[10rem] cursor-pointer"
            title="Método de la Gran M"
          />
        </Link>

        <Link href={"/two-phases"} as={"/linear-programming/two-phases"}>
          <TwoPhasesImage
            className="w-[10rem] cursor-pointer"
            title="Método de 2 Fáses"
          />
        </Link>
      </div>
      <h3 className="self-center">Problemas Comúnes</h3>
    </div>
  );
};

export default LinearProgramming;
