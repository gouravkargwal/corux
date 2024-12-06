import React from "react";
import { Fab } from "@mui/material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const FloatingButton = () => {
  const handleClick = () => {
    console.log("Contact Us clicked");
  };

  return (
    <Fab
      color="primary"
      aria-label="contact"
      onClick={handleClick}
      style={{
        position: "fixed",
        bottom: 80,
        right: 25,
      }}
      size="small"
      title="Contact Us"
      href="https://t.me/helpvegagaming"
      target="_blank"
    >
      <SupportAgentIcon fontSize="small" />
    </Fab>
  );
};

export default FloatingButton;
