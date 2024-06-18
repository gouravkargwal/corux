import React, { useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CardGiftcard from "@mui/icons-material/CardGiftcard";
import { useDispatch, useSelector } from "react-redux";
import {
  getBalance,
  selectBalanceData,
  selectBalanceUsername,
  selectPromotionalBalance,
} from "../../Feature/Balance/balanceSlice";
import customCapitalize from "../../Util/stringFunc";

export default function Info() {
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
              <CardGiftcard sx={iconStyles} />
              <Typography color="text.primary" variant="body1">
                {bonus}
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* <Box
          component="svg"
          sx={{
            position: "absolute",
            bottom: -8,
            left: 0,
            width: "100%",
            height: "100px",
            zIndex: 0, // Ensure wave is below the content
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#2196f3"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,245.3C960,245,1056,235,1152,213.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          >
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="
                M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,245.3C960,245,1056,235,1152,213.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,224L48,240C96,256,192,288,288,288C384,288,480,256,576,234.7C672,213,768,203,864,202.7C960,203,1056,213,1152,218.7C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,224L48,234.7C96,245,192,267,288,272C384,277,480,267,576,234.7C672,203,768,149,864,133.3C960,117,1056,139,1152,165.3C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,245.3C960,245,1056,235,1152,213.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </path>
        </Box> */}
      </Paper>
    </Box>
  );
}
