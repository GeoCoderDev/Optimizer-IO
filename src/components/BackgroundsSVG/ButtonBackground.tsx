const ButtonBackground = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      preserveAspectRatio="none"
      viewBox="0 0 314 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect className="w-full h-full" fill="url(#paint0_linear_45_715)" />
      <defs>
        <linearGradient
          id="paint0_linear_45_715"
          x1="-6.83365e-07"
          y1="60"
          x2="314"
          y2="-5.71882e-06"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#16A3EC" />
          <stop offset="1" stopColor="#22D0B5" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ButtonBackground;


