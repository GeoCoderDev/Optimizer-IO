import { IconProps } from "@/components/Icons/Icon.interface";
import AboutUsIcon from "@/components/Icons/SideBar/AboutUsIcon";
import DinamicIcon from "@/components/Icons/SideBar/DinamicIcon";
import HomeIcon from "@/components/Icons/SideBar/HomeIcon";
import IntergersIcon from "@/components/Icons/SideBar/IntergersIcon";
import LineIcon from "@/components/Icons/SideBar/LineIcon";
import NonLinearIcon from "@/components/Icons/SideBar/NonLinearIcon";
import TheoryIcon from "@/components/Icons/SideBar/TheoryIcon";
import { ReactElement } from "react";

export interface RouteApp {
  route: string;
  text: string;
  IconTSX: (props: IconProps) => ReactElement;
}

const routesApp: RouteApp[] = [
  {
    route: "",
    text: "Inicio",
    IconTSX: (props: IconProps) => {
      return <HomeIcon {...props} />;
    },
  },
  {
    route: "linear-programming",
    text: "Programación Lineal",
    IconTSX: (props: IconProps) => {
      return <LineIcon {...props} />;
    },
  },
  {
    route: "non-linear-programming",
    text: "Programación no Lineal",
    IconTSX: (props: IconProps) => {
      return <NonLinearIcon {...props} />;
    },
  },
  {
    route: "integer-programming",
    text: "Programación Entera",
    IconTSX: (props: IconProps) => {
      return <IntergersIcon {...props} />;
    },
  },
  {
    route: "dinamic-programming",
    text: "Programación Dinamica",
    IconTSX: (props: IconProps) => {
      return <DinamicIcon {...props} />;
    },
  },
  {
    route: "theory",
    text: "Teoría",
    IconTSX: (props: IconProps) => {
      return <TheoryIcon {...props} />;
    },
  },
  {
    route: "about-us",
    text: "Sobre Nosotros",
    IconTSX: (props: IconProps) => {
      return <AboutUsIcon {...props} />;
    },
  },
];

export default routesApp;
