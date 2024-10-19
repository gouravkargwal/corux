import React from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

function AuthButton({ loading, ...props }) {
  return (
    <>
      {loading ? (
        <Button
          {...props}
          variant="contained"
          disabled={loading || props.disabled}
          sx={{
            backgroundColor: "#fc4642",
            color: "white",
            padding: "10px 15px",
            borderRadius: "20px",
            boxShadow: "0 3px 5px 2px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              backgroundColor: "#fc211d",
              boxShadow: "0 5px 8px 2px rgba(0, 0, 0, 0.15)",
            },
            textTransform: "none",
            fontSize: "16px",
          }}
        >
          <CircularProgress size={16} color="inherit" />
        </Button>
      ) : (
        <Button
          {...props}
          disabled={loading || props.disabled}
          variant="contained"
          sx={{
            backgroundColor: "#fc4642",
            color: "white",
            padding: "10px 15px",
            borderRadius: "20px",
            boxShadow: "0 3px 5px 2px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              backgroundColor: "#fc211d",
              boxShadow: "0 5px 8px 2px rgba(0, 0, 0, 0.15)",
            },
            textTransform: "none",
            fontSize: "16px",
          }}
        >
          {props.children}
        </Button>
      )}
    </>
  );
}

export default AuthButton;
