import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Banner from "../../Assets/Images/Banner.webp";

const Hero = () => {
  const items = [
    {
      // title: "Hero Title 1",
      // description: "Something short ",
      imageUrl: Banner,
    },
    {
      // title: "Hero Title 2",
      // description: "An engaging description",
      imageUrl: Banner,
    },
  ];

  return (
    <Carousel
      animation="slide"
      interval={6000} // Change slide every 3 seconds
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
        textAlign: "center",
        backgroundColor: "background.main",
        boxShadow: 0,
        "@media (min-width: 768px)": {
          height: "500px",
        },
      }}
      margin={3}
      marginTop={1}
      borderRadius={1}
      padding={2}
    ></Box>
  );
};

export default Hero;
