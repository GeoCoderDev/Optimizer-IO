"use client";
import Link from "next/link";
import { RouteApp } from "@/assets/Routes";
import BackgroundSideBarSelected from "./BackgroundSideBarSelected";
import { usePathname } from "next/navigation";

const SideBarElement = ({ IconTSX, route, text }: RouteApp) => {
  const pathName = usePathname();
  const isSelected = pathName === `/${route}`;

  return (
    <Link href={`/${route}`}>
      <li
        style={{ borderBottom: "1px solid #00000030" }}
        title={text}
        className={`relative bg-white flex items-center px-5 gap-x-4 w-full h-16 ${
          !isSelected ? "hover:bg-gray-200" : ""
        }`}
      >
        {isSelected && (
          <BackgroundSideBarSelected className="absolute w-full h-full top-0 left-0 z-[0]" />
        )}

        <IconTSX
          className="w-8 -border-2 z-[2]"
          fillColor={isSelected ? "white" : "black"}
        />
        <span
          className={`overflow-hidden z-[2] min-w-[12.5rem] max-w-[25rem] text-ellipsis text-nowrap ${
            isSelected && "text-white"
          }`}
        >
          {text}
        </span>
      </li>
    </Link>
  );
};

export default SideBarElement;
