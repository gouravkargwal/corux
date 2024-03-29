import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import Carousel from "react-material-ui-carousel";

const Hero = () => {
  const items = [
    {
      title: "Hero Title 1",
      description: "Something short ",
      imageUrl: "your-image-url-here-1",
    },
    {
      title: "Hero Title 2",
      description: "An engaging description",
      imageUrl: "your-image-url-here-2",
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
      }}
      margin={3}
      marginTop={1}
      borderRadius={1}
      padding={2}
    >
      <Container>
        <Typography variant="body1" gutterBottom>
          {item.title}
        </Typography>
        <Typography variant="body2" paragraph>
          {item.description}
        </Typography>
      </Container>
    </Box>
  );
};

export default Hero;
