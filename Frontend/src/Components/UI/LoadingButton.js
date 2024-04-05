import React from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

function LoadingButton({ loading, ...props }) {
  return (
    <>
      {loading ? (
        <Button {...props} disabled={loading || props.disabled}>
          <CircularProgress size={16} color="inherit" />
        </Button>
      ) : (
        <Button {...props} disabled={loading || props.disabled}>
          {props.children}
        </Button>
      )}
    </>
  );
}

export default LoadingButton;
