import React from "react";

const BackgroundSideBarSelected = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 527 149"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <rect width="527" height="149" fill="url(#paint0_linear_44_244)" />
      <defs>
        <linearGradient
          id="paint0_linear_44_244"
          x1="0"
          y1="0"
          x2="527"
          y2="149"
          gradientUnits="userSpaceOnUse"          
        >
          <stop stop-color="#16A3EC" />
          <stop offset="1" stop-color="#22D0B5" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default BackgroundSideBarSelected;
