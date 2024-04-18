"use client";

import { AppDispatch, RootState } from "@/store";

import { useDispatch, useSelector } from "react-redux";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { setWindowWidth } from "@/state/ElementDimensions/windowWidthSlice";
import { setHeaderHeight } from "@/state/ElementDimensions/headerHeight";
import { setWindowHeight } from "@/state/ElementDimensions/windowHeightSlice";

import {
  setSidebarIsOpened,
  switchSidebarIsOpened,
} from "@/state/Flags/sidebarIsOpenedSlice";
import Link from "next/link";
import LupaIcon from "../Icons/LupaIcon";
import { setUsedKeyboard } from "@/state/Flags/usedKeyboard";

const Header = () => {
  const [inputOnFocus, setInputOnFocus] = useState(false);

  const windowWidth = useSelector(
    (state: RootState) => state.elementsDimensions.windowWidth
  );

  const usedKeyboard = useSelector(
    (state: RootState) => state.flags.usedKeyboard
  );

  const sidebarIsOpened = useSelector(
    (state: RootState) => state.flags.sidebarIsOpened
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleFocus = () => {
    setInputOnFocus(true);
  };
  const handleBlur = () => {
    setInputOnFocus(false);
  };

  const refInput = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    //Obteniendo el tamaño del header
    const header = document.getElementById("header");

    const reziseObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        dispatch(
          setHeaderHeight({
            value: parseFloat(getComputedStyle(entry.target).height),
          })
        );
      });
    });

    reziseObserver.observe(header!);

    //Determinando si se esta usando un teclado o no

    const userAgent = navigator.userAgent.toLowerCase();

    // Patrones para detectar dispositivos móviles
    const movil = /mobile|android|ipad|iphone|ipod/i.test(userAgent);

    // Si es un dispositivo móvil, se asume que no tiene teclado físico
    if (!movil) {
      dispatch(setUsedKeyboard({ value: true }));
    }

    //Obteniendo el ancho de la ventana interior
    dispatch(setWindowWidth({ value: window.innerWidth }));
    dispatch(setWindowHeight({ value: window.innerHeight }));

    if (window.innerWidth > 768) {
      dispatch(setSidebarIsOpened({ value: true }));
    }

    const handleResize = () => {
      dispatch(setWindowWidth({ value: window.innerWidth }));
      dispatch(setWindowHeight({ value: window.innerHeight }));
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);
    window.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        refInput.current.focus();
      }
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      reziseObserver.unobserve(header!);
    };
  }, []);

  return (
    <>
      <header
        id="header"
        className="w-full py-4 max-sm:pl-2 pl-4 max-sm:pr-4 pr-6 -border-2 -border-b-2  shadow-md max-sm:gap-x-2 gap-x-4 items-center sticky top-0 bg-white z-[100]"
      >
        <button
          title={
            sidebarIsOpened ? "Ocultar Barra Lateral" : "Mostrar Barra Lateral"
          }
          onClick={() => {
            dispatch(switchSidebarIsOpened(null));
          }}
          className="justify-self-start rounded-[50%] w-[3.15rem] px-1 py-1 -border-2 aspect-square flex flex-col items-center justify-center gap-y-2 active:bg-gray-200"
        >
          <div className="h-[0.25rem] w-[70%] bg-black rounded-full "></div>
          <div className="h-[0.25rem] w-[70%] bg-black rounded-full "></div>
          <div className="h-[0.25rem] w-[70%] bg-black rounded-full "></div>
        </button>

        <Link href={"/"}>
          <img
            src={
              windowWidth > 768
                ? "./images/svg/LogoConTexto.svg"
                : "./images/svg/Logo.svg"
            }
            className="aspect-auto h-[3.15rem]"
            alt="Logo Optimizer IO con Texto"
          />
        </Link>

        <div></div>

        <form
          id="search-form"
          className={`${
            inputOnFocus
              ? "outline-[1px] outline-[#00000070] [outline-style:solid]"
              : ""
          } aspect-auto py-[0.6rem] px-3 flex items-center justify-center max-xs:bg-transparent bg-[#CCCCCC] rounded-[0.5rem] gap-x-3 text-[0.9rem]`}
        >
          <LupaIcon
            className="aspect-auto max-xs:w-7 w-6 -border-2"
            fillColor={inputOnFocus ? "#000" : "#5B5B5B"}
          />
          <input
            ref={refInput}
            onBlur={handleBlur}
            onFocus={handleFocus}
            type="text"
            placeholder={
              windowWidth < 976
                ? windowWidth < 500
                  ? "Buscar"
                  : "Buscar Métodos"
                : "Prueba buscando “Método de la gran M”"
            }
            className={`text-black max-xs:hidden xs:w-[5rem] sm:w-[7rem] md:w-[13rem] lg:w-[23rem] xl:w-[26rem] border-black appearance-none outline-none bg-transparent placeholder:text-[#5B5B5B]`}
          />
          {usedKeyboard && (
            <span
              style={{ boxShadow: "0 2px 3px 2px #00000030" }}
              className="bg-white px-[0.3rem] py-[0.15rem] rounded-[0.2rem] text-[0.8rem] max-sm:hidden"
            >
              Ctrl + K
            </span>
          )}
        </form>
        <a href="#">
          <img
            className="w-10"
            src="./images/svg/HelpIcon.svg"
            alt="Icono de ayuda"
            title="Ayuda"
          />
        </a>
      </header>

      <style>
        {`
        #header{
          display: grid;
          grid-template-columns: max-content max-content auto max-content max-content;
          grid-template-rows: max-content;          
        }

        @media screen and (max-width:480px){
          #search-form{
            
          }

          #search-form input{
            
          }
        }



      `}
      </style>
    </>
  );
};

export default Header;
