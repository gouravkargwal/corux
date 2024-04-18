import { Box, Grid, Tab, Tabs } from "@mui/material";
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
    <Box>
      <InfoWithButton />
      <Grid item xs={4} margin={1} borderRadius={1} padding={2} height="40vh">
        <Grid item xs={12} my={1}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="simple tabs example"
            variant="fullWidth"
            visibleScrollbar={false}
          >
            <Tab label="Recharge" />
            <Tab label="Withdraw" />
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          {activeTab === 0 && <RechargeHistory />}
          {activeTab === 1 && <WithdrawHistory />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Wallet;
