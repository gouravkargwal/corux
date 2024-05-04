import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { green, grey, orange, red } from "@mui/material/colors";
import PaymentsIcon from "@mui/icons-material/Payments";
import moment from "moment";

const Transaction = ({ type, amount, date, approved, denied }) => {
  const formattedDate = moment(date).format("DD MMMM YYYY");
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      sx={{ backgroundColor: "background.main", boxShadow: 0 }}
      borderRadius={1}
      padding={2}
    >
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
            {formattedDate}
          </Typography>
        </Box>
      </Box>
      <Box alignItems="flex-end" display="flex" flexDirection="column">
        <Typography
          variant="body2"
          color={
            approved ? (type === "debit" ? red[500] : green[500]) : (denied ? red[700] : orange[700])
          }
        >
          ₹ {amount ?? "-"}
        </Typography>
        <Typography
          variant="caption"
          color={
            approved ? (type === "debit" ? red[500] : green[500]) : (denied ? red[700] : orange[700])
          }
        >
          {approved ? "Successful" : ( denied ? "Denied" : "Processing")}
        </Typography>
      </Box>
    </Box>
  );
};

export default Transaction;
