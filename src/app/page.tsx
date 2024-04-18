"use client";

import ButtonBackground from "@/components/BackgroundsSVG/ButtonBackground";
// import ClientComponent from "@/components/ClientComponent";

export default function Home() {
  return (
    <>
      <div className="w-full h-full -border-2 border-blue-500 flex flex-wrap justify-center items-center gap-x-12 gap-y-12">
        <div className="flex flex-col max-w-[27rem] max-md:items-center items-start justify-center gap-y-6">
          <h1 className="max-md:text-center text-3xl w-full font-semibold">
            Optimizer IO: La solución integral para problemas de optimización
          </h1>
          <p className="max-md:text-center ">
            Optimiza tus procesos, maximiza tus ganancias y ahorra tiempo
            valioso con Optimizer IO. Descubre el poder de la optimización al
            alcance de tus manos.
          </p>
          <button className="relative text-white font-semibold px-4 py-[0.33rem] rounded-[0.4rem] overflow-hidden -border-2">
            Comenzar Ahora
            <ButtonBackground className="absolute top-0 left-0 w-full h-full z-[-1]" />
          </button>
        </div>

        <img
          className="aspect-auto max-md:w-56 w-64 "
          src="/images/svg/FondoBarras.svg"
          alt="Fondo Barras"
        />
        {/* <ClientComponent /> */}
      </div>

      <style>{`
      
      `}</style>
    </>
  );
}
