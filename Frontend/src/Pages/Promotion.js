import React, { useEffect } from "react";
import { Avatar, Box, Typography, Divider, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { green, deepPurple, blue, orange } from "@mui/material/colors";
import InfoWithButton from "../Components/Wallet/InfoWithButton";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PromotionOption from "../Components/Promotion.js/PromotionOption";
import RedeemIcon from "@mui/icons-material/Redeem";
import { useDispatch, useSelector } from "react-redux";
import { selectBalanceReferCode } from "../Feature/Balance/balanceSlice";
import {
  getReferDetails,
  selectReferData,
  selectReferError,
  selectReferLoading,
} from "../Feature/Refer/referSlice";

export default function Promotion() {
  const dispatch = useDispatch();
  const referCode = useSelector(selectBalanceReferCode);
  const data = useSelector(selectReferData);
  const loading = useSelector(selectReferLoading);
  const error = useSelector(selectReferError);
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

  console.log(data);

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
          count="10"
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
          count="50"
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
              askdjlasdj aslkdjlask djlaskdj laksjdlaksjdlasjdas jd asndkjasdn
              asdaskdjaskljdlaskjd lasjdlasj dasj dkas jdlkasj dlkasj
              dlkasjdlkasjdlkasjdlaksjdlasj ds
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
      <Box mt={2} display="flex" justifyContent="space-between" gap={2}></Box>
    </Box>
  );
}
