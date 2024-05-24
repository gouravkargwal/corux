import React, { useEffect } from "react";
import { Box, Paper, Typography } from "@mui/material";
import Transaction from "./Transaction";
import { useDispatch, useSelector } from "react-redux";
import {
  rechargeHistory,
  selectWalletRechargeHistoryData,
  selectWalletRechargeHistoryLoading,
  selectWalletRechargeHistoryError,
} from "../../Feature/Wallet/walletSlice";
import CustomLoadingIndicator from "../UI/CustomLoadingIndicator";

const RechargeHistory = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectWalletRechargeHistoryData);
  const isLoading = useSelector(selectWalletRechargeHistoryLoading);
  const error = useSelector(selectWalletRechargeHistoryError);

  useEffect(() => {
    dispatch(rechargeHistory());
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

export default RechargeHistory;
