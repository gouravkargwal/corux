import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const PromotionOption = ({ name, icon, onClick, count }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClick = onClick ? (e) => onClick(e) : undefined;

  return (
    <Box
      onClick={handleClick}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        cursor: onClick ? "pointer" : "default",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: onClick ? "scale(1.02)" : "none",
        },
        "&:hover svg": {
          transform: isMobile ? "none" : "translateX(4px)",
        },
        svg: {
          transition: "transform 0.3s ease-in-out",
        },
      }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        {icon}
        <Box>
          <Typography color="text.secondary" variant="body2">
            {name}
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            {count}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PromotionOption;
