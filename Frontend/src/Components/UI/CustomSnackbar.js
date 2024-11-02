import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import { closeSnackbar } from "../../Feature/Snackbar/snackbarSlice";
import { styled } from "@mui/system";

const StyledAlert = styled(Alert)(({ theme, severity }) => ({
  borderRadius: "8px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  padding: "16px",
  display: "flex",
  alignItems: "center",
  "& .MuiAlert-icon": {
    color:
      severity === "success"
        ? "#2e7d32"
        : severity === "info"
        ? "#1976d2"
        : severity === "warning"
        ? "#ffa000"
        : severity === "error"
        ? "#d32f2f"
        : "inherit",
    fontSize: "24px",
    marginRight: "12px",
  },
  "& .MuiAlert-message": {
    fontWeight: "bold",
  },
}));

const CustomSnackbar = () => {
  const { open, message, type } = useSelector((state) => state.snackbar);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeSnackbar());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <StyledAlert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </StyledAlert>
    </Snackbar>
  );
};

export default CustomSnackbar;
