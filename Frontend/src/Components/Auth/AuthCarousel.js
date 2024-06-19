import React from "react";
import { Box } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import ReferralBanner from "../../Assets/Images/Designer.jpeg";
import JoiningBanner from "../../Assets/Images/joiningbanner.webp";

const AuthCarousel = () => {
  const items = [
    {
      // title: "Hero Title 1",
      // description: "Something short ",
      imageUrl: ReferralBanner,
    },
    {
      // title: "Hero Title 2",
      // description: "An engaging description",
      imageUrl: ReferralBanner,
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
        height: "500px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${item.imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        textAlign: "center",
        backgroundColor: "background.main",
        boxShadow: 0,
        "@media (min-width: 768px)": {
          height: "500px",
        },
      }}
      marginTop={1}
      borderRadius={6}
      padding={1}
    ></Box>
  );
};

export default AuthCarousel;
