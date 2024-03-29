import React from "react";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { blue, green } from "@mui/material/colors";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const InfoWithButton = () => {
  const navigate = useNavigate();
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
            width: 72,
            height: 72,
          }}
          variant="rounded"
        >
          <AccountBalanceIcon sx={{ color: blue[500], fontSize: 40 }} />
        </Avatar>
        <Box>
          <Typography color="text.grey" variant="body2">
            Total Balance
          </Typography>
          <Typography color="text.blue" variant="h6">
            15151531351
          </Typography>
          <Typography color="text.grey" variant="body2">
            ID # 1231515135151
          </Typography>
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
        <Button sx={{ bgcolor: green[500] }} variant="contained" fullWidth onClick={() => {
            navigate("/home/withdraw");
          }}>
          Withdraw
        </Button>
      </Box>
    </Box>
  );
};

export default InfoWithButton;
