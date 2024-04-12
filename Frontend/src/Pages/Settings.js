import * as React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import Option from "../Components/Profile/Option";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { green } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser, selectAuthToken } from "../Feature/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { persistor } from "../App/store";

export default function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Box>
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
        <Typography fontWeight="600">Settings</Typography>

        <Option
          name="Logout"
          icon={
            <Avatar
              sx={{
                bgcolor: green[500],
              }}
            >
              <AccountCircleIcon sx={{ color: "text.white" }} />
            </Avatar>
          }
          onClick={() => {
            dispatch(logoutUser());
            persistor.purge();
            navigate("/");
          }}
        />
      </Box>
    </Box>
  );
}
