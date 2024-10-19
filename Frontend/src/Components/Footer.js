import React, { useEffect, useState } from "react";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useSelector } from "react-redux";
import { selectAuthToken } from "../Feature/Auth/authSlice";
import AddCardIcon from "@mui/icons-material/AddCard";
import LoginIcon from "@mui/icons-material/Login";
import { styled, keyframes } from "@mui/system";

const navigationPaths = [
  {
    value: 0,
    path: "/",
    label: "Home",
    icon: <HomeIcon />,
  },
  {
    value: 1,
    path: "/promotion",
    label: "Promotion",
    condition: (token) => token,
    icon: <LocalOfferIcon />,
  },
  {
    value: 2,
    path: "/profile/recharge",
    label: "Recharge",
    condition: (token) => token,
    icon: <AddCardIcon />,
  },
  {
    value: 3,
    path: "/profile",
    label: "Profile",
    condition: (token) => token,
    icon: <AccountCircleIcon />,
  },
  {
    value: 4,
    path: "/auth",
    label: "Login",
    condition: (token) => !token,
    icon: <LoginIcon />,
  },
];

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const StyledBottomNavigationAction = styled(BottomNavigationAction)(
  ({ theme }) => ({
    "&.Mui-selected": {
      color: theme.palette.primary.main,
      transition: "color 0.3s ease",
      "& .MuiSvgIcon-root": {
        color: "#fc211d", // Change the icon color when selected
      },
    },
    "&.Mui-selected:after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "24px",
      height: "4px",
      backgroundColor: "#fc211d",
      borderRadius: "2px",
      transition: "all 0.3s ease",
    },
    "@media (max-width: 600px)": {
      "&:hover": {
        animation: `${bounce} 0.5s`,
      },
    },
  })
);

export default function Footer() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector(selectAuthToken);

  useEffect(() => {
    const foundPath = navigationPaths.reduce((longestMatch, currentPath) => {
      const regex = new RegExp(`^${currentPath.path}`);
      if (
        regex.test(location.pathname) &&
        currentPath.path.length > longestMatch.path.length
      ) {
        return currentPath;
      }
      return longestMatch;
    }, navigationPaths[0]);

    setValue(foundPath.value);
  }, [location]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const pathInfo = navigationPaths.find((path) => path.value === newValue);
    if (pathInfo && (!pathInfo.condition || pathInfo.condition(token))) {
      navigate(pathInfo.path);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 20,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels={false}
        sx={{
          width: "90%",
          backgroundColor: "white",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "24px",
          overflow: "hidden",
        }}
      >
        {navigationPaths.map(
          (path) =>
            (!path.condition || path.condition(token)) && (
              <StyledBottomNavigationAction key={path.value} icon={path.icon} />
            )
        )}
      </BottomNavigation>
    </Box>
  );
}
