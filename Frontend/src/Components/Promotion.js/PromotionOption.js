import React from "react";
import { Box, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const PromotionOption = ({ name, icon, onClick, count }) => {
  const handleClick = onClick ? (e) => onClick(e) : undefined;
  return (
    <Box
      onClick={handleClick}
      display="flex"
      justifyContent="space-between"
      gap={1}
      alignItems="center"
      sx={{
        cursor: "pointer",
        "&:hover svg": {
          transform: "scale(1.2)",
          transition: "transform 0.3s ease-in-out",
        },
        svg: {
          transition: "transform 0.3s ease-in-out",
        },
      }}
    >
      <Box
        display="flex"
        justifyContent="flex-start"
        gap={1}
        alignItems="center"
      >
        {icon}
        <Box>
          <Typography color="text.grey" variant="body2">
            {name}
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {count}
          </Typography>
        </Box>
      </Box>
      <KeyboardArrowRightIcon />
    </Box>
  );
};

export default PromotionOption;
