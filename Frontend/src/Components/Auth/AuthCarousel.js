import React from "react";
import { Box, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import NoChargesBanner from "../../Assets/Images/noChargesBanner.png";
import ReferralBanner from "../../Assets/Images/referralBanner.png";
import DepositBonusBanner from "../../Assets/Images/depositBonusBanner.png";
import SignupBanner from "../../Assets/Images/signupBanner.png";
import { grey } from "@mui/material/colors";

const AuthCarousel = () => {
  const items = [
    {
      imageUrl: SignupBanner,
      text: "Signup and get a joining bonus of ₹50",
    },
    {
      imageUrl: NoChargesBanner,
      text: "Zero fee and no hidden charges",
    },
    {
      imageUrl: DepositBonusBanner,
      text: "Receive 115% on your first deposit above 99 onwards",
    },
    {
      imageUrl: ReferralBanner,
      text: "Refer and earn upto ₹25",
    },
  ];

  return (
    <Carousel animation="slide" duration={700} indicators={false}>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};

const Item = ({ item }) => {
  return (
    <Box
      sx={{
        height: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: 2,
      }}
      mt={4}
    >
      <img
        src={item.imageUrl}
        alt="Banner"
        style={{
          maxWidth: "auto",
          maxHeight: "300px",
          borderRadius: "6px",
          marginBottom: "10px",
        }}
      />
      {item.text && (
        <Typography
          variant="caption"
          fontFamily={"Ubuntu, sans-serif"}
          color={grey[600]}
        >
          {item.text}
        </Typography>
      )}
    </Box>
  );
};

export default AuthCarousel;
