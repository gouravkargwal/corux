import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Divider,
  Button,
  Grid,
  Tabs,
  Tab,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { deepPurple, blue, orange } from "@mui/material/colors";
import InfoWithButton from "../Components/Wallet/InfoWithButton";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PromotionOption from "../Components/Promotion.js/PromotionOption";
import RedeemIcon from "@mui/icons-material/Redeem";
import { useDispatch, useSelector } from "react-redux";
import { selectBalanceReferCode } from "../Feature/Balance/balanceSlice";
import { getReferDetails, selectReferData } from "../Feature/Refer/referSlice";
import Level2Table from "../Components/Promotion.js/Level2Table";
import Level1Table from "../Components/Promotion.js/Level1Table";

export default function Promotion() {
  const dispatch = useDispatch();
  const referCode = useSelector(selectBalanceReferCode);
  const data = useSelector(selectReferData);
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const handleCopy = async (data) => {
    try {
      await navigator.clipboard.writeText(data);
      alert("Code copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  useEffect(() => {
    dispatch(getReferDetails());
  }, [dispatch]);

  return (
    <Box>
      <Box borderColor="red">
        <InfoWithButton />
      </Box>
      <Box
        sx={{ backgroundColor: "background.main", boxShadow: 0 }}
        margin={3}
        borderRadius={1}
        padding={2}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
      >
        <PromotionOption
          name="Refer Bonus"
          count={data?.total_winning}
          icon={
            <Avatar
              sx={{
                bgcolor: orange[500],
                borderRadius: "5px",
              }}
            >
              <RedeemIcon sx={{ color: "text.white" }} />
            </Avatar>
          }
        />
      </Box>
      <Box
        sx={{ backgroundColor: "background.main", boxShadow: 0 }}
        margin={3}
        borderRadius={1}
        padding={2}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
      >
        <PromotionOption
          name="Total Referals"
          count={data?.refer_count}
          icon={
            <Avatar sx={{ bgcolor: deepPurple[500], borderRadius: "5px" }}>
              <AccountCircleIcon sx={{ color: "text.white" }} />
            </Avatar>
          }
        />
      </Box>
      <Box
        sx={{ backgroundColor: "background.main", boxShadow: 0 }}
        margin={3}
        borderRadius={1}
        padding={2}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        gap={2}
      >
        <Box display="flex" justifyContent="flex-start" gap={2}>
          <Avatar
            sx={{
              bgcolor: blue[100],
              width: 72,
              height: 72,
            }}
            variant="rounded"
          >
            <PersonAddIcon sx={{ color: blue[500], fontSize: 40 }} />
          </Avatar>
          <Box gap={1} display="flex" flexDirection="column">
            <Typography variant="body2" fontWeight="600">
              Refer Friends
            </Typography>
            <Typography color="text.grey" variant="body2">
              <Button
                variant="outlined"
                startIcon={<ContentCopyIcon />}
                onClick={() =>
                  handleCopy(
                    `${process.env.REACT_APP_URL}/auth/register/${referCode}`
                  )
                }
              >
                Copy Link
              </Button>
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box>
          <Typography color="text.grey" variant="body2">
            Your Referral Code
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5" fontWeight="bold">
              {referCode ?? "-"}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<ContentCopyIcon />}
              onClick={() => handleCopy(referCode)}
            >
              Copy Code
            </Button>
          </Box>
        </Box>
      </Box>
      <Grid item xs={4} margin={1} borderRadius={1} padding={2} height="40vh">
        <Grid item xs={12} my={1}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="simple tabs example"
            variant="fullWidth"
            visibleScrollbar={false}
          >
            <Tab label="Level 1" />
            <Tab label="Level 2" />
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          {activeTab === 0 && <Level1Table data={data?.refer_result_level1} />}
          {activeTab === 1 && <Level2Table data={data?.refer_result_level2} />}
        </Grid>
      </Grid>
    </Box>
  );
}
