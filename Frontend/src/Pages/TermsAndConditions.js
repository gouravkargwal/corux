import React from "react";
import { Container, Typography, Box } from "@mui/material";

const TermsAndConditions = () => {
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
            Terms and Conditions
          </Typography>

          {/* Example Sections */}
          <Typography variant="h5" gutterBottom>
            1. Introduction
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to our betting platform. By accessing and using this
            platform, you accept and agree to the following terms and
            conditions.
          </Typography>

          <Typography variant="h5" gutterBottom>
            2. Eligibility
          </Typography>
          <Typography variant="body1" paragraph>
            You must be at least 18 years old or of legal gambling age in your
            jurisdiction to use our services.
          </Typography>

          <Typography variant="h5" gutterBottom>
            3. Account Registration
          </Typography>
          <Typography variant="body1" paragraph>
            All users are required to register an account and provide accurate
            information. Any fraudulent information may result in the suspension
            or termination of your account.
          </Typography>

          <Typography variant="h5" gutterBottom>
            4. Betting Rules
          </Typography>
          <Typography variant="body1" paragraph>
            Our betting platform follows specific rules for each game and bet
            type. Make sure to review the rules before placing any bet.
          </Typography>

          <Typography variant="h5" gutterBottom>
            5. Payments and Withdrawals
          </Typography>
          <Typography variant="body1" paragraph>
            All payments and withdrawals are subject to our payment policies and
            procedures.
          </Typography>

          <Typography variant="h5" gutterBottom>
            6. Responsible Gambling
          </Typography>
          <Typography variant="body1" paragraph>
            We encourage responsible gambling. Please use our platform
            responsibly and set personal limits to ensure a positive experience.
          </Typography>

          <Typography variant="h5" gutterBottom>
            7. Amendments
          </Typography>
          <Typography variant="body1" paragraph>
            We reserve the right to amend these terms and conditions at any
            time. Users will be notified of any changes via email or platform
            notifications.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default TermsAndConditions;
