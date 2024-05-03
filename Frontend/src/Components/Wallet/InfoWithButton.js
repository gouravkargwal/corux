import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { blue, green, purple } from "@mui/material/colors";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBalance,
  selectBalanceData,
  selectBalanceMobile,
  selectBalanceUsername,
} from "../../Feature/Balance/balanceSlice";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Call from "@mui/icons-material/Call";

const InfoWithButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mobile = useSelector(selectBalanceMobile);
  const username = useSelector(selectBalanceUsername);
  const balance = useSelector(selectBalanceData);
  useEffect(() => {
    dispatch(getBalance());
  }, [dispatch]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Box
        sx={{ backgroundColor: "background.main", boxShadow: 0 }}
        margin={3}
        borderRadius={1}
        padding={2}
      >
        <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }}>
          <Box display="flex" justifyContent="flex-start" gap={2}>
            <Avatar
              sx={{
                bgcolor: blue[100],
                width: 90,
                height: 90,
              }}
              variant="rounded"
            >
              <AccountBalanceIcon sx={{ color: blue[500], fontSize: 40 }} />
            </Avatar>
            <Box gap={1} display="flex" flexDirection="column">
              <motion.div variants={itemVariants}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar
                    sx={{
                      bgcolor: blue[500],
                      width: 24,
                      height: 24,
                    }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <AccountCircle
                      sx={{ color: "text.white", width: 16, height: 16 }}
                    />
                  </Avatar>
                  <Typography color="text.grey" variant="body2">
                    {username}
                  </Typography>
                </Box>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar
                    sx={{
                      bgcolor: green[500],
                      width: 24,
                      height: 24,
                    }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <CurrencyRupeeIcon
                      sx={{ color: "text.white", width: 16, height: 16 }}
                    />
                  </Avatar>
                  <Typography color="text.grey" variant="body2">
                    {balance}
                  </Typography>
                </Box>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar
                    sx={{
                      bgcolor: purple[500],
                      width: 24,
                      height: 24,
                    }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <Call sx={{ color: "text.white", width: 16, height: 16 }} />
                  </Avatar>
                  <Typography color="text.grey" variant="body2">
                    {mobile}
                  </Typography>
                </Box>
              </motion.div>
            </Box>
          </Box>
        </motion.div>
        <Box mt={2} display="flex" justifyContent="space-between" gap={2}>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }}>
            <Button
              sx={{ bgcolor: blue[500] }}
              variant="contained"
              fullWidth
              onClick={() => {
                navigate("/profile/recharge");
              }}
            >
              Recharge
            </Button>
          </motion.div>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }}>
            <Button
              sx={{ bgcolor: green[500] }}
              variant="contained"
              fullWidth
              onClick={() => {
                navigate("/profile/withdraw");
              }}
            >
              Withdraw
            </Button>
          </motion.div>
        </Box>
      </Box>
    </motion.div>
  );
};

export default InfoWithButton;
