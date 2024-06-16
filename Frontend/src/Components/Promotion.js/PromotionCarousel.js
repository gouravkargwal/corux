import React from "react";
import { Box } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Charges from "../../Assets/Images/charges.webp";
import ReferralBanner from "../../Assets/Images/Referral.png";

const PromotionCarousel = () => {
  const items = [
    {
      // title: "Hero Title 1",
      // description: "Something short ",
      imageUrl: ReferralBanner,
    },
    {
      // title: "Hero Title 2",
      // description: "An engaging description",
      imageUrl: Charges,
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
        backgroundImage: `url(${item.imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        textAlign: "center",
        backgroundColor: "background.main",
        boxShadow: 0,
        "@media (min-width: 768px)": {
          height: "400px",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        },
      }}
      margin={3}
      marginTop={1}
      borderRadius={1}
      padding={2}
    ></Box>
  );
};

export default PromotionCarousel;
