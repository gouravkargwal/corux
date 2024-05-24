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
    <Box
      sx={{
        padding: 3,
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 800,
          padding: 3,
          background: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: "16px",
          border: "1px solid rgba(209, 213, 219, 0.3)",
        }}
      >
        {data.length > 0 ? (
          data.map((transaction, index) => (
            <Transaction
              key={transaction.index}
              type="credit"
              {...transaction}
            />
          ))
        ) : (
          <Typography>No transactions found.</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default RechargeHistory;
