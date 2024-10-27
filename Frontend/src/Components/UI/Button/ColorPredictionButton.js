import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const VioletButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#9b59b6",
  color: "white",
  "&:hover": {
    background: "#8e44ad",
  },
}));

export const RedButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#ff4c4c",
  color: "white",
  "&:hover": {
    backgroundColor: "#e04343", // Darker red on hover
  },
}));

export const GreenButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#28a745",
  color: "white",
  "&:hover": {
    backgroundColor: "#218838", // Darker green on hover
  },
}));
