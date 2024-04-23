import { Box } from "@mui/material";
import React from "react";
import LOGO from "../../Assets/Images/Logo.webp";

const AuthLogo = () => {
  return (
    <Box
      sx={{
        m: 2,
        p: 1,
        width: 80,
        height: 80,
        borderRadius: 5,
        overflow: "hidden",
        backgroundImage: `url(${LOGO})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* No need for the img tag if using background image */}
    </Box>
  );
};

export default AuthLogo;
