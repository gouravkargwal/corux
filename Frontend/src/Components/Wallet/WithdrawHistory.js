import React, { useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import Transaction from "./Transaction";
import { useDispatch, useSelector } from "react-redux";
import {
  selectWalletWithdrawHistoryData,
  selectWalletWithdrawHistoryLoading,
  selectWalletWithdrawHistoryError,
  withdrawHistory,
} from "../../Feature/Wallet/walletSlice";
import CustomLoadingIndicator from "../UI/CustomLoadingIndicator";
import { grey } from "@mui/material/colors";

const WithdrawHistory = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectWalletWithdrawHistoryData);
  const isLoading = useSelector(selectWalletWithdrawHistoryLoading);
  const error = useSelector(selectWalletWithdrawHistoryError);

  useEffect(() => {
    dispatch(withdrawHistory());
  }, [dispatch]);

  if (isLoading || data === null) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CustomLoadingIndicator />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography
          color="error"
          variant="h6"
          align="center"
          gutterBottom
          sx={{
            fontFamily: "Ubuntu,sans-serif",
            fontWeight: 300,
          }}
        >
          Failed to load transactions: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {data.length > 0 ? (
        data.map((transaction, index) => (
          <Transaction
            key={index}
            type="credit"
            {...transaction}
            sx={{ mb: 2 }}
          />
        ))
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography
            variant="h6"
            align="center"
            gutterBottom
            color={grey[500]}
            sx={{
              fontFamily: "Ubuntu,sans-serif",
              fontWeight: 300,
            }}
          >
            No transactions found.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default WithdrawHistory;
