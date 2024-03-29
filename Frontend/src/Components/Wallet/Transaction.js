import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { green, grey, red } from "@mui/material/colors";
import PaymentsIcon from "@mui/icons-material/Payments";

const Transaction = ({ type }) => {
  return (
    <Box display="flex" justifyContent="space-between">
      <Box display="flex" gap={1}>
        <Avatar
          sx={{
            bgcolor: "black",
            width: 48,
            height: 38,
          }}
          variant="rounded"
        >
          <PaymentsIcon sx={{ color: "white" }} />
        </Avatar>
        <Box>
          <Typography variant="body2">UPI</Typography>
          <Typography color={grey[500]} variant="caption">
            07 Oct 2023
          </Typography>
        </Box>
      </Box>
      <Box alignItems="flex-end" display="flex" flexDirection="column">
        <Typography
          variant="body2"
          color={type === "debit" ? red[500] : green[500]}
        >
          $ 300
        </Typography>
        <Typography
          variant="caption"
          color={type === "debit" ? red[500] : green[500]}
        >
          Successful
        </Typography>
      </Box>
    </Box>
  );
};

export default Transaction;
