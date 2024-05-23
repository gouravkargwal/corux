import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import { Box } from "@mui/material";

const UserLayout = () => {
  return (
    <>
      <Box
        // sx={{
        //   overflowY: "auto",
        //   marginBottom: "56px",
        //   backgroundColor: "background.default",
        //   height: "calc(100vh - 56px)",
        // }}
      >
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export default UserLayout;
