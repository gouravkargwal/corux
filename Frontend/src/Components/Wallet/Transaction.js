import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { green, grey, orange, red } from "@mui/material/colors";
import PaymentsIcon from "@mui/icons-material/Payments";
import moment from "moment";

const Transaction = ({ type, amount, date, approved, denied }) => {
  const iconColor = grey[700];
  const hoverColor = "#fc211d";
  const formattedDateTime = moment(date).format("DD MMMM YYYY, h:mm A");

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderRadius={2}
      padding={2}
      sx={{
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      <Box display="flex" gap={2} alignItems="center">
        <Avatar
          sx={{
            bgcolor: "transparent",
            width: 48,
            height: 48,
            transition: "color 0.3s",
            "& .MuiSvgIcon-root": {
              color: iconColor,
              fontSize: 30,
            },
            "&:hover .MuiSvgIcon-root": {
              color: hoverColor,
            },
          }}
        >
          <PaymentsIcon />
        </Avatar>
        <Box>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "Ubuntu, sans-serif",
              fontWeight: 500,
            }}
          >
            UPI
          </Typography>
          <Typography
            color={grey[500]}
            variant="caption"
            sx={{
              fontFamily: "Ubuntu, sans-serif",
              fontWeight: 300,
            }}
          >
            {formattedDateTime}
          </Typography>
        </Box>
      </Box>
      <Box alignItems="flex-end" display="flex" flexDirection="column">
        <Typography
          variant="body2"
          color={
            approved
              ? type === "debit"
                ? red[500]
                : green[500]
              : denied
              ? red[700]
              : orange[700]
          }
        >
          ₹ {amount ?? "-"}
        </Typography>
        <Typography
          variant="caption"
          color={
            approved
              ? type === "debit"
                ? red[500]
                : green[500]
              : denied
              ? red[700]
              : orange[700]
          }
        >
          {approved ? "Successful" : denied ? "Denied" : "Processing"}
        </Typography>
      </Box>
    </Box>
  );
};

export default Transaction;
