import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import { Box } from "@mui/material";
import FloatingButton from "../Components/Home/FabButton";

const UserLayout = () => {
  return (
    <>
      <Box className="glass-container" pb={"80px"}>
        <Outlet />
      </Box>
      <Footer />
      <FloatingButton />
    </>
  );
};

export default UserLayout;
