import React from "react";
import { Box, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import CommissionBanner from "../../Assets/Images/commisionBanner.png";
import ReferralBanner from "../../Assets/Images/referralBanner.png";
import { grey } from "@mui/material/colors";
import NoChargesBanner from "../../Assets/Images/noChargesBanner.png";

const PromotionCarousel = () => {
  const items = [
    {
      imageUrl: CommissionBanner,
      text: "Earn 3% on level 1 and 1.5% on level 2 referral",
    },
    {
      imageUrl: NoChargesBanner,
      text: "Zero fee and no hidden charges",
    },
    {
      imageUrl: ReferralBanner,
      text: "Get ₹25 on Level 1 and ₹10 on Level 2",
    },
  ];

  return (
    <Carousel
      animation="slide"
      interval={6000} // Change slide every 6 seconds
      indicatorContainerProps={{
        style: {
          marginTop: "10px",
          textAlign: "center",
        },
      }}
      indicatorIconButtonProps={{
        style: {
          padding: "3px", // 1
          color: "rgba(0, 0, 0, 0.2)", // 3
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          color: "#fc211d", // 2
        },
      }}
      indicatorProps={{
        style: {
          display: "inline-block",
          width: "10px",
          height: "10px",
          margin: "0 5px",
        },
      }}
    >
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
        height: "200px",
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
          maxHeight: "120px",
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

export default PromotionCarousel;
