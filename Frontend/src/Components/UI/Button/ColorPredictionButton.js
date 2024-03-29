import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const VioletButton = styled(Button)(({ theme }) => ({
  color: theme.palette.button.violet,
  backgroundColor: theme.palette.background.violet,
}));

export const RedButton = styled(Button)(({ theme }) => ({
  color: theme.palette.button.red,
  backgroundColor: theme.palette.background.red,
}));

export const GreenButton = styled(Button)(({ theme }) => ({
  color: theme.palette.button.green,
  backgroundColor: theme.palette.background.green,
}));
