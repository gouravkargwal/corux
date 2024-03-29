import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import { closeSnackbar } from "../../Feature/Snackbar/snackbarSlice";

const CustomSnackbar = () => {
  const { open, message, type } = useSelector((state) => state.snackbar);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeSnackbar());
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
