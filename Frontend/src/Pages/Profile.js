import * as React from "react";
import { Avatar, Box, useMediaQuery, useTheme } from "@mui/material";
import Option from "../Components/Profile/Option";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PaidIcon from "@mui/icons-material/Paid";
import GroupIcon from "@mui/icons-material/Group";
import GavelIcon from "@mui/icons-material/Gavel";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsIcon from "@mui/icons-material/Settings";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { Link } from "react-router-dom";
import { grey } from "@mui/material/colors";
import InfoWithButton from "../Components/Wallet/InfoWithButton";

export default function ControlledAccordions() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const iconColor = grey[700];
  const hoverColor = "#fc211d";

  const options = [
    {
      name: "Profile",
      icon: AccountCircleIcon,
      url: "/profile/profile-details",
    },
    { name: "Wallet", icon: AccountBalanceWalletIcon, url: "/profile/wallet" },
    { name: "Withdraw", icon: PaidIcon, url: "/profile/withdraw" },
    { name: "Refer & Earn", icon: GroupIcon, url: "/promotion" },
    {
      name: "Terms & Conditions",
      icon: GavelIcon,
      url: "/terms-and-conditions",
    },
    { name: "Privacy Policy", icon: SecurityIcon, url: "/privacy-policy" },
    { name: "Contact Us", icon: ContactPageIcon, url: "/contact-us" },
    { name: "Settings", icon: SettingsIcon, url: "/profile/settings" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        paddingBottom: isMobile ? 8 : 3, // Add more padding on mobile
      }}
    >
      <Box width="100%" mb={3}>
        <InfoWithButton />
      </Box>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        gap={2}
        sx={{
          padding: isMobile ? 1 : 3, // Adjust padding for mobile
        }}
      >
        {options.map(({ name, icon: IconComponent, url }) => (
          <Link to={url} key={name} style={{ textDecoration: "none" }}>
            <Option
              name={name}
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
                  <IconComponent sx={{ color: "inherit" }} />
                </Avatar>
              }
            />
          </Link>
        ))}
      </Box>
    </Box>
  );
}
