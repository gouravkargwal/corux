import React from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import AuthCarousel from "../Components/Auth/AuthCarousel";

export default function Feature() {
  return (
    <Box height="100vh" className="glass-container">
      <Container component="main" maxWidth="sm">
        <AuthCarousel />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          marginTop={1}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontFamily: "Ubuntu,sans-serif",
              fontWeight: 400,
            }}
          >
            Hello
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color={grey[500]}
            sx={{
              fontFamily: "Ubuntu,sans-serif",
              fontWeight: 300,
            }}
          >
            Welcome To Our Platform
          </Typography>
          <Box sx={{ display: "flex", gap: 2, marginTop: 4 }}>
            <Button variant="contained" color="primary">
              Sign In
            </Button>
            <Button variant="outlined" color="primary">
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
