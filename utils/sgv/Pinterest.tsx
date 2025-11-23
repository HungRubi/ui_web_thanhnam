import React from "react";

interface CustomIconProps {
  size?: number | string;
  color?: string;
  className?: string;
}

const PinterestIcon: React.FC<CustomIconProps> = ({
  size = 32,
  color = "#fff",
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 102 128"
    >
      <path
        transform="translate(0,128) scale(0.1,-0.1)"
        fill={color}
        stroke="none"
        d="
          M386 1264
          c-232 -56 -395 -275 -371 -500
          12 -116 71 -198 157 -219
          24 -6 28 -3 39 33
          11 37 9 45 -20 104
          -39 81 -42 158 -9 245
          27 73 109 158 193 199
          54 26 70 29 155 29
          84 0 101 -3 146 -27
          131 -69 183 -220 139 -406
          -40 -167 -135 -257 -253 -239
          -88 14 -102 84 -50 256
          40 136 42 191 7 227
          -36 35 -94 42 -137 14
          -67 -42 -102 -176 -71 -279
          9 -31 4 -61 -37 -221
          -42 -167 -47 -199 -51 -332
          -4 -100 -2 -148 5 -148
          19 0 83 84 114 149
          17 35 42 112 57 171
          l26 108 59 -36
          c56 -35 64 -37 145 -37
          105 1 161 24 237 100
          128 128 180 381 114 557
          -26 70 -97 150 -172 195
          -108 66 -287 90 -422 57
        "
      />
    </svg>
  );
};

export default PinterestIcon;
