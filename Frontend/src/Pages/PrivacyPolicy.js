// src/PrivacyPolicy.js
import React from "react";
import { Container, Typography, Paper, Box } from "@mui/material";

const PrivacyPolicy = () => {
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
      <Container maxWidth="md">
        <Box>
          <Typography variant="h4" gutterBottom>
            Privacy Policy
          </Typography>

          <Typography variant="h5" gutterBottom>
            1. Introduction
          </Typography>
          <Typography variant="body1" paragraph>
            Your privacy is important to us. This privacy policy explains how we
            handle your personal data when you use our betting platform.
          </Typography>

          <Typography variant="h5" gutterBottom>
            2. Information We Collect
          </Typography>
          <Typography variant="body1" paragraph>
            We collect personal information such as your name, email address,
            and payment details when you register and use our platform.
          </Typography>

          <Typography variant="h5" gutterBottom>
            3. How We Use Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            Your information is used to provide and improve our services,
            process payments, and communicate important updates.
          </Typography>

          <Typography variant="h5" gutterBottom>
            4. Sharing Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            We do not sell or share your personal information with third parties
            except as required by law or to fulfill our services.
          </Typography>

          <Typography variant="h5" gutterBottom>
            5. Data Security
          </Typography>
          <Typography variant="body1" paragraph>
            We implement industry-standard security measures to protect your
            data from unauthorized access, alteration, or disclosure.
          </Typography>

          <Typography variant="h5" gutterBottom>
            6. Your Rights
          </Typography>
          <Typography variant="body1" paragraph>
            You have the right to access, update, or delete your personal
            information. Contact our support team for assistance.
          </Typography>

          <Typography variant="h5" gutterBottom>
            7. Changes to This Policy
          </Typography>
          <Typography variant="body1" paragraph>
            We may update this privacy policy occasionally. You will be notified
            of any significant changes through our platform or email.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
