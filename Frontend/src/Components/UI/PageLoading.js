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

const Overlay = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
});

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

const PageLoading = () => {
  return (
    <Overlay>
      <Dot1 />
      <Dot2 />
      <Dot />
    </Overlay>
  );
};

export default PageLoading;
