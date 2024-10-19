import { TextField } from "@mui/material";
import React from "react";

const AuthTextField = ({ inputRef, ...props }) => {
  return (
    <TextField
      {...props}
      ref={inputRef}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            border: "none",
          },
          "&:hover fieldset": {
            border: "none",
          },
          "&.Mui-focused fieldset": {
            border: "none",
          },
        },
        backgroundColor: "white",
        borderRadius: 2,
      }}
      variant="outlined"
    />
  );
};

export default AuthTextField;
