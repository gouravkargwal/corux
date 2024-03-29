import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const ErrorApi = ({ errorMessage }) => {
  if (!errorMessage) return null; // If there's no error, don't render anything

  return (
    <Stack sx={{ width: "100%", mt: 2 }} spacing={2}>
      <Alert severity="error">{errorMessage}</Alert>
    </Stack>
  );
};

export default ErrorApi;
