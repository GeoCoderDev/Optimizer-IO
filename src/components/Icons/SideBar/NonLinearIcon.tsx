import { IconProps } from "../Icon.interfaces";

const NonLinearIcon = ({ className, fillColor }: IconProps) => {
  return (
    <svg
      className={className}
      viewBox="0 0 54 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.31714 49.8738C4.31714 49.8738 10.629 16.8837 27 25.5C46 35.5 49.5534 1.25891 49.5534 1.25891"
        stroke={fillColor}
        strokeWidth="7"
      />
    </svg>
  );
};

export default NonLinearIcon;
