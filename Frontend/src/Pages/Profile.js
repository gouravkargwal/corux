import * as React from "react";
import { Avatar, Box } from "@mui/material";
import Info from "../Components/Profile/Info";
import Option from "../Components/Profile/Option";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import {
  green,
  deepPurple,
  pink,
  blue,
  purple,
  grey,
  orange,
} from "@mui/material/colors";
import PaidIcon from "@mui/icons-material/Paid";
import GroupIcon from "@mui/icons-material/Group";
import GavelIcon from "@mui/icons-material/Gavel";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import ContactPageIcon from "@mui/icons-material/ContactPage";

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
        <Link to="/profile/profile-details">
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
        <Link to="/profile/wallet">
          <Option
            name="Wallet"
            icon={
              <Avatar sx={{ bgcolor: deepPurple[500] }}>
                <AccountBalanceWalletIcon sx={{ color: "text.white" }} />
              </Avatar>
            }
          />
        </Link>
        {/* <Link to="/app/profile/bank">
          <Option
            name="Bank"
            icon={
              <Avatar sx={{ bgcolor: orange[500] }}>
                <AccountBalanceIcon sx={{ color: "text.white" }} />
              </Avatar>
            }
          />
        </Link> */}
        <Link to="/profile/withdraw">
          <Option
            name="Withdraw"
            icon={
              <Avatar sx={{ bgcolor: purple[500] }}>
                <PaidIcon sx={{ color: "text.white" }} />
              </Avatar>
            }
          />
        </Link>
        <Link to="/promotion/">
          <Option
            name="Refer & Earn"
            icon={
              <Avatar sx={{ bgcolor: "black" }}>
                <GroupIcon sx={{ color: "text.white" }} />
              </Avatar>
            }
          />
        </Link>
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
        <Link to="/terms-and-conditions">
          <Option
            name="Terms & Conditions"
            icon={
              <Avatar sx={{ bgcolor: pink[500] }}>
                <GavelIcon sx={{ color: "text.white" }} />
              </Avatar>
            }
          />
        </Link>
        <Link to="/privacy-policy">
          <Option
            name="Privacy Policy"
            icon={
              <Avatar sx={{ bgcolor: blue[500] }}>
                <SecurityIcon sx={{ color: "text.white" }} />
              </Avatar>
            }
          />
        </Link>
        <Link to="/contact-us">
          <Option
            name="Contact Us"
            icon={
              <Avatar sx={{ bgcolor: orange[500] }}>
                <ContactPageIcon sx={{ color: "text.white" }} />
              </Avatar>
            }
          />
        </Link>
        <Link to="/profile/settings">
          <Option
            name="Settings"
            icon={
              <Avatar sx={{ bgcolor: grey[500] }}>
                <SettingsIcon sx={{ color: "text.white" }} />
              </Avatar>
            }
          />
        </Link>
      </Box>
    </Box>
  );
}
