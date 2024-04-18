import { IconProps } from "./Icon.interfaces";

const LupaIcon = ({ className, fillColor }: IconProps) => {
  return (
    <svg
      className={className}
      viewBox="0 0 37 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.7624 0.166996C8.96736 0.596996 6.11264 2.05422 4.08208 4.09672C-0.815142 8.982 -1.37653 16.8056 2.78014 22.3359C6.26791 26.9942 12.276 28.9889 17.866 27.3764C19.0246 27.0301 20.6012 26.3253 21.4254 25.7759L21.9749 25.4056L27.6604 31.0673C33.6087 37.0037 33.5968 37.0037 34.5882 37.0037C36.2485 37.0037 37.4429 35.2239 36.8099 33.6831C36.6785 33.3845 34.8629 31.4853 31.0049 27.6153L25.379 21.9895L25.7015 21.5237C26.2151 20.7712 26.8243 19.517 27.1946 18.3942C28.5801 14.2734 27.959 9.7345 25.5224 6.12728C22.5124 1.68394 17.0896 -0.669113 11.7624 0.166996ZM16.146 2.71116C19.801 3.46367 22.8468 5.87644 24.3996 9.22089C25.176 10.9289 25.3432 11.7412 25.3312 14.0106C25.3312 15.8739 25.3074 16.1248 24.9968 17.1042C23.8262 20.9503 20.8999 23.8767 17.0896 25.0114C15.5846 25.4534 13.2912 25.537 11.6668 25.2026C6.13652 24.0678 2.21875 19.0153 2.50541 13.4134C2.79208 8.06227 6.68597 3.61894 11.9415 2.66339C13.2076 2.43644 14.9037 2.44839 16.146 2.71116Z"
        fill={fillColor}
      />
    </svg>
  );
};

export default LupaIcon;