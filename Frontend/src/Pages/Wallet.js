import { Box, Typography } from "@mui/material";
import React from "react";
import InfoWithButton from "../Components/Wallet/InfoWithButton";
import Transaction from "../Components/Wallet/Transaction";

const Wallet = () => {
  return (
    <Box>
      <InfoWithButton />
      <Typography marginLeft={3}>Recharge History</Typography>
      <Box
        sx={{ backgroundColor: "background.main", boxShadow: 0 }}
        margin={3}
        marginTop={1}
        borderRadius={1}
        padding={2}
        display="flex"
        flexDirection="column"
      >
        <Transaction />
      </Box>
    </Box>
  );
};

export default Wallet;
