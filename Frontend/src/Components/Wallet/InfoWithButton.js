import React, { useEffect } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CardGiftcard from "@mui/icons-material/CardGiftcard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getBalance,
  selectBalanceData,
  selectBalanceUsername,
  selectBalanceWinning,
  selectPromotionalBalance,
} from "../../Feature/Balance/balanceSlice";
import customCapitalize from "../../Util/stringFunc";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

export default function InfoWithButton() {
  const bonus = useSelector(selectPromotionalBalance);
  const username = useSelector(selectBalanceUsername);
  const balance = useSelector(selectBalanceData);
  const winning = useSelector(selectBalanceWinning);
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
        padding: 1,
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
          <Box display="flex" alignItems="center" gap={2}>
            <AccountCircle sx={{ color: blueGrey[700], fontSize: 40 }} />
            <Typography color="text.primary" variant="h6">
              {customCapitalize(username)}
            </Typography>
          </Box>
          <Box width="100%">
            <Box display="flex" alignItems="center" gap={2}>
              <AccountBalanceIcon sx={iconStyles} />
              <Box>
                <Typography color={grey["500"]} variant="caption">
                  Deposit
                </Typography>
                <Typography color="text.primary" variant="body1">
                  {balance}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <EmojiEventsIcon sx={iconStyles} />
              <Box>
                <Typography color={grey["500"]} variant="caption">
                  Winning
                </Typography>
                <Typography color="text.primary" variant="body1">
                  {winning}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <CardGiftcard sx={iconStyles} />
              <Box>
                <Typography color={grey["500"]} variant="caption">
                  Promotional
                </Typography>
                <Typography color="text.primary" variant="body1">
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
