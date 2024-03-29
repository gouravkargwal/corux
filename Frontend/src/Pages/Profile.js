import * as React from "react";
import { Avatar, Box } from "@mui/material";
import Info from "../Components/Profile/Info";
import Option from "../Components/Profile/Option";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import {
  green,
  deepPurple,
  orange,
  pink,
  blue,
  purple,
  grey,
} from "@mui/material/colors";
import PaidIcon from "@mui/icons-material/Paid";
import GroupIcon from "@mui/icons-material/Group";
import GavelIcon from "@mui/icons-material/Gavel";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";

export default function ControlledAccordions() {
  return (
    <Box>
      <Box borderColor="red">
        <Info />
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
        <Link to="/home/profile-details">
          <Option
            name="Profile"
            icon={
              <Avatar
                sx={{
                  bgcolor: green[500],
                }}
              >
                <AccountCircleIcon sx={{ color: "text.white" }} />
              </Avatar>
            }
          />
        </Link>
        <Link to="/home/wallet">
          <Option
            name="Wallet"
            icon={
              <Avatar sx={{ bgcolor: deepPurple[500] }}>
                <AccountBalanceWalletIcon sx={{ color: "text.white" }} />
              </Avatar>
            }
          />
        </Link>
        <Link to="/home/bank">
          <Option
            name="Bank"
            icon={
              <Avatar sx={{ bgcolor: orange[500] }}>
                <AccountBalanceIcon sx={{ color: "text.white" }} />
              </Avatar>
            }
          />
        </Link>
        <Link to="/home/withdraw">
          <Option
            name="Withdraw"
            icon={
              <Avatar sx={{ bgcolor: purple[500] }}>
                <PaidIcon sx={{ color: "text.white" }} />
              </Avatar>
            }
          />
        </Link>
        <Option
          name="Refer & Earn"
          icon={
            <Avatar sx={{ bgcolor: "black" }}>
              <GroupIcon sx={{ color: "text.white" }} />
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
        <Option
          name="Terms & Conditions"
          icon={
            <Avatar sx={{ bgcolor: pink[500] }}>
              <GavelIcon sx={{ color: "text.white" }} />
            </Avatar>
          }
        />
        <Option
          name="Privacy Policy"
          icon={
            <Avatar sx={{ bgcolor: blue[500] }}>
              <SecurityIcon sx={{ color: "text.white" }} />
            </Avatar>
          }
        />
        <Option
          name="Settings"
          icon={
            <Avatar sx={{ bgcolor: grey[500] }}>
              <SettingsIcon sx={{ color: "text.white" }} />
            </Avatar>
          }
        />
      </Box>
    </Box>
  );
}
