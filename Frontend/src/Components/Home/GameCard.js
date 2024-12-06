import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import { blue, lightBlue } from "@mui/material/colors";
import { styled, keyframes } from "@mui/system";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  overflow: "hidden",
  background: "rgba(255, 255, 255, 0.1)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(16px) saturate(180%)",
  WebkitBackdropFilter: "blur(16px) saturate(180%)",
  border: "1px solid rgba(209, 213, 219, 0.3)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
  },
  animation: `${fadeIn} 0.5s ease`,
}));

const GameCard = ({ title, img, time }) => {
  return (
    <StyledCard variant="outlined">
      <CardActionArea>
        <CardMedia
          component="img"
          height="500px"
          image={img}
          alt={title}
          sx={{ objectFit: "cover" }}
        />
        <CardContent sx={{ p: 2 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap={1}
            mt={1}
            bgcolor={lightBlue[50]}
            p={1}
            borderRadius={2}
          >
            <Typography fontWeight="600" color={blue[900]}>
              {title}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} justifyContent="center">
              <AvTimerIcon sx={{ color: blue[900] }} />
              <Typography fontWeight="600" color={blue[900]}>
                {time}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default GameCard;
