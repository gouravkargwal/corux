import React from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import AuthCarousel from "../Components/Auth/AuthCarousel";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

export default function Feature() {
  const navigate = useNavigate();

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
          marginTop={2}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontFamily: "Ubuntu, sans-serif",
              fontWeight: 700,
              color: grey[900],
            }}
          >
            Welcome to Vega gaming
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color={grey[500]}
            sx={{
              fontFamily: "Ubuntu, sans-serif",
              fontWeight: 400,
              marginBottom: 1,
            }}
          >
            Level up your gaming experience!
          </Typography>
          <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                padding: "10px 20px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              onClick={() => {
                navigate("login");
              }}
            >
              Sign In
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                padding: "10px 20px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              onClick={() => {
                navigate("register");
              }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
