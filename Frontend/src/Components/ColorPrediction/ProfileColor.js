import React, { useEffect } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CardGiftcard from "@mui/icons-material/CardGiftcard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getBalance,
  selectBalanceData,
  selectBalanceWinning,
  selectPromotionalBalance,
} from "../../Feature/Balance/balanceSlice";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

export default function ProfileColor() {
  const bonus = useSelector(selectPromotionalBalance);
  const winning = useSelector(selectBalanceWinning);
  const balance = useSelector(selectBalanceData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        paddingY: 1,
        paddingX: 3,
        position: "relative",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          paddingX: 4,
          paddingY: 2,
          background: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: "16px",
          maxWidth: "500px",
          width: "100%",
          border: "1px solid rgba(209, 213, 219, 0.3)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          zIndex={1}
        >
          <Box width="100%" display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <AccountBalanceIcon sx={iconStyles} />
              <Box display="flex" flexDirection="column" ml={1}>
                <Typography color={grey["500"]} variant="caption">
                  Deposit
                </Typography>
                <Typography color="text.primary" variant="caption">
                  {balance}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              <EmojiEventsIcon sx={iconStyles} />
              <Box display="flex" flexDirection="column" ml={1}>
                <Typography color={grey["500"]} variant="caption">
                  Winnings
                </Typography>
                <Typography color="text.primary" variant="caption">
                  {winning}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              <CardGiftcard sx={iconStyles} />
              <Box display="flex" flexDirection="column" ml={1}>
                <Typography color={grey["500"]} variant="caption">
                  Promotional
                </Typography>
                <Typography color="text.primary" variant="caption">
                  {bonus}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            gap={2}
            width="100%"
          >
            <Button
              sx={{
                backgroundColor: "#fc4642",
                color: "white",
                boxShadow: "0 3px 5px 2px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  backgroundColor: "#fc211d",
                  boxShadow: "0 5px 8px 2px rgba(0, 0, 0, 0.15)",
                },
                flex: 1,
                zIndex: 100,
              }}
              variant="contained"
              onClick={() => {
                navigate("/profile/recharge");
              }}
            >
              Recharge
            </Button>
            <Button
              sx={{
                flex: 1,
                zIndex: 100,
                boxShadow: "0 3px 5px 2px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  boxShadow: "0 5px 8px 2px rgba(0, 0, 0, 0.15)",
                },
              }}
              color="secondary"
              variant="outlined"
              onClick={() => {
                navigate("/profile/withdraw");
              }}
            >
              Withdraw
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
