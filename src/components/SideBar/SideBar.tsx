"use client";

import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import allMyRoutes from "@/assets/Routes";
import SideBarElement from "./SideBarElement/SideBarElement";
import { switchSidebarIsOpened } from "@/state/Flags/sidebarIsOpenedSlice";

const SideBar = () => {
  const dispatch = useDispatch();

  const sidebarIsOpened = useSelector(
    (state: RootState) => state.flags.sidebarIsOpened
  );

  const headerHeight = useSelector(
    (state: RootState) => state.elementsDimensions.headerHeight
  );
  const windowHeight = useSelector(
    (state: RootState) => state.elementsDimensions.windowHeight
  );
  const windowWidth = useSelector(
    (state: RootState) => state.elementsDimensions.windowWidth
  );
  
  return (
    <>
      <nav
        id="sidebar"
        className={`sticky overflow-auto bg-white`}
        onClick={() => {
          if (windowWidth < 768) dispatch(switchSidebarIsOpened(null));
        }}
      >
        <ul id="sidebar-ul">
          {allMyRoutes.map((route, key) => (
            <SideBarElement key={key} {...route} />
          ))}
        </ul>
      </nav>
      <style>{`                

        @keyframes hide-sidebar {
          0%{
            display: block;
            transform: translateX(0%);
          }
          99%{
            display: block;
            transform: translateX(-100%);
          }

          100%{
            transform: translateX(-100%);
            display: none;
          }
        }

        #sidebar{
          width: max-content;
          max-width: 100vw;
          box-shadow: 1px 0 4px 2px #00000020;
          top:${headerHeight}px;                           
          height: ${windowHeight - headerHeight}px;
          max-height: ${windowHeight - headerHeight}px;      
          display: ${
            sidebarIsOpened ? "block" : "none"
          };                                 
        }

        #sidebar-ul{
          background-color: white;
          height: 100%;
          width: 100%;
        }

        @media screen and (max-width: 768px){
          #sidebar{
            width: 100vw;
            position: fixed;
            top: 0;
            min-height: 100dvh;
            left: 0;        
            background-color:${sidebarIsOpened ? "#00000080" : "transparent"};
            z-index: 102;
          }

          #sidebar-ul{
            background-color: white;
            height: 100%;
            width: max-content;
            max-width: 80%;
          }

        }

      `}</style>
    </>
  );
};

export default SideBar;
