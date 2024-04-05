import * as React from "react";
import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function Option({ name, icon, onClick }) {
  const handleClick = onClick ? (e) => onClick(e) : undefined;
  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      gap={1}
      alignItems="center"
      border={1}
      borderRadius={5}
      p={1}
      borderColor={grey[300]}
      sx={{
        cursor: "pointer",
        transition: "border-color 0.3s",
        "&:hover": {
          borderColor: grey[700],
        },
      }}
      onClick={handleClick}
    >
      {icon}
      <Box>
        <Typography color="text.grey" variant="body2">
          {name}
        </Typography>
      </Box>
    </Box>
  );
}
