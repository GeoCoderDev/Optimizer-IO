import AboutUsIcon from "@/components/Icons/AboutUsIcon";
import DinamicIcon from "@/components/Icons/DinamicIcon";
import HomeIcon from "@/components/Icons/HomeIcon";
import { IconProps } from "@/components/Icons/Icon.interfaces";
import IntergersIcon from "@/components/Icons/IntergersIcon";
import LineIcon from "@/components/Icons/LineIcon";
import NonLinearIcon from "@/components/Icons/NonLinearIcon";
import TheoryIcon from "@/components/Icons/TheoryIcon";
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
