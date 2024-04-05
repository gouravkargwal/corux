import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { blue } from "@mui/material/colors";

const AuthDialogue = ({ open, onClose }) => {
  const navigate = useNavigate();
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>
        <Typography variant="h6">Login</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 14,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" minWidth={280}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: blue["A700"],
              borderRadius: 10,
              padding: [1, 0],
              my: 2,
            }}
            onClick={() => navigate("/")}
          >
            Login
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: blue["A700"],
              borderRadius: 10,
              padding: [1, 0],
              my: 2,
            }}
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialogue;
