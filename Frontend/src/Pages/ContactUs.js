import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
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
            href="https://t.me/vegagaminghelp"
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
  );
};

export default ContactUs;
