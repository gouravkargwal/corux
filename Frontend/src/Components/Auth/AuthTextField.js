import { TextField } from "@mui/material";
import React from "react";

const AuthTextField = (props) => {
  return (
    <TextField
      {...props}
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
