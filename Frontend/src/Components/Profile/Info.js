import React, { useEffect } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { blue, green, purple } from "@mui/material/colors";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useDispatch, useSelector } from "react-redux";
import {
  getBalance,
  selectBalanceData,
  selectBalanceMobile,
  selectBalanceUsername,
} from "../../Feature/Balance/balanceSlice";
import Call from "@mui/icons-material/Call";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function Info() {
  const mobile = useSelector(selectBalanceMobile);
  const username = useSelector(selectBalanceUsername);
  const balance = useSelector(selectBalanceData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBalance());
  }, [dispatch]);

  return (
    <Box
      sx={{ backgroundColor: "background.main", boxShadow: 0 }}
      margin={3}
      borderRadius={1}
      padding={2}
      display="flex"
      justifyContent="flex-start"
      gap={2}
    >
      <Avatar
        sx={{
          bgcolor: blue[100],
          width: 90,
          height: 90,
        }}
        variant="rounded"
        whileHover={{ scale: 1.1 }}
      >
        <AccountBalanceIcon sx={{ color: blue[500], fontSize: 40 }} />
      </Avatar>
      <Box gap={1} display="flex" flexDirection="column">
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar
            sx={{
              bgcolor: blue[500],
              width: 24,
              height: 24,
            }}
            whileHover={{ scale: 1.2 }}
          >
            <AccountCircle
              sx={{ color: "text.white", width: 16, height: 16 }}
            />
          </Avatar>
          <Typography color="text.grey" variant="body2">
            {username}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar
            sx={{
              bgcolor: green[500],
              width: 24,
              height: 24,
            }}
            whileHover={{ scale: 1.2 }}
          >
            <CurrencyRupeeIcon
              sx={{ color: "text.white", width: 16, height: 16 }}
            />
          </Avatar>
          <Typography color="text.grey" variant="body2">
            {balance}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar
            sx={{
              bgcolor: purple[500],
              width: 24,
              height: 24,
            }}
            whileHover={{ scale: 1.2 }}
          >
            <Call sx={{ color: "text.white", width: 16, height: 16 }} />
          </Avatar>
          <Typography color="text.grey" variant="body2">
            {mobile}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
