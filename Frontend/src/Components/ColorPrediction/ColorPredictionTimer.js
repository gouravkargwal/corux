import { Box } from "@mui/material";
import React, { useCallback } from "react";
import theme from "../../Theme/theme";
import TimerIcon from "@mui/icons-material/Timer";

const ColorPredictionTimer = ({ timer }) => {
  const formatTime = useCallback((time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }, []);

  return (
    <Box
      display={"flex"}
      gap={2}
      alignItems={"center"}
      color={theme.palette.text.blue}
      justifyContent="flex-end"
      
    >
      <TimerIcon />
      {formatTime(timer)}
    </Box>
  );
};

export default ColorPredictionTimer;
