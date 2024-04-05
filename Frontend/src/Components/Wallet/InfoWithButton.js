import React, { useEffect } from "react";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { blue, green, pink, purple } from "@mui/material/colors";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBalance,
  selectBalanceData,
  selectBalanceMobile,
  selectBalanceUsername,
} from "../../Feature/Balance/balanceSlice";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Call from "@mui/icons-material/Call";

const InfoWithButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mobile = useSelector(selectBalanceMobile);
  const username = useSelector(selectBalanceUsername);
  const balance = useSelector(selectBalanceData);
  useEffect(() => {
    dispatch(getBalance());
  }, [dispatch]);
  return (
    <Box
      sx={{ backgroundColor: "background.main", boxShadow: 0 }}
      margin={3}
      borderRadius={1}
      padding={2}
    >
      <Box display="flex" justifyContent="flex-start" gap={2}>
        <Avatar
          sx={{
            bgcolor: blue[100],
            width: 90,
            height: 90,
          }}
          variant="rounded"
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
            >
              <Call sx={{ color: "text.white", width: 16, height: 16 }} />
            </Avatar>
            <Typography color="text.grey" variant="body2">
              {mobile}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box mt={2} display="flex" justifyContent="space-between" gap={2}>
        <Button
          sx={{ bgcolor: blue[500] }}
          variant="contained"
          fullWidth
          onClick={() => {
            navigate("/home/recharge");
          }}
        >
          Recharge
        </Button>
        <Button
          sx={{ bgcolor: green[500] }}
          variant="contained"
          fullWidth
          onClick={() => {
            navigate("/home/withdraw");
          }}
        >
          Withdraw
        </Button>
      </Box>
    </Box>
  );
};

export default InfoWithButton;
