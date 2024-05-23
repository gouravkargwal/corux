import React, { useEffect } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { blue, blueGrey, green } from "@mui/material/colors";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Call from "@mui/icons-material/Call";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getBalance,
  selectBalanceData,
  selectBalanceMobile,
  selectBalanceUsername,
} from "../../Feature/Balance/balanceSlice";
import customCapitalize from "../../Util/stringFunc";

const WaveSVG = () => (
  <svg
    viewBox="0 0 1440 320"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: -1,
    }}
  >
    <path
      fill="#e0f7fa"
      fillOpacity="1"
      d="M0,192L60,186.7C120,181,240,171,360,154.7C480,139,600,117,720,133.3C840,149,960,203,1080,208C1200,213,1320,171,1380,149.3L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
    ></path>
  </svg>
);

export default function InfoWithButton() {
  const mobile = useSelector(selectBalanceMobile);
  const username = useSelector(selectBalanceUsername);
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
          <Box
            mt={2}
            display="flex"
            justifyContent="space-between"
            gap={2}
            width="100%"
          >
            <Button
              sx={{
                bgcolor: blue[700],
                "&:hover": { bgcolor: blue[900] },
                flex: 1,
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
                bgcolor: green[700],
                "&:hover": { bgcolor: green[900] },
                flex: 1,
              }}
              variant="contained"
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
