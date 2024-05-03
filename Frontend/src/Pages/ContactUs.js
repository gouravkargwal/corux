import React from "react";
import { Container, Typography, Button, Box, Icon } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram"; // Import the Telegram icon
import { blue } from "@mui/material/colors";

const ContactUs = () => {
  return (
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
            href="https://t.me/YOUR_BOT_USERNAME"
            target="_blank"
            startIcon={<TelegramIcon />} // Add the Telegram icon
            sx={{
              backgroundColor: blue[500],
              "&:hover": {
                backgroundColor: blue[800],
              },
              color: "white",
            }}
          >
            Chat with Us on Telegram
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactUs;
