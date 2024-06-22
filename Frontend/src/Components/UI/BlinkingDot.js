import React from "react";
import { Box } from "@mui/material";

const BlinkingDot = () => {
  return (
    <Box
      sx={{
        width: "5px",
        height: "5px",
        borderRadius: "50%",
        backgroundColor: "green",
        animation: "blinking 1s infinite", // Referencing the animation directly
        "@keyframes blinking": {
          "0%": { opacity: 0 },
          "50%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      }}
    />
  );
};

export default BlinkingDot;
