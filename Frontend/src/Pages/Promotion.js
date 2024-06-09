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
  Paper,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CardGiftcard from "@mui/icons-material/CardGiftcard";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBalanceReferCode,
  selectPromotionalBalance,
} from "../Feature/Balance/balanceSlice";
import { getReferDetails, selectReferData } from "../Feature/Refer/referSlice";
import Level2Table from "../Components/Promotion.js/Level2Table";
import Level1Table from "../Components/Promotion.js/Level1Table";
import PromotionOption from "../Components/Promotion.js/PromotionOption";
import PromotionCarousel from "../Components/Promotion.js/PromotionCarousel";

export default function Promotion() {
  const dispatch = useDispatch();
  const bonus = useSelector(selectPromotionalBalance);
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

  const iconColor = grey[700];
  const hoverColor = blue[500];

  return (
    <Box>
      <PromotionCarousel />
      <Box
        padding={2}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        sx={{
          padding: "20px",
          background: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(16px) saturate(180%)",
          "-webkit-backdrop-filter": "blur(16px) saturate(180%)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: "12px",
          border: "1px solid rgba(209, 213, 219, 0.3)",
        }}
        marginX={3}
        marginY={1}
        gap={2}
        marginTop={0}
      >
        <PromotionOption
          name="Refer Bonus"
          count={data?.total_winning}
          icon={
            <Avatar
              sx={{
                bgcolor: "transparent",
                width: 40,
                height: 40,
                marginRight: 2,
                transition: "color 0.3s",
                "& .MuiSvgIcon-root": {
                  color: iconColor,
                },
                "&:hover .MuiSvgIcon-root": {
                  color: hoverColor,
                },
              }}
            >
              <LoyaltyIcon sx={{ color: "inherit" }} />
            </Avatar>
          }
        />
      </Box>
      <Box
        padding={2}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        sx={{
          padding: "20px",
          background: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(16px) saturate(180%)",
          "-webkit-backdrop-filter": "blur(16px) saturate(180%)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: "12px",
          border: "1px solid rgba(209, 213, 219, 0.3)",
        }}
        marginX={3}
        marginY={1}
        gap={2}
        marginTop={0}
      >
        <PromotionOption
          name="Promotional Bonus"
          count={bonus}
          icon={
            <Avatar
              sx={{
                bgcolor: "transparent",
                width: 40,
                height: 40,
                marginRight: 2,
                transition: "color 0.3s",
                "& .MuiSvgIcon-root": {
                  color: iconColor,
                },
                "&:hover .MuiSvgIcon-root": {
                  color: hoverColor,
                },
              }}
            >
              <CardGiftcard sx={{ color: "inherit" }} />
            </Avatar>
          }
        />
      </Box>
      <Box
        padding={2}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        sx={{
          padding: "20px",
          background: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(16px) saturate(180%)",
          "-webkit-backdrop-filter": "blur(16px) saturate(180%)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: "12px",
          border: "1px solid rgba(209, 213, 219, 0.3)",
        }}
        marginX={3}
        marginY={1}
        gap={2}
        marginTop={0}
      >
        <PromotionOption
          name="Total Referrals"
          count={data?.refer_count}
          icon={
            <Avatar
              sx={{
                bgcolor: "transparent",
                width: 40,
                height: 40,
                marginRight: 2,
                transition: "color 0.3s",
                "& .MuiSvgIcon-root": {
                  color: iconColor,
                },
                "&:hover .MuiSvgIcon-root": {
                  color: hoverColor,
                },
              }}
            >
              <GroupAddIcon sx={{ color: "inherit" }} />
            </Avatar>
          }
        />
      </Box>
      <Box
        padding={2}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        sx={{
          padding: "20px",
          background: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(16px) saturate(180%)",
          "-webkit-backdrop-filter": "blur(16px) saturate(180%)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: "12px",
          border: "1px solid rgba(209, 213, 219, 0.3)",
        }}
        margin={3}
        gap={2}
        marginTop={0}
      >
        <Box display="flex" justifyContent="flex-start" gap={2}>
          <Avatar
            sx={{
              bgcolor: "transparent",
              width: 40,
              height: 40,
              marginRight: 2,
              transition: "color 0.3s",
              "& .MuiSvgIcon-root": {
                color: iconColor,
              },
              "&:hover .MuiSvgIcon-root": {
                color: hoverColor,
              },
            }}
          >
            <PersonAddAlt1Icon sx={{ color: "inherit" }} />
          </Avatar>
          <Box gap={1} display="flex" flexDirection="column">
            <Typography variant="body2" fontWeight="600">
              Refer Friends
            </Typography>
            <Typography color="text.secondary" variant="body2">
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
        <Divider sx={{ my: 2 }} />
        <Box>
          <Typography color="text.secondary" variant="body2">
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
      <Grid item xs={4} marginX={1} borderRadius={1} paddingX={2} height="40vh">
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              marginTop: 1,
              paddingY: 1,
              paddingX: 3,
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
              aria-label="simple tabs example"
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
              <Tab label="Level 1" />
              <Tab label="Level 2" />
            </Tabs>
          </Paper>
        </Grid>
        <Grid item xs={12} mt={1}>
          {activeTab === 0 && <Level1Table data={data?.refer_result_level1} />}
          {activeTab === 1 && <Level2Table data={data?.refer_result_level2} />}
        </Grid>
      </Grid>
    </Box>
  );
}
