import React from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

function LoadingButton({ loading, ...props }) {
  return (
    <>
      {loading ? (
        <Button
          {...props}
          disabled={loading || props.disabled}
          sx={{
            ...props.sx,
            padding: "10px 24px",
            margin: "16px 0",
            minWidth: "auto",
          }}
        >
          <CircularProgress size={16} color="inherit" />
        </Button>
      ) : (
        <Button
          {...props}
          disabled={loading || props.disabled}
          sx={{
            ...props.sx,
            padding: "10px 24px",
            margin: "16px 0",
            minWidth: "auto",
          }}
        >
          {props.children}
        </Button>
      )}
    </>
  );
}

export default LoadingButton;
