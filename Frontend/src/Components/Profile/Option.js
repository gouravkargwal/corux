import * as React from "react";
import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function Option({ name, icon, onClick }) {
  const handleClick = onClick ? (e) => onClick(e) : undefined;

  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      borderRadius={2}
      p={2}
      mb={2}
      bgcolor="rgba(255, 255, 255, 0.8)"
      boxShadow="0 4px 20px rgba(0, 0, 0, 0.1)"
      sx={{
        cursor: "pointer",
        transition: "all 0.3s",
        "&:hover": {
          backgroundColor: grey[200],
          transform: "translateY(-2px)",
          boxShadow: "0 6px 25px rgba(0, 0, 0, 0.2)",
        },
        "&:hover .MuiSvgIcon-root": {
          color: "#fc211d",
        },
        background: "rgba(255, 255, 255, 0.1)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(16px) saturate(180%)",
        "-webkit-backdrop-filter": "blur(16px) saturate(180%)",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: "12px",
        border: "1px solid rgba(209, 213, 219, 0.3)",
      }}
      onClick={handleClick}
    >
      {icon}
      <Box ml={2}>
        <Typography color="text.primary" variant="body1">
          {name}
        </Typography>
      </Box>
    </Box>
  );
}
