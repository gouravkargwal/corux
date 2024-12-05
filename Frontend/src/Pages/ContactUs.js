import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import { blue } from "@mui/material/colors";

const ContactUs = () => {
  return (
    <Box height="100vh">
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
        justifyContent="center"
        gap={2}
        marginTop={0}
      >
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              textAlign: "center",
            }}
          >
            Contact Us
          </Typography>
          <Box mt={4} display="flex" justifyContent="center">
            <Button
              variant="contained"
              size="large"
              href="https://t.me/helpvegagaming"
              target="_blank"
              startIcon={<TelegramIcon />}
              sx={{
                backgroundColor: blue[500],
                "&:hover": {
                  backgroundColor: blue[800],
                },
                color: "white",
              }}
            >
              Chat on Telegram
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default ContactUs;
