import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import GroupIcon from "@mui/icons-material/Group";
import socket from "../../Util/socket";
import BlinkingDot from "../UI/BlinkingDot";

export default function OnlineUsers() {
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    socket.on("online_user", (data) => {
      console.log(data);
      setOnlineUsersCount(data);
    });
    return () => socket.disconnect();
  }, []);

  const iconStyles = {
    color: blueGrey[700],
    width: 15,
    height: 15,
  };

  return (
    <Box display="flex" alignItems="center" gap={0.5} ml={0.8}>
      <GroupIcon sx={iconStyles} />
      <Typography color={grey["500"]} variant="caption">
        Online
      </Typography>
      <BlinkingDot />
      <Typography color="text.primary" variant="caption">
        {onlineUsersCount}
      </Typography>
    </Box>
  );
}
