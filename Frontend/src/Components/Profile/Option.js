import * as React from "react";
import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { styled, keyframes } from "@mui/system";

const bounce = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
`;

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  borderRadius: 12,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  cursor: "pointer",
  transition: "all 0.3s",
  background: "rgba(255, 255, 255, 0.1)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(16px) saturate(180%)",
  WebkitBackdropFilter: "blur(16px) saturate(180%)",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  border: "1px solid rgba(209, 213, 219, 0.3)",
  "&:hover": {
    backgroundColor: grey[200],
    transform: "translateY(-2px)",
    boxShadow: "0 6px 25px rgba(0, 0, 0, 0.2)",
    "& .MuiSvgIcon-root": {
      color: "#fc211d",
    },
  },
  [theme.breakpoints.down("sm")]: {
    "&:hover": {
      animation: `${bounce} 0.5s ease`,
    },
  },
}));

export default function Option({ name, icon, onClick }) {
  const handleClick = onClick ? (e) => onClick(e) : undefined;

  return (
    <StyledBox onClick={handleClick}>
      {icon}
      <Box ml={2}>
        <Typography color="text.primary" variant="body1">
          {name}
        </Typography>
      </Box>
    </StyledBox>
  );
}
