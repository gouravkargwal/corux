import React from "react";
import { Box } from "@mui/material";
import { styled, keyframes } from "@mui/system";

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
    background-color: #fc4642;
  }
  40% {
    transform: scale(1);
    background-color: #fc211d;
  }
`;

const Dot = styled(Box)(({ theme }) => ({
  width: 18,
  height: 18,
  margin: "0 5px",
  borderRadius: "50%",
  display: "inline-block",
  animation: `${bounce} 1.4s infinite ease-in-out both`,
}));

const Dot1 = styled(Dot)({
  animationDelay: "-0.32s",
});

const Dot2 = styled(Dot)({
  animationDelay: "-0.16s",
});

const CustomLoadingIndicator = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Dot1 />
      <Dot2 />
      <Dot />
    </Box>
  );
};

export default CustomLoadingIndicator;
