import { IconProps } from "../Icon.interfaces";

const LineIcon = ({ className, fillColor }: IconProps) => {
  return (
    <svg
      className={`${className}`}
      viewBox="0 0 54 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_41_56)">
        <path
          d="M51.9873 7.60486C52.9676 6.69689 52.6113 4.72025 51.1915 3.1899C49.7718 1.65954 47.8262 1.155 46.846 2.06297L1.58056 43.9914C0.600327 44.8993 0.956628 46.876 2.37638 48.4064C3.79613 49.9367 5.74169 50.4412 6.72193 49.5333L51.9873 7.60486Z"
          fill={fillColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_41_56">
          <rect width="54" height="51" fill="transparent" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default LineIcon;
