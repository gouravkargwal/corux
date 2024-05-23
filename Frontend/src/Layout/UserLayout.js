import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import { Box } from "@mui/material";

const UserLayout = () => {
  return (
    <>
      <Box
        className="glass-container"
        sx={{
          paddingBottom: "70px",
          minHeight: "100vh",
          paddingTop: 5,
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export default UserLayout;
