import React, { useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import Transaction from "./Transaction";
import { useDispatch, useSelector } from "react-redux";
import {
  selectWalletWithdrawHistoryData,
  selectWalletWithdrawHistoryLoading,
  selectWalletWithdrawHistoryError,
  withdrawHistory,
} from "../../Feature/Wallet/walletSlice";

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
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography color="error">
          Failed to load transactions: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {data.length > 0 ? (
        data.map((transaction, index) => (
          <Transaction key={transaction.index} type="credit" {...transaction} />
        ))
      ) : (
        <Typography>No transactions found.</Typography>
      )}
    </Box>
  );
};

export default WithdrawHistory;
