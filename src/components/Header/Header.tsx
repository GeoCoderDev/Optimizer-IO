"use client";

import { AppDispatch, RootState } from "@/store";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setWindowWidth } from "@/state/ElementsDimensions/windowWidthSlice";
import { setHeaderHeight } from "@/state/ElementsDimensions/headerHeight";
import { setWindowHeight } from "@/state/ElementsDimensions/windowHeightSlice";

import {
  setSidebarIsOpened,
  switchSidebarIsOpened,
} from "@/state/Flags/sidebarIsOpenedSlice";

const Header = () => {
  const windowWidth = useSelector((state: RootState) => state.windowWidth);

  const sidebarIsOpened = useSelector((state: RootState) => state.sidebarIsOpened); 

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
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
        title={sidebarIsOpened?"Ocultar Barra Lateral":"Mostrar Barra Lateral"}
          onClick={() => {
            dispatch(switchSidebarIsOpened(null));
          }}
          className="justify-self-start rounded-[50%] w-[3.15rem] px-1 py-1 -border-2 aspect-square flex flex-col items-center justify-center gap-y-2 active:bg-gray-200"
        >
          <div className="h-[0.25rem] w-[70%] bg-black rounded-full "></div>
          <div className="h-[0.25rem] w-[70%] bg-black rounded-full "></div>
          <div className="h-[0.25rem] w-[70%] bg-black rounded-full "></div>
        </button>

        <a href="#">
          <img
            src={
              windowWidth > 768
                ? "./images/svg/LogoConTexto.svg"
                : "./images/svg/Logo.svg"
            }
            className="aspect-auto h-[3.15rem]"
            alt="Logo Optimizer IO con Texto"
          />
        </a>

        <div></div>

        <div className="border-2 aspect-auto -w-[30rem] py-2">rhrhr</div>
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


      `}
      </style>
    </>
  );
};

export default Header;
