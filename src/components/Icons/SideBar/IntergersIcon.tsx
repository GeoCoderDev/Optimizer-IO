import { IconProps } from "../Icon.interface";

const IntergersIcon = ({ className, fillColor }: IconProps) => {
  return (
    <svg
      className={className}
      viewBox="0 0 55 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="12" height="51" rx="6" fill={fillColor} />
      <rect x="28" width="13" height="51" rx="6.5" fill={fillColor} />
      <rect x="14" y="15" width="12" height="36" rx="6" fill={fillColor} />
      <rect x="43" y="28" width="12" height="23" rx="6" fill={fillColor} />
    </svg>
  );
};

export default IntergersIcon;
