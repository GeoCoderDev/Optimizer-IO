"use client";

import { ReactNode } from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

const WrapperMainContent = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const headerHeight = useSelector(
    (state: RootState) => state.elementsDimensions.headerHeight
  );
  const windowHeight = useSelector(
    (state: RootState) => state.elementsDimensions.windowHeight
  );

  return (
    <>
      <style>{`
        
          #main-content{            
            height: ${windowHeight - headerHeight}px;
            min-height: ${windowHeight - headerHeight}px;
          }
        
        `}</style>
      <div
        id="main-content"
        className=" w-full flex items-center justify-center p-4"
      >
        {children}
      </div>
    </>
  );
};

export default WrapperMainContent;
