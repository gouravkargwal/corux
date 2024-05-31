import React, { useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Call from "@mui/icons-material/Call";
import { useDispatch, useSelector } from "react-redux";
import {
  getBalance,
  selectBalanceData,
  selectBalanceMobile,
  selectBalanceUsername,
  selectPromotionalBalance,
} from "../../Feature/Balance/balanceSlice";
import customCapitalize from "../../Util/stringFunc";
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

export default function Info() {
  const mobile = useSelector(selectBalanceMobile);
  const username = useSelector(selectBalanceUsername);
  const balance = useSelector(selectBalanceData);
  const bonus = useSelector(selectPromotionalBalance);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBalance());
  }, [dispatch]);

  const iconStyles = {
    color: blueGrey[700],
    width: 20,
    height: 20,
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: 3,
        position: "relative",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          background: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: "16px",
          maxWidth: "500px",
          width: "100%",
          border: "1px solid rgba(209, 213, 219, 0.3)",
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <AccountCircle sx={{ color: blueGrey[700], fontSize: 40 }} />
            <Typography color="text.primary" variant="h6">
              {customCapitalize(username)}
            </Typography>
          </Box>
          <Box width="100%">
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <CurrencyRupeeIcon sx={iconStyles} />
              <Typography color="text.primary" variant="body1">
                {balance}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <Call sx={iconStyles} />
              <Typography color="text.primary" variant="body1">
                {mobile}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
