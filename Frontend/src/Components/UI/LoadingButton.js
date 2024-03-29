import React from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

function LoadingButton({ loading, ...props }) {
  return (
    <Button
      {...props}
      disabled={loading || props.disabled}
      startIcon={
        loading ? (
          <CircularProgress size={16} color="inherit" />
        ) : (
          <span style={{ width: 16, height: 16, display: "inline-block" }} />
        )
      }
    >
      {props.children}
    </Button>
  );
}

export default LoadingButton;
