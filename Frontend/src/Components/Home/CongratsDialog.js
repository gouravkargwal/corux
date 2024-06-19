import React from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import ShareIcon from "@mui/icons-material/Share";
import VictoryPoster from "../../Assets/Images/victory.png";

const CongratsDialogue = ({ open, onClose }) => {
  const theme = useTheme();

  return (
    <Dialog
      onClose={onClose}
      open={open}
      TransitionProps={{ timeout: 500 }}
      fullWidth={true}
      maxWidth="md"
      sx={{
        "& .MuiDialog-paper": {
          padding: 4,
          background: "rgba(255, 255, 255, 0.6)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(20px) saturate(180%) brightness(1.2)",
          WebkitBackdropFilter: "blur(20px) saturate(180%) brightness(1.2)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "16px",
          border: "1px solid rgba(209, 213, 219, 0.3)",
          mx: "auto",
          width: "80%",
          maxWidth: 600,
        },
      }}
    >
      <DialogContent
        sx={{
          padding: theme.spacing(2),
        }}
      >
        <Box style={{ margin: "auto", textAlign: "center" }}>
          <img
            src={VictoryPoster}
            alt="Victory"
            style={{
              display: "block", // Ensures the image behaves like a block element
              margin: "auto", // Centers the image horizontally
              marginBottom: theme.spacing(2), // Adds space below the image
              height: 150,
              width: "auto",
            }}
          />
        </Box>
        <Typography
          variant="body2"
          gutterBottom
          fontFamily={"Ubuntu, sans-serif"}
        >
          Congratulations on your signup bonus of ₹50!
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default CongratsDialogue;
