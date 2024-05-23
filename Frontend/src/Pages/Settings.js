import * as React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import Option from "../Components/Profile/Option";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../Feature/Auth/authSlice";
import { useDispatch } from "react-redux";
import { persistor } from "../App/store";

export default function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const iconColor = grey[700];
  const hoverColor = "#fc211d";
  return (
    <Box>
      <Box
        sx={{
          padding: "40px",
          background: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(16px) saturate(180%)",
          "-webkit-backdrop-filter": "blur(16px) saturate(180%)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: "12px",
          border: "1px solid rgba(209, 213, 219, 0.3)",
        }}
        margin={3}
        borderRadius={1}
        padding={2}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        gap={2}
        marginTop={0}
      >
        <Typography fontWeight="600">Settings</Typography>

        <Option
          name="Logout"
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
              <AccountCircleIcon sx={{ color: "inherit" }} />
            </Avatar>
          }
          onClick={() => {
            dispatch(logoutUser());
            persistor.purge();
            navigate("/auth");
          }}
        />
      </Box>
    </Box>
  );
}
