import React from "react";

const CredIcon = () => (
  <svg
    fill="none"
    height="32"
    viewBox="0 0 220 170" // Ensure the viewBox fits the actual content
    width="32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" strokeLinejoin="round" strokeWidth="12">
      <path d="M34 22V139l62 31 62-31V22z" stroke="#FFF" />
      <path
        d="M110 69.686H58v57.314l38 19 38-19v-39m0-12V40h-82"
        stroke="#FFF" // Changed to white
      />
      <path d="M82 88v27l14 7 14-7" stroke="#FFF" />
    </g>
  </svg>
);

export default CredIcon;
