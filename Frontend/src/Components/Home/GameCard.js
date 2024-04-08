import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import { blue, lightBlue } from "@mui/material/colors";

export default function GameCard({ title, time }) {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 350,
        border: "none",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
      }}
      variant="outlined"
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="120"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent sx={{ m: 0, p: 0 }}>
          <Typography gutterBottom variant="body1" textAlign="center">
            {title}
          </Typography>
        </CardContent>
        <CardContent sx={{ m: 0, p: 0, borderRadius: 5 }}>
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            bgcolor={lightBlue[100]}
            p={2}
          >
            <AvTimerIcon sx={{ color: blue[900] }} />
            <Typography fontWeight="600" color={blue[900]}>
              {time}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
