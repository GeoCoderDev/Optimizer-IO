"use client";

import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import allMyRoutes from "@/assets/Routes";
import SideBarElement from "./SideBarElement/SideBarElement";
import { switchSidebarIsOpened } from "@/state/Flags/sidebarIsOpenedSlice";

const SideBar = () => {
  const dispatch = useDispatch();

  const sidebarIsOpened = useSelector(
    (state: RootState) => state.sidebarIsOpened
  );

  const headerHeight = useSelector((state: RootState) => state.headerHeight);
  const windowHeight = useSelector((state: RootState) => state.windowHeight);

  return (
    <>
      <nav
        id="sidebar"
        className="sticky overflow-auto bg-white"
        onClick={() => {
          if (window.innerWidth < 768) dispatch(switchSidebarIsOpened(null));
        }}
      >
        <ul id="sidebar-ul">
          {allMyRoutes.map((route, key) => (
            <SideBarElement key={key} {...route} />
          ))}
        </ul>
      </nav>
      <style>{`

        #sidebar{
          transition: all 0.2s;
          width: max-content;
          box-shadow: 1px 0 4px 2px #00000020;
          top:${headerHeight}px;                 
          height: ${
            windowHeight
              ? windowHeight - headerHeight
              : window.innerHeight - headerHeight
          }px;
          max-height: ${
            windowHeight
              ? windowHeight - headerHeight
              : window.innerHeight - headerHeight
          }px;
          display: ${sidebarIsOpened ? "block" : "none"};                      
        }

        #sidebar-ul{
          transition: all 0.2s;
          background-color: white;
          height: 100%;
          width: 100%;
          transform: ${
            sidebarIsOpened ? "translateX(0%)" : "translateX(-100%)"
          };
        }

        @media screen and (max-width: 768px){
          #sidebar{
            width: 100vw;
            position: absolute;
            top: -${headerHeight}px;
            min-height: 100dvh;
            left: 0;        
            background-color:${sidebarIsOpened ? "#00000050" : "transparent"};
            z-index: 102;
          }

          #sidebar-ul{
            background-color: white;
            height: 100%;
            width: max-content;
          }

        }

      `}</style>
    </>
  );
};

export default SideBar;
