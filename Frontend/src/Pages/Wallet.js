import { Box, Tab, Tabs, Paper } from "@mui/material";
import React, { useState } from "react";
import InfoWithButton from "../Components/Wallet/InfoWithButton";
import RechargeHistory from "../Components/Wallet/RechargeHistory";
import WithdrawHistory from "../Components/Wallet/WithdrawHistory";

const Wallet = () => {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: 3,
      }}
    >
      <InfoWithButton />
      <Paper
        elevation={3}
        sx={{
          marginTop: 3,
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
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="wallet tabs"
          variant="fullWidth"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#fc211d",
            },
            "& .MuiTab-root.Mui-selected": {
              color: "#fc211d",
            },
            "& .MuiTab-root": {
              transition: "color 0.3s, background-color 0.3s",
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "1rem",
            },
          }}
        >
          <Tab label="Recharge History" />
          <Tab label="Withdraw History" />
        </Tabs>
        <Box sx={{ marginTop: 2 }}>
          {activeTab === 0 && <RechargeHistory />}
          {activeTab === 1 && <WithdrawHistory />}
        </Box>
      </Paper>
    </Box>
  );
};

export default Wallet;
